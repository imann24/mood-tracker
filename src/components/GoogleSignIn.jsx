import React from 'react'
import { Button } from 'react-bootstrap'
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

  const elementStyle = {
    marginLeft: '-1rem',
    marginTop: '1rem',
  }

  if (user) {
    return <p style={elementStyle}>Signed in as {user.email}</p>
  }

  return (
    <Button
      style={elementStyle}
      onClick={handleGoogleSignIn}
    >
      Sign in with Google
    </Button>
  )
}
