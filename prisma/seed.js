// import "dotenv/config";
// import axios from "axios";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { createVapiAssistant, updateVapiAssistant } from "@/lib/zustand/vapi";
// import { DOCTOR_SEED } from "../assets/doctor";
// import { PrismaClient } from "@/lib/generated/prisma/client";

// const adapter = new PrismaNeon({
//   connectionString: process.env.DIRECT_URL || proccess.env.DATABASE_URL,
// });

// const prisma = new PrismaClient({ adapter });

// async function findAssistantByName(name) {
//   if (!process.env.VAPI_API_KEY) return null;

//   try {
//     const { data } = await axios.get("https://api.vapi.ai/assistant", {
//       headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` },
//     });

//     const list = Array.isArray(data) ? data : data?.data || [];
//     return list.find((assistant) => assistant.name === name) || null;
//   } catch (error) {
//     return null;
//   }
// }

// async function syncVapiAssistant(doctor) {
//   if (!process.env.VAPI_API_KEY) return `placeholder-${doctor.slug}`;

//   const existing = await findAssistantByName(doctor.name);

//   if (existing?.id) {
//     console.log(`Updating Vapi assistant: ${doctor.name}`);
//     await updateVapiAssistant(existing.id, {
//       name: doctor.name,
//       systemPrompt: doctor.systemPrompt,
//     });
//     return existing.id;
//   }
//   console.log(`Creating Vapi Assistant: ${doctor.name}`);
//   const created = await createVapiAssistant({
//     name: doctor.name,
//     systemPrompt: doctor.systemPrompt,
//   });
// }

// async function seed() {
//   console.log("SEEDING MEDIFY doctors...");

//   for (const doctor of DOCTOR_SEED) {
//     let vapiAssistantId = `seed-${doctor.slug}`;

//     try {
//       vapiAssistantId = await syncVapiAssistant(doctor);
//     } catch (error) {
//       console.warn(`Vapi sync skipped for ${doctor.slug}:`, error.message);
//     }
//     await prisma.doctorAgent.upsert({
//       where: { slug: doctor.slug },
//       create: {
//         slug: doctor.slug,
//         name: doctor.name,
//         specialty: doctor.specialty,
//         description: doctor.description,
//         avatarUrl: doctor.avatarUrl,
//         requiredPlan: doctor.requiredPlan,
//         sortOrder: doctor.sortOrder,
//         systemPrompt: doctor.systemPrompt,
//         vapiAssistantId,
//         isActive,
//       },
//       update: {
//         name: doctor.name,
//         specialty: doctor.specialty,
//         description: doctor.description,
//         avatarUrl: doctor.avatarUrl,
//         requiredPlan: doctor.requiredPlan,
//         sortOrder: doctor.sortOrder,
//         systemPrompt: doctor.systemPrompt,
//         vapiAssistantId,
//         isActive,
//       },
//     });
//     console.log(`SEEDED ${doctor.name}`);
//   }
//   console.log("Seeding completed...");
// }

// seed()
//   .catch((e) => {
//     console.error("Seeding failed:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { config } from "dotenv";
config({ path: ".env" });

import axios from "axios";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg"; // ✅ standard pg adapter, no WebSockets
import { createVapiAssistant, updateVapiAssistant } from "@/lib/zustand/vapi";
import { DOCTOR_SEED } from "../assets/doctor";
import { PrismaClient } from "@/lib/generated/prisma/client";

async function findAssistantByName(name) {
  if (!process.env.VAPI_API_KEY) return null;
  try {
    const { data } = await axios.get("https://api.vapi.ai/assistant", {
      headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` },
    });
    const list = Array.isArray(data) ? data : data?.data || [];
    return list.find((a) => a.name === name) || null;
  } catch {
    return null;
  }
}

async function syncVapiAssistant(doctor) {
  if (!process.env.VAPI_API_KEY) return `placeholder-${doctor.slug}`;
  const existing = await findAssistantByName(doctor.name);
  if (existing?.id) {
    console.log(`Updating Vapi assistant: ${doctor.name}`);
    await updateVapiAssistant(existing.id, {
      name: doctor.name,
      systemPrompt: doctor.systemPrompt,
    });
    return existing.id;
  }
  console.log(`Creating Vapi Assistant: ${doctor.name}`);
  const created = await createVapiAssistant({
    name: doctor.name,
    systemPrompt: doctor.systemPrompt,
  });
  return created?.id ?? `placeholder-${doctor.slug}`;
}

async function seed() {
  // ✅ Use DIRECT_URL (non-pooled) with standard pg — no WebSockets needed
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log(`SEEDING MEDIFY doctors... (${DOCTOR_SEED.length} total)`);

  try {
    for (const doctor of DOCTOR_SEED) {
      let vapiAssistantId = `seed-${doctor.slug}`;
      try {
        vapiAssistantId = await syncVapiAssistant(doctor);
      } catch (error) {
        console.warn(`Vapi sync skipped for ${doctor.slug}:`, error.message);
      }

      try {
        await prisma.doctorAgent.upsert({
          where: { slug: doctor.slug },
          create: {
            slug: doctor.slug,
            name: doctor.name,
            specialty: doctor.specialty,
            description: doctor.description,
            avatarUrl: doctor.avatarUrl,
            requiredPlan: doctor.requiredPlan,
            sortOrder: doctor.sortOrder,
            systemPrompt: doctor.systemPrompt,
            vapiAssistantId,
            isActive: doctor.isActive ?? true,
          },
          update: {
            name: doctor.name,
            specialty: doctor.specialty,
            description: doctor.description,
            avatarUrl: doctor.avatarUrl,
            requiredPlan: doctor.requiredPlan,
            sortOrder: doctor.sortOrder,
            systemPrompt: doctor.systemPrompt,
            vapiAssistantId,
            isActive: doctor.isActive ?? true,
          },
        });
        console.log(`✅ SEEDED ${doctor.name}`);
      } catch (error) {
        console.error(`❌ Failed to seed ${doctor.name}:`, error.message);
      }
    }
    console.log("Seeding completed...");
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seed().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
