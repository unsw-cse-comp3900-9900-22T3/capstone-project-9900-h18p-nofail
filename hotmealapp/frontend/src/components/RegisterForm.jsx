import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterForm () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          "email":email,
          "username":name,
          "password":password,
          "password1":password1
        })
      });
      const data = await response.json();
      localStorage.setItem('token', data.username)
      navigate('/login');
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div className='Container'>
      <Form.Group className="mb-3">
        <Form.Label>Email: </Form.Label>
        <Form.Control placeholder="email" type='text' onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name: </Form.Label>
        <Form.Control placeholder="name" type='password' onChange={e => setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password: </Form.Label>
        <Form.Control placeholder="password" type='text' onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password: </Form.Label>
        <Form.Control placeholder="confirm password" type='text' onChange={e => setPassword1(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={register}>Register</Button>
    </div>
    </>);
}

export default RegisterForm;
