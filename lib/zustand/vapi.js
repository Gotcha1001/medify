import axios from "axios";
import { VAPI_ANALYSIS_PLAN } from "./consultation";

const VAPI_BASE = (process.env.VAPI_BASE_URL || "https://api.vapi.ai").replace(
  /\/$/,
  "",
);

const vapiHeaders = () => {
  const apiKey = process.env.VAPI_API_KEY;
  if (!apiKey) throw new Error("VAPI_API_KEY is not set");
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
};

export async function fetchVapiCall(callId) {
  try {
    const { data } = await axios.get(`${VAPI_BASE}/call/${callId}`, {
      headers: vapiHeaders(),
    });
    return data;
  } catch (error) {
    const details = error.response?.data || error.message;
    console.error("Vapi get call failed:", details);
    throw new Error(`Vapi get call failed: ${JSON.stringify(details)}`);
  }
}

const assistantPayload = ({ name, systemPrompt }) => ({
  name,
  model: {
    provider: "google",
    model: "gemini-2.5-flash-lite",
    messages: [{ role: "system", content: systemPrompt }], // ✅ plural
  },
  voice: {
    provider: "11labs",
    voiceId: "pNInz6obpgDQGcFmaJgB",
  },
  firstMessage: `Hello I'm ${name}. How can I help you with your health questions today? Please remember I provide general wellness guidance only, not a substitute for in-person medical care.`, // ✅ typo fixed
  artifactPlan: {
    recordingEnabled: true,
    transcriptPlan: { enabled: true }, // ✅ typo fixed
  },
  analysisPlan: VAPI_ANALYSIS_PLAN,
});

export async function createVapiAssistant({ name, systemPrompt }) {
  try {
    const { data } = await axios.post(
      `${VAPI_BASE}/assistant`,
      assistantPayload({ name, systemPrompt }),
      { headers: vapiHeaders() },
    );
    return data;
  } catch (error) {
    throw new Error(
      `Vapi assistant creation failed: ${error?.response?.data.message || error.message}`,
    );
  }
}

export async function updateVapiAssistant(assistantId, { name, systemPrompt }) {
  try {
    const { data } = await axios.patch(
      `${VAPI_BASE}/assistant/${assistantId}`,
      assistantPayload({ name, systemPrompt }),
      { headers: vapiHeaders() },
    );
    return data;
  } catch (error) {
    throw new Error(
      `Vapi assistant update failed: ${error?.response?.data.message || error.message}`,
    );
  }
}
