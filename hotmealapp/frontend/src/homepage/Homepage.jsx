//import logo from './logo.svg';
//import './App.css';
import React from 'react';

function Homepage() {
  var NewComponent = React.createClass({
    render: function() {
      return (
        <div>
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
          <img src="logo-social.png" width={80} height={50} style={{marginLeft: '20px'}} />
          <a href="index.html" style={{marginLeft: '200px'}}>ForU</a>
          <a href="index.html" style={{marginLeft: '100px'}}>Popular</a>
          {/*Search Box*/}
          <input type="radio" name="Search Type" defaultValue="Username" style={{marginLeft: '200px'}} />Username
          <input type="radio" name="Search Type" defaultValue="Recipe" />Recipe
          <input type="text" name="Search Box" />
          <input type="Submit" defaultValue="Search" />  
          <a href="personal-page/public/index.html" style={{marginLeft: '100px'}}>Personal Page</a>
          <button type="loginBtn" style={{marginLeft: '30px'}}>Login</button>
          {/*Filters*/}
          <div id="Filters" style={{marginLeft: '100px'}}>
            <br /><label htmlFor="Cooking Time">Cooking Time</label>
            <select>
              <option value="Less than 10min">Less than 10min</option>
              <option value="10-30min">10-30min</option>
              <option value="30-60min">30-60min</option>
              <option value="More than 60min">More than 60min</option>
            </select>
            <label htmlFor="Food Style" style={{marginLeft: '150px'}}>Food Style</label>
            <select>
              <option value="Asian">Asian</option>
              <option value="Italian">Italian</option>
              <option value="French">French</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Other">Other</option>
            </select>
            <label htmlFor="Ingredient" style={{marginLeft: '150px'}}>Ingredient</label>
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
            <label htmlFor="Sorting" style={{marginLeft: '200px'}}>Sort By</label>
            <select>
              <option value="Most Likes">Most Likes</option>
              <option value="Most Subscribed">Most Subscribed</option>
              <option value="Most Recent">Most Recent</option>
            </select>
          </div>
          {/*Recipe List*/}
          <br /><table border={0} style={{paddingLeft: '110px'}}>
            <tbody><tr>
                <td>
                  <img src="zajiangmian.jpeg" width={300} height={400} />
                  <br /><label htmlFor="Zajiang Noodle">Zajiang Noodle</label>
                  <br /><label htmlFor="Likes">Likes:1128</label>
                </td>
                <td>
                  <img src="friedpork.jpeg" width={300} height={400} />
                  <br /><label htmlFor="Fried Pork">Fried Pork</label>
                  <br /><label htmlFor="Likes">Likes:838</label>
                </td>
                <td>
                  <img src="koushuichicken.jpeg" width={300} height={400} />
                  <br /><label htmlFor="Koushui Chicken">Koushui Chicken</label>
                  <br /><label htmlFor="Likes">Likes:566</label>
                </td>
                <td>
                  <img src="MarghheritaPizza.jpeg" width={300} height={400} />
                  <br /><label htmlFor="Margherita Pizza">Margherita Pizza</label>
                  <br /><label htmlFor="Likes">Likes:528</label>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="roujiamo.jpeg" width={300} height={400} />
                  <br /><label htmlFor="Roujiamo">Roujiamo</label>
                  <br /><label htmlFor="Likes">Likes:508</label>
                </td>
                <td>
                  <img src="soursoupbeef.jpeg" width={300} height={400} />
                  <br /><label htmlFor="Sour Soup Beef">Sour Soup Beef</label>
                  <br /><label htmlFor="Likes">Likes:498</label>
                </td>
                <td>
                  <img src="tiramisu.jpeg" width={300} height={400} />
                  <br /><label htmlFor="Tiramisu">Tiramisu</label>
                  <br /><label htmlFor="Likes">Likes:367</label>
                </td>
                <td>
                  <img src="tomatofriedeggs.jpeg" width={300} height={400} />
                  <br /><label htmlFor="Tomato Fried Eggs">Tomato Fried Eggs</label>
                  <br /><label htmlFor="Likes">Likes:228</label>
                </td>
              </tr>
            </tbody></table>
        </div>
      );
    }
  });
    
  
}

export default Homepage;
