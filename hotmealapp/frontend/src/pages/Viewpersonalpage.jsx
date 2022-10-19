import React from 'react';
import {
    Row,
    Button,
    Form,
    Col,
    InputGroup,
  } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';

function Viewpersonalpage() {
    function logoJump() {
        window.location.href = 'http://localhost:3000/homepage';
      }

      function logout() {
        window.location.href = 'http://localhost:3000/login';
      }

      function subscribe(){
        alert("You have subscribed this author!")
      }

      function createRecipe() {
        window.location.href = 'http://localhost:3000/createrecipe';
      }

      function myRecipe() {
        window.location.href = 'http://localhost:3000/homepage';
      }

      function favoriteRecipe() {
        window.location.href = 'http://localhost:3000/homepage';
      }

      function viewRecipe() {
        window.location.href = 'https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html';
      }

      return (
        <>
  <meta charSet="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <title>React App</title>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root" />
  {/*Header*/}
  <img
    src="logo-social.png"
    onclick="logoJump()"
    width={80}
    height={50}
    style={{ marginLeft: 20 }}
  />
  <u>
    <label htmlFor="Welcome" style={{ marginLeft: 1100 }}>
      Welcome Ryan
    </label>
  </u>
  <button type="button" onclick="logout()" style={{ marginLeft: 30 }}>
    Log Out
  </button>
  <h1 style={{ marginLeft: 600 }}>Personal Page</h1>
  {/*Personal Details*/}
  <div id="Personal Details" style={{ marginLeft: 100 }}>
    <table border={0}>
      <tbody>
        <tr>
          <td>
            <img src="Portrait.jpeg" width={180} height={180} />
          </td>
          <td>
            <b>
              <h2>Ryan</h2>
            </b>
            <br />
            <label htmlFor="Bio">Welcome, I'm Ryan.</label>
          </td>
          <td>
            <label htmlFor="Following Number" style={{ marginLeft: 500 }}>
              10
            </label>
            <br />
            <a
              href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/following.html"
              style={{ marginLeft: 500 }}
            >
              Following
            </a>
          </td>
          <td>
            <label htmlFor="Follower Number" style={{ marginLeft: 0 }}>
              100
            </label>
            <br />
            <a
              href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/follower.html"
              style={{ marginLeft: 0 }}
            >
              Follower
            </a>
          </td>
          <td>
            <label htmlFor="Recipes Number" style={{ marginLeft: 50 }}>
              5
            </label>
            <br />
            <label htmlFor="Recipes" style={{ marginLeft: 50 }}>
              Recipes
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <br />
            <button
              id="subscribeBtn"
              onclick="subscribe()"
              style={{ marginLeft: 50 }}
            >
              Subscribe
            </button>
          </td>
          <td></td>
          <td>
            <button
              type="createRecipeBtn"
              onclick="createRecipe()"
              style={{ marginLeft: 500 }}
            >
              Create New Recipe
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  {/*Recipe List*/}
  <br />
  <button type="myRecipeBtn" onclick="myRecipe()" style={{ marginLeft: 380 }}>
    My Recipe
  </button>
  <button
    type="favoriteRecipeBtn"
    onclick="favoriteRecipe()"
    style={{ marginLeft: 500 }}
  >
    Favorite Recipe
  </button>
  <br />
  {/*Filters*/}
  <div id="Filters" style={{ marginLeft: 100 }}>
    <br />
    <label htmlFor="Cooking Time">Cooking Time</label>
    <select>
      <option value="Less than 10min">Less than 10min</option>
      <option value="10-30min">10-30min</option>
      <option value="30-60min">30-60min</option>
      <option value="More than 60min">More than 60min</option>
    </select>
    <label htmlFor="Food Style" style={{ marginLeft: 150 }}>
      Food Style
    </label>
    <select>
      <option value="Asian">Asian</option>
      <option value="Italian">Italian</option>
      <option value="French">French</option>
      <option value="Fast Food">Fast Food</option>
      <option value="Other">Other</option>
    </select>
    <label htmlFor="Ingredient" style={{ marginLeft: 150 }}>
      Ingredient
    </label>
    <select>
      <option value="Rice">Rice</option>
      <option value="Noodle">Noodle</option>
      <option value="Beef">Beef</option>
      <option value="Chicken">Chicken</option>
      <option value="Pork">Pork</option>
      <option value="Lamb">Lamb</option>
      <option value="Vegetable">Vegetable</option>
      <option value="Other">Other</option>
    </select>
    <label htmlFor="Sorting" style={{ marginLeft: 200 }}>
      Sort By
    </label>
    <select>
      <option value="Most Likes">Most Likes</option>
      <option value="Most Subscribed">Most Subscribed</option>
      <option value="Most Recent">Most Recent</option>
    </select>
  </div>
  <br />
  {/*Recipe Table*/}
  <br />
  <table border={0} style={{ paddingLeft: 110 }}>
    <tbody>
      <tr>
        <td>
          <img
            src="zajiangmian.jpeg"
            onclick="viewRecipe()"
            width={300}
            height={400}
          />
          <br />
          <a href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">
            Zajiang Noodle
          </a>
          <br />
          <label htmlFor="Likes">Likes:1128</label>
        </td>
        <td>
          <img
            src="friedpork.jpeg"
            onclick="viewRecipe()"
            width={300}
            height={400}
          />
          <br />
          <a href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">
            Fried Pork
          </a>
          <br />
          <label htmlFor="Likes">Likes:838</label>
        </td>
        <td>
          <img
            src="koushuichicken.jpeg"
            onclick="viewRecipe()"
            width={300}
            height={400}
          />
          <br />
          <a href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">
            Koushui Chicken
          </a>
          <br />
          <label htmlFor="Likes">Likes:566</label>
        </td>
        <td>
          <img
            src="MarghheritaPizza.jpeg"
            onclick="viewRecipe()"
            width={300}
            height={400}
          />
          <br />
          <a href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">
            Margherita Pizza
          </a>
          <br />
          <label htmlFor="Likes">Likes:528</label>
        </td>
      </tr>
      <tr>
        <td>
          <img
            src="roujiamo.jpeg"
            onclick="viewRecipe()"
            width={300}
            height={400}
          />
          <br />
          <a href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">
            Roujiamo
          </a>
          <br />
          <label htmlFor="Likes">Likes:508</label>
        </td>
        <td>
          <img
            src="soursoupbeef.jpeg"
            onclick="viewRecipe()"
            width={300}
            height={400}
          />
          <br />
          <a href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">
            Sour Soup Beef
          </a>
          <br />
          <label htmlFor="Likes">Likes:498</label>
        </td>
        <td>
          <img
            src="tiramisu.jpeg"
            onclick="viewRecipe()"
            width={300}
            height={400}
          />
          <br />
          <a href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">
            Tiramisu
          </a>
          <br />
          <label htmlFor="Likes">Likes:367</label>
        </td>
        <td>
          <img
            src="tomatofriedeggs.jpeg"
            onclick="viewRecipe()"
            width={300}
            height={400}
          />
          <br />
          <a href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">
            Tomato Fried Eggs
          </a>
          <br />
          <label htmlFor="Likes">Likes:228</label>
        </td>
      </tr>
    </tbody>
  </table>
  {/*script*/}
</>


      );
    }
  

export default Viewpersonalpage;
