import React from 'react';
import {
    Button,
    Form,
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../images/logo-social.png';
import MyRecipeCard from '../components/MyRecipeCard';
import PersonalDetail from '../components/PersonalDetail';

function Personalpage() {
  const username = localStorage.getItem('username');
  
  function logoJump() {
      window.location.href = 'http://localhost:3000/homepage';
    }

    function logout() {
      window.location.href = 'http://localhost:3000/login';
    }

    function createRecipe() {
      window.location.href = 'http://localhost:3000/createrecipe';
    }

    function myRecipe() {
      window.location.href = 'http://localhost:3000/personalpage';
    }

    function favoriteRecipe() {
      window.location.href = 'http://localhost:3000/personalpage';
    }


    return (
      <>
        <div className='Title'>
          <h1 onClick={logoJump}>Hot Meal</h1>
        </div>
          <meta charSet="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Web site created using create-react-app" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <title>React App</title>
          <div id="root" />
  {/*Header*/}
  <br />
    <div class="loginRemark" style={{ marginLeft: 1200 }}>
      <Form>
        <Form.Text>Welcome {username}</Form.Text>
        <Button onClick={logout} variant="secondary" style={{ marginLeft: 30 }}>
          Log Out
        </Button>
        </Form>
    </div>

  {/*Personal Details*/}
  <PersonalDetail />

  <div style={{ marginLeft: 100 }}>
    <table border={0}>
      <tbody>
        <tr>
          <td>
            <br />
            <Button id="editSaveBtn" href={`/update_personal_info${username}`} variant="outline-success" style={{ marginLeft: 100 }}>
              Edit/Save
            </Button>
          </td>
          <td></td>
          <td>
            <Button type="createRecipeBtn" onClick={createRecipe} variant="success" style={{ marginLeft: 730 }}>
              Create New Recipe
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  {/*Recipe List*/}
  <br />
  <table bgcolor="#7DA395">
      <tbody>
        <tr>
          <td>
            <a onClick={myRecipe} style={{ marginLeft: 380}}>My Recipe</a>
          </td>
          <td>
            <a onClick={favoriteRecipe} style={{ margin: 434 }}>Favorite Recipe</a>
          </td>
          </tr>
      </tbody>
    </table>
  <br />

<MyRecipeCard />

  {/*script*/}
</>

      );
    }
  

export default Personalpage;
