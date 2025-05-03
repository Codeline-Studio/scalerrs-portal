'use server'
import { cookies } from 'next/headers'
import { getUserByEmail } from '@/lib/airtable'
import { redirect } from 'next/navigation'

export type User = {
  id: string;
  Name: string;
  Email: string;
  Role: string;
}

const COOKIE_STORE_USER_KEY = 'scalerrs-user'

export const login = async (
  email: string, password: string): Promise<boolean> => {
  const cookieStore = await cookies()

  // Get user, allow any password for demo purposes
  const user = await getUserByEmail(email)

  if (!user) {
    // Optionally: clear cookie, for safety in "failed" case
    cookieStore.delete(COOKIE_STORE_USER_KEY)
    return false
  }
  // Store the user object (no password) in the cookie
  cookieStore.set({
    name: COOKIE_STORE_USER_KEY,
    value: JSON.stringify({ user }),
    httpOnly: true, // Recommended for security
    sameSite: 'lax',
    path: '/',
    // Optionally, set an expiry
    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  })
  return true
}

export const getUser = async (): Promise<User | null> => {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get(COOKIE_STORE_USER_KEY)
  if (!userCookie) return null

  try {
    const parsed = JSON.parse(userCookie.value)
    // optionally, validate shape
    return parsed.user as User
  } catch {
    // Cookie is invalid/corrupted
    return null
  }
}
export const logout = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_STORE_USER_KEY)
  redirect('/login')
}
