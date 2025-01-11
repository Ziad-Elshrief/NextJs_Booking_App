'use server'

import { createAdminClient } from "@/config/appwrite";
import { prevStateType } from "@/utils/types";
import { cookies } from "next/headers";

export default async function createSession(prevState: prevStateType,formData:FormData){
    const email=formData.get('email');
    const password=formData.get('password');
    if(!email || !password){
        return {
            error:'Please fill out all fields',
        }
    }
    const {account}=await createAdminClient()
    try{
        const session = await account.createEmailPasswordSession(email.toString(),password.toString())
        ;(await cookies()).set('appwrite-session',session.secret,{
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            expires: new Date(session.expire),
            path:'/',
        })
        return {
            success: true,
        }
    }catch(error){
        console.log(`Authentication Error: ${error}`)
        return {
            error:'Invalid email or password'
        }

    }
}