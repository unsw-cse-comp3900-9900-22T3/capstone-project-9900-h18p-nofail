import React from 'react';
import {
  //   Card,
    Button,
    Form,
  //   Modal
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams,useNavigate } from 'react-router-dom';

function Updatepersonalinfo () {
  const params = useParams();
  const username = params.username;
  const navigate = useNavigate();
  const getinfo = async () => {
    const response = await fetch('http://localhost:8080/user/getpersonalinfo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
      })
    })
    const data = await response.json();
    const info = data.personal_info
    console.log(info)
    localStorage.setItem('info', JSON.stringify(info))
  }
  React.useEffect(() => {
    (async () => {
      await getinfo();
    })(); 
  }, []); 
  const info = JSON.parse(localStorage.getItem('info'));
  const userinfo = info[0];
  console.log(userinfo)
  const [description, setDes] = React.useState(userinfo.description);
  const [email, setEmail] = React.useState(userinfo.email);
  let [user_photo, setImg] = React.useState(userinfo.user_photo);
  const [password, setPassword] = React.useState(userinfo.password);
  // const [description, setDes] = React.useState('');
  // const [email, setEmail] = React.useState('');
  // const [user_photo, setImg] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const updateinfo = async () => {
    console.log(user_photo)
    if(user_photo.length!=0){
      const pics = user_photo.split('\\')
      user_photo = 'imgs/' + pics[pics.length-1];
      console.log(user_photo)
    }
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
        navigate('/personalpage')
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
      <div className='Title'><h3>{username}'s information</h3></div>
      {/* <img src='/logo192.png'></img> */}
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
        <Form.Label>User_photo: </Form.Label>
        <Form.Control placeholder="confirm password" type='file' onChange={e => setImg(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={updateinfo}>Update</Button>
    </div>
    </>);
}
export default Updatepersonalinfo;