"use server";

import { createSessionClient } from "@/config/appwrite";
import { Query } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function deleteRoom(roomId:string) {
    const sessionCookie = (await cookies()).get('appwrite-session')
    if(!sessionCookie){
        redirect('/login')
    }
  try {
    const { databases, account } = await createSessionClient(sessionCookie.value);
    const user = await account.get()
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS || "",
      [Query.equal('user_id',user.$id)]
    );

    const roomToDelete = rooms.find((room)=> room.$id ===roomId)
    if(roomToDelete){
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS || "",
      roomToDelete.$id
        )
        revalidatePath('/rooms/my','layout')
        revalidatePath('/','layout')
        return {
            success:true
        }
    }else{
        return {
            error:'Room not found',
        }
    }


  } catch (error) {
    console.log('Failed to delete room',error)
    return {
        error:'Failed to delete room',
    }
  }
}
