import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
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



function ViewPersonalRecipeCard () {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    console.log(recipes);

    function viewRecipe(id) {
      if (id)
        window.location.href = `/recipe_and_follower/recipe.html?receipId=${id}`;
    }
  
    function myRecipe() {
      window.location.href = 'http://localhost:3000/personalpage';
      }
  
    function favoriteRecipe() {
      window.location.href = 'http://localhost:3000/favrecipepage';
      }

    

    
    return(
        <>
          {/*Recipe List*/}
            <br />
            <table bgcolor="#7DA395">
                <tbody>
                  <tr>
                    <td>
                    <a href = 'http://localhost:3000/personalpage' style={{ marginLeft: 380, color:'black'}}>My Recipe</a>
                    </td>
                    <td>
                      <a href = 'http://localhost:3000/favrecipepage' style={{ margin: 434 , color:'black'}}>Favorite Recipe</a>
                    </td>
                    </tr>
                </tbody>
              </table>
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
              <label htmlFor="Sorting" style={{ marginLeft: 190}}>
                Sort By:
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
            <Row xs={1} md={4} className="g-4">
              {recipes.map(recipe =>(
                    <Col >
                      <Card>
                        <Card.Img variant="top" />
                        <Card.Body>
                          <Button variant="outline-success" href = {`/recipe_and_follower/recipe.html?receipId=${recipe.recipe_id}`}>
                            <Card.Img variant="top" src={recipe.recipe_photo}/>
                          </Button>
                          <Card.Title>{recipe.recipe_name}</Card.Title>
                          <Card.Text>❤️{recipe.like_num}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
              ))}
            </Row>

          </div>
</>
    );

}

export default ViewPersonalRecipeCard;