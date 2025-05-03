'use client'
import Sidebar from './Sidebar'
import TopNavBar from './TopNavBar'

import PageWrapper from './PageWrapper'

import { User } from '@/auth'
import { useAppContext } from '@/context/AppContext'
import React from 'react'

export default function DashboardLayout ({
  children, user,
}: {
  children: React.ReactNode;
  user: User
}) {
  const { isSidebarExpanded, isHomepage } = useAppContext()

  return (

    <div className="flex min-h-screen bg-lightGray dark:bg-dark">

      <Sidebar user={user}/>

      {isHomepage &&
        <TopNavBar user={user} sidebarExpanded={isSidebarExpanded}/>}
      <div className={`flex-1 ${isHomepage
        ? 'pt-20'
        : 'pt-0'} transition-all duration-300 ${isSidebarExpanded
        ? 'ml-64'
        : 'ml-20'}`}>
        <PageWrapper>
          {children}
        </PageWrapper>
      </div>
    </div>

  )
}
