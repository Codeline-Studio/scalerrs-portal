import type { Metadata } from 'next'
import './globals.css'

import { Inter, Roboto } from 'next/font/google'
import { AppProvider } from '@/context/AppContext'
import DashboardLayout from '@/components/DashboardLayout'
import { getUser } from '@/auth'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['300', '400', '500', '600', '700'],
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '700', '900'],
})

// import { themeScript } from './theme-script' - Theme switching disabled

export const metadata: Metadata = {
  title: 'Scalerrs Client Portal',
  description: 'Client portal for Scalerrs - SEO & Marketing Agency',
}

export default async function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  return (
    <html lang="en"
          className={`${roboto.className}`}>
    <body
      className="bg-white text-text-light blue-glow-top-left blue-glow-bottom-right"
    >
    <AppProvider>

      {user
        ? <DashboardLayout user={user}>{children}</DashboardLayout>
        : <div>{children}</div>}

    </AppProvider>

    </body>
    </html>
  )
}
