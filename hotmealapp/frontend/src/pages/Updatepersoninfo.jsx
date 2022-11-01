import React from 'react';
import {
  //   Card,
    Button,
    Form,
  //   Modal
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';

function Updatepersonalinfo () {
  const params = useParams();
  const username = params.username
  const [des, setDes] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [img, setImg] = React.useState('');
  const [password, setPassword] = React.useState('');
  const updateinfo = async () => {
    try {
      const response = await fetch('http://localhost:8080/recipe/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          des,
          email,
          img,
          password
        })
      });
      const data = await response.json();
      if(data.status==="success") {
        alert("update successfully!")
      }
      else {
        alert(data.message)
        //alert("my alert")
      }
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div className='Container'>
      <div>{username}</div>
      <Form.Group className="mb-3">
        <Form.Label>Email: </Form.Label>
        <Form.Control placeholder="email" type='text' onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description: </Form.Label>
        <Form.Control placeholder="name" type='text' onChange={e => setDes(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password: </Form.Label>
        <Form.Control placeholder="password" type='password' onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Img: </Form.Label>
        <Form.Control placeholder="confirm password" type='file' onChange={e => setImg(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={updateinfo}>Update</Button>
    </div>
    </>);
}
export default Updatepersonalinfo;