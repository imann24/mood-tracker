import React from 'react'
import supabase from '../lib/supabase'

export default function GoogleSignIn({user}) {
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
