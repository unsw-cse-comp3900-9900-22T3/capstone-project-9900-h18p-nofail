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
  const navigate = useNavigate();
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

      ////////////////////// Wenqing Yi /////////////////////////////////////
      //get personal info
      const response_personal_info = await fetch('http://localhost:8080/user/getpersonalinfo', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username
        })
      });
      const data_personal_info = await response_personal_info.json();

      //get a user's recipe list
      const recipe_username = localStorage.getItem('username')
      const response_recipe = await fetch('http://localhost:8080/recipe/showlist', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          recipe_username
        })
      });
      const data_recipe = await response_recipe.json();
      //////////////////////////////////////////////////////////////////////////

      if(data.status==="success") {
        // open https://wenqingbucket2.s3.ap-southeast-2.amazonaws.com/homepage/index.html
        // window.open("https://wenqingbucket2.s3.ap-southeast-2.amazonaws.com/homepage/index.html", "_self");
        navigate('/homepage')
        localStorage.setItem('username', username)
        
        /////////////////// Wenqing Yi //////////////////////////
        //get personal info
        let personal_info = data_personal_info.personal_info
        localStorage.setItem('personal_info', JSON.stringify(personal_info[0]))
        
        //get recipe list
        let recipes = data_recipe.recipe_list
        localStorage.setItem('recipes', JSON.stringify(recipes))
        //get a user's recipe num
        if(data_recipe.status==="fail"){
          localStorage.setItem('recipe_num', 0)
        }
        else {
          localStorage.setItem('recipe_num', recipes.length)
        }
        //////////////////////////////////////////////////////////

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
      <Button variant="success" type="submit" href={`/update_personal_info/${username}`}>try</Button>
    </div>
    </>);
}

export default LoginForm;