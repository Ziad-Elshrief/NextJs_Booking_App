"use server";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { prevStateType } from "@/utils/types";

export default async function createRoom(
  prevState: prevStateType,
  formData: FormData
) {
  const { databases, storage } = await createAdminClient();
  try {
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in to create a room",
      };
    }

    let imageID;
    const image = formData.get("image") as File;

    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        const response = await storage.createFile("rooms", ID.unique(), image);
        imageID = response.$id;
      } catch (error) {
        console.log("Error uploading image", error);
        return {
          error: "Error uploading image",
        };
      }
    } else {
      console.log("No image File provided or file is invalid");
    }

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS || "",
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        sqft: formData.get("sqft") as string,
        capacity: formData.get("capacity") as string,
        location: formData.get("location") as string,
        address: formData.get("address") as string,
        availability: formData.get("availability") as string,
        price_per_hour: formData.get("price_per_hour") as string,
        amenities: formData.get("amenities") as string,
        image: imageID,
      }
    );
    revalidatePath("/", "layout");
    revalidatePath("/rooms/my", "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "An expected error has occured",
    };
  }
}
