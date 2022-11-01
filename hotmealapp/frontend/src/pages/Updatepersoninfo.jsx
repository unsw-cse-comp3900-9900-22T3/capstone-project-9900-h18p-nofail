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
  const getinfo = async (username) => {
    const response = await fetch('http://localhost:8080/user/getpersonalinfo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username
      })
    })
    const data = await response.json();
    const info = data.personal_info
    console.log(info)
    localStorage.setItem('info', JSON.stringify(info))
  }
  getinfo(username);
  const userinfo = JSON.parse(localStorage.getItem('info'));
  const [description, setDes] = React.useState(userinfo.description);
  const [email, setEmail] = React.useState(userinfo.email);
  const [user_photo, setImg] = React.useState(userinfo.photo);
  const [password, setPassword] = React.useState(userinfo.password);
  // const [description, setDes] = React.useState('');
  // const [email, setEmail] = React.useState('');
  // const [user_photo, setImg] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const updateinfo = async () => {
    try {
      const response = await fetch('http://localhost:8080//user/updatepersonalinfo', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          description,
          email,
          user_photo,
          password,
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
        <Form.Control placeholder="email" type='text' value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description: </Form.Label>
        <Form.Control placeholder="name" type='text' value={description} onChange={e => setDes(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password: </Form.Label>
        <Form.Control placeholder="password" type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Img: </Form.Label>
        <Form.Control placeholder="confirm password" type='file' value={user_photo} onChange={e => setImg(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={updateinfo}>Update</Button>
    </div>
    </>);
}
export default Updatepersonalinfo;