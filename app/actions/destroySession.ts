"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

export default async function destroySession() {
  const sessionCookie = (await cookies()).get("appwrite-session");
  if (!sessionCookie) {
    return {
      error: "No session cookie found",
    };
  }
  try {
    const { account } = await createSessionClient(sessionCookie.value);
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
    return {
      success: true,
    };
  } catch (error) {
    console.log('Error Deleting session: ',error)
    return {
      error: "Error deleting session",
    };
  }
}
