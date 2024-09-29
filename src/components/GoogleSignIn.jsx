import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function GoogleSignIn() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
      }
    }

    checkUser()
  }, [])

  async function handleGoogleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
        console.error('Error signing in:', error.message)
    }
  }

  if (user) {
    return <p>Signed in as {user.email}</p>
  }

  return (
    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
  )
}
