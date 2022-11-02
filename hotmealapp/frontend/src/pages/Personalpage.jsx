import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalRecipeCard from '../components/PersonalRecipeCard';
import PersonalDetail from '../components/PersonalDetail';
import Logout from '../pages/Logout';

function Personalpage() {
  const username = localStorage.getItem('username');

  const getinfo = async (username) => {
    try {
      const response = await fetch('http://localhost:8080/user/getpersonalinfo', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username  // username: username
        })
        
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  

  useEffect(() => {
    (async () => {
      let info = await getinfo(username);
      if (info.status === 'success') {
        localStorage.setItem('info', JSON.stringify(info.personal_info));
        
        console.log(info.personal_info);
        
      } else {
        alert(info.message);
      }
    })(); // IIFE
  }, []); // [] means no dependency
  
  function logoJump() {
      window.location.href = 'http://localhost:3000/homepage';
    }

    function createRecipe() {
      window.location.href = 'http://localhost:3000/createrecipe';
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
        <Logout />
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
            <Button id="editSaveBtn" href={`/update_personal_info/${username}`} variant="outline-success" style={{ marginLeft: 100 }}>
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


<PersonalRecipeCard />

  {/*script*/}
</>

      );
    }
  

export default Personalpage;
