import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchRecipePage(){


    const recipes = JSON.parse(localStorage.getItem('recipe_search_return'));
    //console.log(recipes);


    return(
        <>
            <div className='Title'><h1>Search</h1></div>
            <div className='Container1'>
            <text><b>Search Results:</b></text>
            <br />
            <Row xs={1} md={1} className="g-4">
              {recipes.map(recipe =>(
                    <Col >
                      <Card>
                        <Card.Img variant="top" />
                        <Card.Body>
                          <Button variant="outline-success" href = {`/recipe_and_follower/recipe.html?receipId=${recipe.recipe_id}`}>
                            <Card.Img variant="top" src={recipe.recipe_photo} height="180px"/>
                          </Button>
                          <Card.Title>{recipe.recipe_name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
              ))}
            </Row>

          </div>
        </>
    );
}
export default SearchRecipePage;