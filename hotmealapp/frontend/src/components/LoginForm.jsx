import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm () {
  const [username, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const data = await response.json();
      localStorage.setItem('token', data.username)
      if(data.status==="success") {
        // open https://wenqingbucket2.s3.ap-southeast-2.amazonaws.com/homepage/index.html
        window.open("https://wenqingbucket2.s3.ap-southeast-2.amazonaws.com/homepage/index.html", "_self");
      }
      else {
        alert(data.message)
      }
    } catch (err) {
      alert(err)
    }
  }
  return (
    <>
      <div className='Container'>
      <Form.Group className="mb-3">
        <Form.Label>Username: </Form.Label>
        <Form.Control placeholder="username" type='text' onChange={e => setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password: </Form.Label>
        <Form.Control placeholder="password" type='password' onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={login}>Login</Button>
    </div>
    </>);
}

export default LoginForm;
