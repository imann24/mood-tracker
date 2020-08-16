import React from 'react';
import './App.css';
import MoodSlider from './components/MoodSlider';
import SleepSlider from './components/SleepSlider';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container>
        <Row className='h-10 p-3'>
            <Col></Col>
        </Row>
        <Row>
            <MoodSlider/>
        </Row>
        <Row>
            <SleepSlider/>
        </Row>
        <Row className='h-10 p-3'>
            <Col></Col>
        </Row>
    </Container>
  );
}

export default App;
