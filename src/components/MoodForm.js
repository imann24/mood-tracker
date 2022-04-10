import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './MoodForm.css'
import MoodSlider from './MoodSlider';
import SleepSlider from './SleepSlider';
import NotesTextArea from './NotesTextArea';

export default class MoodForm extends React.Component {
  constructor() {
    super();
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.handleSleepChange = this.handleSleepChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      mood: 'Neutral',
      sleep: 'Neutral',
      notes: ''
    };
  }

  handleMoodChange(mood) {
    this.setState({mood: mood});
  }

  handleSleepChange(sleep) {
    this.setState({sleep: sleep});
  }

  handleNotesChange(e) {
    this.setState({notes: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Row className='h-10 p-3'>
            <Col></Col>
        </Row>
        <Row>
            <MoodSlider handleChange={this.handleMoodChange}/>
        </Row>
        <Row className='mt-5'></Row>
        <Row>
            <SleepSlider handleChange={this.handleSleepChange}/>
        </Row>
        <Row className='h-10 p-3'>
            <Col></Col>
        </Row>
        <Row>
            <NotesTextArea handleChange={this.handleNotesChange}/>
        </Row>
        <Row className='h-10 p-3'>
            <Col></Col>
        </Row>
        <Row>
          <Button variant='primary' type='submit' className='submit-button'>
            Record
          </Button>
        </Row>
      </Form>
    )
  }
}
