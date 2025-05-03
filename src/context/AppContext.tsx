'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface AppContextType {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (value: boolean) => void;
  isHomepage: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider ({ children }: { children: ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const path = usePathname()

  console.log({ path })

  const isHomepage = (path === '/home')

  return (
    <AppContext.Provider
      value={{ isSidebarExpanded, setIsSidebarExpanded, isHomepage }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext () {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
