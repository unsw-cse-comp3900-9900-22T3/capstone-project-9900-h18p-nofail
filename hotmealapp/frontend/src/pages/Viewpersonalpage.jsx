import React from 'react';
import {
    Row,
    Button,
    Form,
    Col,
    InputGroup,
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Friedpork from '../images/friedpork.jpeg';
import Koushuichicken from '../images/koushuichicken.jpeg';
import Margheritapizza from '../images/MarghheritaPizza.jpeg';
import Roujiamo from '../images/roujiamo.jpeg';
import Soursoupbeef from '../images/soursoupbeef.jpeg';
import Tiramisu from '../images/tiramisu.jpeg';
import Tomatofriedegges from '../images/tomatofriedeggs.jpeg';
import Zajiangmian from '../images/zajiangmian.jpeg';
import Portrait from '../images/Portrait.jpeg';

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

      function following() {
        window.location.href = 'https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/following.html';
      }

      function follower() {
        window.location.href = 'https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/follower.html';
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
        <div className='Title'><h1>Personal Page</h1></div>
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
  {/*<img src="logo-social.png" onclick="logoJump()" width={80} height={50} style={{ marginLeft: 20 }}/>*/}
  <u>
  <br />
  <label htmlFor="Welcome" style={{ marginLeft: 1200 }}>
      Welcome Ryan
    </label>
  </u>
  <Button onClick={logout} variant="secondary" style={{ marginLeft: 30 }}>
    Log Out
  </Button>

  {/*Personal Details*/}
  <div id="Personal Details" style={{ marginLeft: 100 }}>
    <table border={0}>
      <tbody>
        <tr>
          <td>
            <img src={Portrait} width={180} height={180} />
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
            <Button
              onClick={following}
              variant="outline-secondary"
              style={{ marginLeft: 500 }}
            >
              Following
            </Button>
          </td>
          <td>
            <label htmlFor="Follower Number" style={{ marginLeft: 0 }}>
              100
            </label>
            <br />
            <Button
              onClick={follower}
              variant="outline-secondary"
              style={{ marginLeft: 0 }}
            >
              Follower
            </Button>
          </td>
          <td>
            <label htmlFor="Recipes Number" style={{ marginLeft: 50 }}>
              5
            </label>
            <br />
            <Button variant="outline-secondary" style={{ marginLeft: 50 }}>
              Recipes
            </Button>
          </td>
        </tr>
        <tr>
          <td>
            <br />
            <Button
              id="subscribeBtn"
              onClick={subscribe}
              variant="outline-success"
              style={{ marginLeft: 50 }}
            >
              Subscribe
            </Button>
          </td>
          <td></td>
          <td>
            <Button
              type="createRecipeBtn"
              onClick={createRecipe}
              variant="success"
              style={{ marginLeft: 500 }}
            >
              Create New Recipe
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  {/*Recipe List*/}
  <br />
  <label onClick={myRecipe} style={{ marginLeft: 380 }}>My Recipe</label>
  <label onClick={favoriteRecipe} style={{ marginLeft: 500 }}>Favorite Recipe</label>
  <br />

  {/*Filters*/}
  <div className='Container2'>
  <div id="Filters">
    <br />
    <label htmlFor="Cooking Time">Cooking Time: </label>
    <select>
      <option value="Less than 10min">Less than 10min</option>
      <option value="10-30min">10-30min</option>
      <option value="30-60min">30-60min</option>
      <option value="More than 60min">More than 60min</option>
    </select>
    <label htmlFor="Food Style" style={{ marginLeft: 80 }}>
      Food Style: 
    </label>
    <select>
      <option value="Asian">Asian</option>
      <option value="Italian">Italian</option>
      <option value="French">French</option>
      <option value="Fast Food">Fast Food</option>
      <option value="Other">Other</option>
    </select>
    <label htmlFor="Ingredient" style={{ marginLeft: 80 }}>
      Ingredient: 
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
    <label htmlFor="Sorting" style={{ marginLeft: 195}}>
      Sort By
    </label>
    <select>
      <option value="Most Likes">Most Likes</option>
      <option value="Most Subscribed">Most Subscribed</option>
      <option value="Most Recent">Most Recent</option>
    </select>
  </div>
  </div>

  {/*Recipe Table*/}
  <div className='Container2'>
  <br />
  <table>
    <tbody>
      <tr>
        <td>
          <img
            src={Zajiangmian}
            onClick={viewRecipe}
            width={300}
            height={400}
          />
          <br />
          <a onClick={viewRecipe}>
            Zajiang Noodle
          </a>
          <br />
          <label htmlFor="Likes">Likes:1128</label>
        </td>
        <td>
          <img
            src={Friedpork}
            onClick={viewRecipe}
            width={300}
            height={400}
          />
          <br />
          <a onClick={viewRecipe}>
            Fried Pork
          </a>
          <br />
          <label htmlFor="Likes">Likes:838</label>
        </td>
        <td>
          <img
            src={Koushuichicken}
            onClick={viewRecipe}
            width={300}
            height={400}
          />
          <br />
          <a onClick={viewRecipe}>
            Koushui Chicken
          </a>
          <br />
          <label htmlFor="Likes">Likes:566</label>
        </td>
        <td>
          <img
            src={Margheritapizza}
            onClick={viewRecipe}
            width={300}
            height={400}
          />
          <br />
          <a onClick={viewRecipe}>
            Margherita Pizza
          </a>
          <br />
          <label htmlFor="Likes">Likes:528</label>
        </td>
      </tr>
      <tr>
        <td>
          <img
            src={Roujiamo}
            onClick={viewRecipe}
            width={300}
            height={400}
          />
          <br />
          <a onClick={viewRecipe}>
            Roujiamo
          </a>
          <br />
          <label htmlFor="Likes">Likes:508</label>
        </td>
        <td>
          <img
            src={Soursoupbeef}
            onClick={viewRecipe}
            width={300}
            height={400}
          />
          <br />
          <a onClick={viewRecipe}>
            Sour Soup Beef
          </a>
          <br />
          <label htmlFor="Likes">Likes:498</label>
        </td>
        <td>
          <img
            src={Tiramisu}
            onClick={viewRecipe}
            width={300}
            height={400}
          />
          <br />
          <a onClick={viewRecipe}>
            Tiramisu
          </a>
          <br />
          <label htmlFor="Likes">Likes:367</label>
        </td>
        <td>
          <img
            src={Tomatofriedegges}
            onClick={viewRecipe}
            width={300}
            height={400}
          />
          <br />
          <a onClick={viewRecipe}>
            Tomato Fried Eggs
          </a>
          <br />
          <label htmlFor="Likes">Likes:228</label>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  {/*script*/}
</>


      );
    }
  

export default Viewpersonalpage;
