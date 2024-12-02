'use client'

import { GoogleOAuthProvider } from "@react-oauth/google"

export default function ClientProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <GoogleOAuthProvider clientId="500049450131-u16ee3nuhv9lqmknn3pggadq1anu9e8a.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  )
}