import { getUser } from '@/auth'
import DashboardLayout from '@/components/DashboardLayout'
import React from 'react'
import { unauthorized } from 'next/navigation'

export default async function Layout ({ children }: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (!user) unauthorized()
  return <DashboardLayout user={user}>{children}</DashboardLayout>
}
