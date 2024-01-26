import AuthSignIn from '@/components/auth/auth.signin'
import React from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if(session){
    redirect('/')
  }
  return (
    <AuthSignIn/>
  )
}
