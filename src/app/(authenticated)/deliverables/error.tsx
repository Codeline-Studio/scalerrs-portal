'use client'
import { Button } from '@/components/ui/button'

export default async function DeliverablesError ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <div
    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4 flex justify-between items-center">
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2"
           viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"/>
      </svg>
      <span>{error.message}</span>
    </div>
    <Button
      onClick={() => reset()}
      className="text-red-700 hover:text-red-900"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
           viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"/>
      </svg>
    </Button>
  </div>
}
