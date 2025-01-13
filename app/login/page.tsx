'use client'

import Link from "next/link";
import createSession from "../actions/createSession";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { FaSignInAlt } from "react-icons/fa";

export default function LoginPage() {
  const [state,formAction]=useActionState(createSession,{error:''})
  const {setIsAuthenticated}=useAuth()
  const router =useRouter()
  useEffect(()=>{
    if(state?.error !== '' ){
      toast.error(state?.error)
    }
    if(state?.success){
      toast.success('Logged in successfully')
      setIsAuthenticated(true)
      router.push('/')
    }
  },[router, setIsAuthenticated, state])

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-slate-700 shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form action={formAction}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-100">
            <FaSignInAlt className="mr-1 inline" /> Login
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded w-full py-2 px-3 dark:bg-slate-800 placeholder:text-gray-400 dark:text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2 dark:text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded w-full py-2 px-3 dark:bg-slate-800 placeholder:text-gray-400 dark:text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            <p className="dark:text-white">
              Do not have an account?
              <Link href="/register" className="ml-2 text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
