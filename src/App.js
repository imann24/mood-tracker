import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoodSlider from './components/MoodSlider';
import SleepSlider from './components/SleepSlider';
import NotesTextArea from './components/NotesTextArea';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Container>
        <Row className='h-10 p-3'>
            <Col></Col>
        </Row>
        <Row>
            <MoodSlider/>
        </Row>
        <Row className='mt-5'></Row>
        <Row>
            <SleepSlider/>
        </Row>
        <Row className='h-10 p-3'>
            <Col></Col>
        </Row>
        <Row>
            <NotesTextArea/>
        </Row>
    </Container>
  );
}

export default App;
