import dotenv from 'dotenv'
import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoodForm from './components/MoodForm';
import GoogleSignIn from './components/GoogleSignIn';

dotenv.config()

export default class App extends React.Component {
  render() {
    return (
      <Container>
          <GoogleSignIn />
          <MoodForm/>
      </Container>
    );
  }
}
