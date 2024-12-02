'use client'

import React from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void  // Add this prop
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  console.error(error)
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorPage