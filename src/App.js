import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoodForm from './components/MoodForm';

let loggedIn = false;

export default class App extends React.Component {
  render() {
    return (
      <Container>
          {loggedIn ? ( <MoodForm/> ) :
            (<div>
              <Row className='h-10 p-3'>
                  <Col></Col>
              </Row>
              <a className="button google" href="login/federated/google">Sign in with Google</a>
            </div>)
          }
      </Container>
    );
  }
}
