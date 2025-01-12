'use server'

import { createAdminClient } from "@/config/appwrite"
import { prevStateType } from "@/utils/types"
import {ID} from 'node-appwrite'

export default async function createUser(prevState:prevStateType,formData:FormData){
    const name=formData.get('name') as string;
    const email=formData.get('email') as string;
    const password=formData.get('password') as string;
    const confirmPassword=formData.get('confirm-password') as string;
    if(!email || !name || !password || !confirmPassword){
        return {
            error: 'please fill all fields'
        }
    }
    if(password !== confirmPassword){
        return {
            error:'passwords do not match'
        }
    }
    if(password.length < 8){
        return {
            error:'password must be at least 8 characters long'
        }
    }
    const {account}=await createAdminClient()
    try{
        await account.create(ID.unique(),email,password,name)
        return  {
            success:true
        }
    }catch(error){
        console.log('Registration error: ',error)
        return{
            error:'Could not register user'
        }
    }
}