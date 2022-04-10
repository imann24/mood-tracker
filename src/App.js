import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoodForm from './components/MoodForm';

export default class App extends React.Component {
  render() {
    return (
      <Container>
          <MoodForm/>
      </Container>
    );
  }
}
