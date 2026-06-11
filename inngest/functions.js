import { prisma } from "@/lib/zustand/db";
import { inngest } from "./client";

export const syncUserCreated = inngest.createFunction(
  { id: "sync-user-created", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    const { data } = event;

    const email = data.email_addresses?.[0]?.email_address;
    const name = data.first_name + " " + data.last_name;

    // Using upsert ensures that duplicate webhooks during testing dont crash your server

    await prisma.user.upsert({
      where: { id: data.id },
      create: {
        id: data.id,
        email,
        name,
        image: data.image_url || "",
      },
      update: {
        email,
        name,
        image: data.image_url || "",
      },
    });
  },
);

// Function that runs when a user is updated in Clerk. It syncs the user data to the local database
export const syncUserUpdated = inngest.createFunction(
  { id: "sync-user-updated", triggers: [{ event: "clerk/user.updated" }] },
  async ({ event }) => {
    const { data } = event;

    const email = data.email_addresses?.[0]?.email_address;
    const name = data.first_name + " " + data.last_name;

    await prisma.user.update({
      where: { id: data.id },
      data: {
        email,
        name,
        image: data.image_url || "",
      },
    });
  },
);

// Function that runs when a user is deleted in clerk. It deletes the user data from the local database

export const syncUserDeleted = inngest.createFunction(
  { id: "sync-user-deleted", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      where: { id: data.id },
    });
  },
);
