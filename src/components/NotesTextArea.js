import React from 'react';
import { Form } from 'react-bootstrap';
import './Main.css'
import './NotesTextArea.css'

class NotesTextArea extends React.Component {
  render() {
    return (
      <div>
        <h1>Notes</h1>
        <Form.Control id='notes-text' as='textarea' rows={5} />
      </div>
    )
  }
}

export default NotesTextArea;
