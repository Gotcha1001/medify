export const CONSULTATION_SCHEMA = {
  type: "object",
  properties: {
    complaint: {
      type: "string",
      description: "Primary symptom in 2-6 words (e.g. Fever, Headache)",
    },
    severity: { type: "string", enum: ["Mild", "Moderate", "Severe"] },
    summary: {
      type: "string",
      description: "2-4 sentences consultation summary",
    },
    medications: {
      type: "string",
      description: "OTC medication guidance or explicit none",
    },
    recommendation: {
      type: "string",
      description: "Lifestyle and follow-up guidance",
    },
  },
  required: [
    "complaint",
    "severity",
    "summary",
    "medications",
    "recommendation",
  ],
};

export const STRUCTURED_DATA_PROMPT = `Extract a Medify wellness consultation report from the call transcript. Rules: complaint must match the user's main symptom; severity is Mild, Moderate, or Severe' mudications are informational OTC guidance only' never prescribe prescription drugs`;

export const VAPI_ANALYSIS_PLAN = {
  summaryPlan: { enabled: true },
  structuredDataPrompt: STRUCTURED_DATA_PROMPT,
  structuredDataSchema: CONSULTATION_SCHEMA,
};

export const SEVERITY_VALUES = new Set(["Mild", "Moderate", "Severe"]);

export function extractStructuredFromVapi(callData) {
  // ✅ Fix: the legacy analysisPlan.structuredDataPrompt/structuredDataSchema
  // approach writes its result to call.analysis.structuredData — not
  // call.analysis.structuredDataPrompt (that field only ever holds the
  // prompt string you sent Vapi, never the extracted result).
  const direct = callData?.analysis?.structuredData;
  if (direct && typeof direct === "object" && !Array.isArray(direct))
    return direct;

  const outputs = callData?.artifact?.structuredOutputs;
  if (outputs && typeof outputs === "object") {
    for (const entry of Object.values(outputs)) {
      const result = entry?.result;
      if (result && typeof result === "object" && !Array.isArray(result)) {
        return result;
      }
    }
  }

  return null;
}

export function hasStructuredReport(callData) {
  const data = extractStructuredFromVapi(callData);
  return Boolean(data?.complaint && data?.summary);
}

export function buildDialogueTranscript(callData) {
  const messages = callData?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    const raw = callData?.transcript || callData?.artifact?.transcript;
    return typeof raw === "string" ? raw.trim() : "";
  }

  return messages
    .filter((m) => ["user", "assistant", "bot"].includes(m.role))
    .map((m) => {
      const role = m.role === "user" ? "User" : "AI";
      const text = (m.message || m.transcript || m.content || "").trim();
      return text ? `${role}: ${text}` : "";
    })
    .filter((line) => line.length > 6)
    .join("\n");
}

export function getCallDurationSec(callData, fallbackSec = 0) {
  const numeric = [
    callData?.durationSec,
    callData?.durationSeconds,
    callData?.artifact?.durationSeconds,
  ].find((n) => typeof n === "number" && n > 0);

  if (numeric) return Math.round(numeric);
  if (typeof callData?.duration === "number" && callData.duration > 0)
    return Math.round(callData.duration);

  const started = callData?.startedAt ? new Date(callData.startedAt) : null;
  const ended = callData?.endedAt ? new Date(callData.endedAt) : null;

  if (started && ended && !Number.isNaN(started) && !Number.isNaN(ended)) {
    return Math.max(0, Math.floor((ended - started) / 1000));
  }
  return fallbackSec > 0 ? Math.round(fallbackSec) : 0;
}

export function normalizeConsultationMetaData(structured, { doctorName } = {}) {
  const complaint = String(structured?.complaint || "").trim();
  const rawSeverity = String(structured?.severity || "").trim();
  const severity = SEVERITY_VALUES.has(rawSeverity) ? rawSeverity : "Mild";

  return {
    complaint: complaint || "General Wellness",
    severity,
    summary:
      String(structured?.summary || "").trim() ||
      "Consultation completed. Review transcript for details.",
    medications:
      String(structured?.medications || "").trim() ||
      "No specific medication guidance provided.",
    recommendation:
      String(structured?.recommendation || "").trim() ||
      "Rest, stay hydrated, and seek in-person care if symptoms worsen",
    doctorName: doctorName || "AI Specialist",
    source: "vapi.analysis.structuredData",
  };
}

// ✅ Fix: `ended` was referenced as a variable — should be the string "ended"
export function vapiCallEnded(callData) {
  return callData?.status === "ended";
}

export async function pollVapiCallForReport(
  fetchVapiCall,
  vapiCallId,
  options = {},
) {
  const { maxAttempts = 20, pollMs = 3000, onAttempt } = options;

  let callData = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    callData = await fetchVapiCall(vapiCallId);
    onAttempt?.(attempt + 1, maxAttempts, callData);

    if (vapiCallEnded(callData) && hasStructuredReport(callData)) {
      break;
    }
    if (vapiCallEnded(callData) && attempt === maxAttempts - 1) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }
  return callData;
}
