import React from 'react';
import { Form } from 'react-bootstrap';
import './Main.css'
import './NotesTextArea.css'

class NotesTextArea extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.props.handleChange.bind(this);
  };

  render() {
    return (
      <div>
        <h1>Notes</h1>
        <Form.Control id='notes-text' as='textarea' rows={5} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default NotesTextArea;
