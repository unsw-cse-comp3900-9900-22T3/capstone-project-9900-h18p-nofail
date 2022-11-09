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
  const id = 10;
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

      //get a user's personal info
      const personal_info = JSON.stringify([{
        "description": "1",
        "email": "1",
        "follower_num": 1,
        "following_num": 2,
        "update_time": "Thu, 06 Oct 2022 13:09:23 GMT",
        "user_photo": "imgs/default.png",
        "username": "kk"
      }]);
      localStorage.setItem('personal_info', personal_info);

      //get a user's recipe list
      const recipes = JSON.stringify([{
        "cooking_time": 30,
        "description": "so good",
        "ingredient": "",
        "like_num": 0,
        "recipe_id": 10,
        "recipe_name": "chaomian",
        "recipe_photo": "imgs/chaomian.jpg",
        "recipe_style": "Italy",
        "recipe_username": "kk",
        "steps": ""
      }]);
      localStorage.setItem('recipes', recipes);

      //get a user's fav recipe list
      const fav_recipes = JSON.stringify([{
        "cooking_time": 30,
        "ingredient": "fish,oil",
        "recipe_create_time": "Sat, 22 Oct 2022 08:51:11 GMT",
        "recipe_id": 9,
        "recipe_name": "fry fish",
        "recipe_photo": "imgs/zhayu.jpg",
        "recipe_style": "Japanese",
        "recipe_username": "Ryan",
        "steps": "pure oil and fry fish"
      }]);
      localStorage.setItem('fav_recipes', fav_recipes);

      //get all recipe list
      const all_recipes = JSON.stringify([{
          "cooking_time": 20,
          "description": "good",
          "ingredient": "oil;tomato; eggs;",
          "like_num": 2,
          "recipe_id": 1,
          "recipe_name": "Tomato fry eggs",
          "recipe_photo": "imgs/fanqiedan.jpg",
          "recipe_style": "Home cooking",
          "recipe_username": "Ryan",
          "steps": "Put oil, then put tomato,finally put eggs, it will finish in 20 min"
      }]);
      localStorage.setItem('all_recipes', all_recipes);
      //////////////////////////////////////////////////////////////////////////

      if(data.status==="success") {
        // open https://wenqingbucket2.s3.ap-southeast-2.amazonaws.com/homepage/index.html
        // window.open("https://wenqingbucket2.s3.ap-southeast-2.amazonaws.com/homepage/index.html", "_self");
        navigate('/homepage')
        localStorage.setItem('username', username)
        
        /////////////////// Wenqing Yi //////////////////////////
        //get personal info
        // let personal_info = data_personal_info.personal_info
        // localStorage.setItem('personal_info', JSON.stringify(personal_info[0]))
        
        //get a user's recipe list
        // let recipes = data_recipe.recipe_list
        // localStorage.setItem('recipes', JSON.stringify(recipes))
        // //get a user's recipe num
        // if(data_recipe.status==="fail"){
        //   localStorage.setItem('recipe_num', 0)
        // }
        // else {
        //   localStorage.setItem('recipe_num', recipes.length)
        // }

        //get a user's fav recipe list
        // let fav_recipes = data_fav_recipe.fav_list
        // localStorage.setItem('fav_recipes', JSON.stringify(fav_recipes))
        
        //get all recipe list
        // let all_recipes = data_all_recipe.recipe_list
        // localStorage.setItem('all_recipes', JSON.stringify(all_recipes))
        // console.log(all_recipes)
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
    </div>
    </>);
}

export default LoginForm;