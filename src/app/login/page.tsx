import { redirect } from 'next/navigation'

export default async function LoginRedirectPage() {
  redirect('/admin/login')
}


