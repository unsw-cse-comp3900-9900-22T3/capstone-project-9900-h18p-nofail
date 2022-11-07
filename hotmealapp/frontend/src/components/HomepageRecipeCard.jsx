import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomepageRecipeCard () {

  function viewRecipe(id) {
    if (id)
      window.location.href = `/recipe_and_follower/recipe.html?receipId=${id}`;
  }

  function hanle_CookingTime(){
    
  }

  const all_recipes = JSON.parse(localStorage.getItem('all_recipes'));
  //const all_recipes = JSON.parse(localStorage.getItem('all_recipes'));
  //console.log(all_recipes);



    return (
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
                  {all_recipes.map(all_recipe =>(
                    <Col >
                      <Card>
                        <Card.Body>
                          <Button variant="outline-success" href = {`/recipe_and_follower/recipe.html?receipId=${all_recipe.recipe_id}`}>
                            <Card.Img variant="top" src={all_recipe.recipe_photo} height="180px"/>
                          </Button>
                          <Card.Title>{all_recipe.recipe_name}</Card.Title>
                          <Card.Text>❤️{all_recipe.like_num}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
              ))}
            </Row>
              </div>
</>
        );
}

export default HomepageRecipeCard;