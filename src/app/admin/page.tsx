'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminIndexRedirect() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (token) {
    redirect('/admin/dashboard')
  }

  redirect('/admin/login')
}



