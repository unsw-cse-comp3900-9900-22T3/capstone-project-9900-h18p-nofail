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
import LikeBtn from '../components/LikeBtn';

function MyRecipeCard () {

    function viewRecipe() {
        window.location.href = '/recipe_and_follower/recipe.html';
      }

    
    return(
        <>
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
                    <Col >
                      <Card>
                        <Card.Img variant="top" />
                        <Card.Body>
                          <Card.Img variant="top" src={Zajiangmian} onClick={viewRecipe}/>
                          <Card.Title>Zajiangmian</Card.Title>
                          <LikeBtn />
                          <Button variant="outline-success" size="sm">Edit</Button>
                        </Card.Body>
                      </Card>
                    </Col>
            </Row>

          {/*
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
                  <a href = '/recipe_and_follower/recipe.html' style={{color:"black"}} >
                    Zajiang Noodle
                  </a>
                  <br />
                  <LikeBtn />
                  <a>
                    edit
                  </a>
                </td>
                <td>
                  <img
                    src={Friedpork}
                    onClick={viewRecipe}
                    width={300}
                    height={400}
                  />
                  <br />
                  <a href = '/recipe_and_follower/recipe.html' style={{color:"black"}}>
                    Fried Pork
                  </a>
                  <br />
                  <LikeBtn />
                  <a>
                    edit
                  </a>
                </td>
                <td>
                  <img
                    src={Koushuichicken}
                    onClick={viewRecipe}
                    width={300}
                    height={400}
                  />
                  <br />
                  <a href = '/recipe_and_follower/recipe.html' style={{color:"black"}}>
                    Koushui Chicken
                  </a>
                  <br />
                  <LikeBtn />
                  <a>
                    edit
                  </a>
                </td>
                <td>
                  <img
                    src={Margheritapizza}
                    onClick={viewRecipe}
                    width={300}
                    height={400}
                  />
                  <br />
                  <a href = '/recipe_and_follower/recipe.html' style={{color:"black"}}>
                    Margherita Pizza
                  </a>
                  <br />
                  <LikeBtn />
                  <a>
                    edit
                  </a>
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
                  <a href = '/recipe_and_follower/recipe.html' style={{color:"black"}}>
                    Roujiamo
                  </a>
                  <br />
                  <LikeBtn />
                  <a>
                    edit
                  </a>
                </td>
                <td>
                  <img
                    src={Soursoupbeef}
                    onClick={viewRecipe}
                    width={300}
                    height={400}
                  />
                  <br />
                  <a href = '/recipe_and_follower/recipe.html' style={{color:"black"}}>
                    Sour Soup Beef
                  </a>
                  <br />
                  <LikeBtn />
                  <a>
                    edit
                  </a>
                </td>
                <td>
                  <img
                    src={Tiramisu}
                    onClick={viewRecipe}
                    width={300}
                    height={400}
                  />
                  <br />
                  <a href = '/recipe_and_follower/recipe.html' style={{color:"black"}}>
                    Tiramisu
                  </a>
                  <br />
                  <LikeBtn />
                  <a>
                    edit
                  </a>
                </td>
                <td>
                  <img
                    src={Tomatofriedegges}
                    onClick={viewRecipe}
                    width={300}
                    height={400}
                  />
                  <br />
                  <a href = '/recipe_and_follower/recipe.html' style={{color:"black"}}>
                    Tomato Fried Eggs
                  </a>
                  <br />
                  <LikeBtn />
                  <a>
                    edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

            */}
          </div>
</>
    );

}

export default MyRecipeCard;