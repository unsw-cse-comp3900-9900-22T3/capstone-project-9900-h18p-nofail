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
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await fetch('http://localhost:5005/admin/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name
        })
      });
      const data = await response.json();
      localStorage.setItem('token', data.token)
      navigate('/dashboard');
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
        <Form.Label>Password: </Form.Label>
        <Form.Control placeholder="password" type='password' onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name: </Form.Label>
        <Form.Control placeholder="name" type='text' onChange={e => setName(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={register}>Login</Button>
    </div>
    </>);
}

export default RegisterForm;
