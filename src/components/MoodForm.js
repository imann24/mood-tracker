import React, { createRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './MoodForm.css'
import MoodSlider from './MoodSlider';
import SleepSlider from './SleepSlider';
import NotesTextArea from './NotesTextArea';
import supabase from '../lib/supabase';

export default class MoodForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.handleSleepChange = this.handleSleepChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      mood: 'Neutral',
      sleep: 'Neutral',
      notes: ''
    };
    this.moodSliderRef = createRef();
    this.sleepSliderRef = createRef();
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

  async handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase
      .from('mood_entries')
      .insert([
        {
          user_id: this.props.user.id,
          mood: this.state.mood,
          sleep: this.state.sleep,
          notes: this.state.notes
        }
      ]);
    if (error) {
      console.error('Error saving mood entry:', error.message)
      toast.error('Error saving mood entry with error:', error.message);
    } else {
      toast.success('Mood entry saved successfully!');
      this.setState({
        mood: 'Neutral',
        sleep: 'Neutral',
        notes: ''
      });
      this.moodSliderRef?.current?.resetState();
      this.sleepSliderRef?.current?.resetState();
    }
  }

  render() {
    return(
      <>
        <ToastContainer />
        <Form onSubmit={this.handleSubmit}>
          <Row className='h-10 p-3'>
              <Col></Col>
          </Row>
          <Row>
              <MoodSlider
                handleChange={this.handleMoodChange}
                ref={this.moodSliderRef}
              />
          </Row>
          <Row className='mt-5'></Row>
          <Row>
              <SleepSlider
                handleChange={this.handleSleepChange}
                ref={this.sleepSliderRef}
              />
          </Row>
          <Row className='h-10 p-3'>
              <Col></Col>
          </Row>
          <Row>
              <NotesTextArea
                handleChange={this.handleNotesChange}
                value={this.state.notes}
              />
          </Row>
          <Row className='h-10 p-3'>
              <Col></Col>
          </Row>
          <Row>
            <Button
              variant='primary'
              type='submit'
              className='submit-button'
              disabled={!this.props.user}
            >
              Record
            </Button>
          </Row>
        </Form>
      </>
    )
  }
}
