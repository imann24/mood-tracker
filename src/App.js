// import dotenv from 'dotenv'
import React, { useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoodForm from './components/MoodForm';
import GoogleSignIn from './components/GoogleSignIn';
import supabase from './lib/supabase';

// dotenv.config()

export default function App() {
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

  return (
    <Container>
        <GoogleSignIn user={user}/>
        <MoodForm user={user}/>
    </Container>
  );
}
