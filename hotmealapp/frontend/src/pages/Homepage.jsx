import React from 'react';
import {
    Row,
    Button,
    Form,
    Col,
    InputGroup,
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomepageRecipeCard from '../components/HomepageRecipeCard';
import Logout from '../pages/Logout';

function Homepage() {
  function logoJump() {
    window.location.href = 'http://localhost:3000/homepage';
  }

  function personalPage() {
    window.location.href = 'http://localhost:3000/personalpage';
  }

  function viewRecipe() {
    window.location.href = '/recipe_and_follower/recipe.html';
  }

      return (
        <>
        <div className='Title'><h1>Hot Meal</h1></div>
          <p>
            <meta charSet="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta
              name="description"
              content="Web site created using create-react-app"
            />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <title>React App</title>
            <noscript>You need to enable JavaScript to run this app.</noscript>
          </p>
        <div id="root" />

      {/*Header*/}
      <a href = 'http://localhost:3000/homepage' style={{ marginLeft: 200, color:"#7DA395"}}>
        ForU
      </a>
      <a href = 'http://localhost:3000/homepage' style={{ marginLeft: 100, color:"#7DA395" }}>
        Popular
      </a>

      {/*Search Box*/}
      <input type="radio" name="Search Type" defaultValue="Username" style={{ marginLeft: 200}}/>
        Username
      <input type="radio" name="Search Type" defaultValue="Recipe" />
        Recipe
      <input type="text" name="Search Box" />
      <input type="Submit" defaultValue="Search" />
      
      <Button onClick={personalPage} variant="outline-success" style={{ marginLeft: 180 }}>
        Personal Page
      </Button>

      <Logout />

      <HomepageRecipeCard />
      
      {/*script*/}
      <p />
      </>
      );
    }
  

export default Homepage;
