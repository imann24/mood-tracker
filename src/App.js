import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoodForm from './components/MoodForm';

let loggedIn = false;

const loggedInSuccess = (response) => {
  console.log(response);
  loggedIn = true;
}

const loggedInFailure = (response) => {
  console.log(response);
  loggedIn = false;
}

export default class App extends React.Component {
  render() {
    return (
      <Container>
          {loggedIn ? ( <MoodForm/> ) :
            (<div>
              <Row className='h-10 p-3'>
                  <Col></Col>
              </Row>
              <GoogleLogin
                clientId="1014513037859-19ub8dkjn0vuue51n3b9nnvqq8r87ugv.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={loggedInSuccess}
                onFailure={loggedInFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>)
          }
      </Container>
    );
  }
}
