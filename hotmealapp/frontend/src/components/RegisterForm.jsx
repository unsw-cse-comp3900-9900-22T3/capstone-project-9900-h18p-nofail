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
  const [style1, setStyle1] = React.useState('');
  const [style2, setStyle2] = React.useState('');
  const navigate = useNavigate();

  const register = async () => {
    if (password != password1) {
      alert("Password is different!");
      return;
    }
    if (name.length < 4 || name.length > 20 || !/^[A-Za-z0-9]+$/.test(name)) {
      alert("Username should contain more than 4 characters, and no more than 20 characters!");
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/.test(password)) {
      alert("Password should be at least 6 character, contain with upper and lower case letter, numbers, and special characters: !@#$%^&*(,)~_");
      return;
    }
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
          "style1":style1,
          "style2":style2
        })
      });
      const data = await response.json();
      localStorage.setItem('token', data.username)
      if(data.status==="success") {
        alert(data.message)
        navigate('/login');
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
        <Form.Label>Email: </Form.Label>
        <Form.Control placeholder="email" type='text' onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username: </Form.Label>
        <Form.Control placeholder="name" type='text' onChange={e => setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password: </Form.Label>
        <Form.Control placeholder="password" type='password' onChange={e => setPassword(e.target.value)} />
        <Form.Text id="passwordHelpBlock" muted>
        Password should be at least 6 character, contain with upper and lower case letter, numbers, and special characters: !@#$%^*(,)~_
      </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password: </Form.Label>
        <Form.Control placeholder="confirm password" type='password' onChange={e => setPassword1(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Which style do you like the most:</Form.Label>
        <Form.Select aria-label="Default select example" onChange={e => setStyle1(e.target.value)}>
          <option>Open to select</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="South_East_Asia">South East Asia</option>
          <option value="French">French</option>
          <option value="Italy">Italy</option>
          <option value="Fast_Food">Fast food</option>
          <option value="Middle_East">Middle East</option>
          <option value="Indian">Indian</option>
          <option value="Russian">Russian</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Which style do you like the second:</Form.Label>
        <Form.Select aria-label="Default select example" onChange={e => setStyle2(e.target.value)}>
          <option>Open to select</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="South_East_Asia">South East Asia</option>
          <option value="French">French</option>
          <option value="Italy">Italy</option>
          <option value="Fast_Food">Fast food</option>
          <option value="Middle_East">Middle East</option>
          <option value="Indian">Indian</option>
          <option value="Russian">Russian</option>
        </Form.Select>
      </Form.Group>
      <Button variant="success" type="submit" onClick={register}>Register</Button>
    </div>
    </>);
}

export default RegisterForm;