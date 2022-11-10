import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PopularPage(){


    const recipes = JSON.parse(localStorage.getItem('popular_recipes'));
    //console.log(recipes);


    return(
        <>
            <div className='Title'><h1>Popular</h1></div>
            <div className='Container2'>
            <br />
            <Row xs={1} md={4} className="g-4">
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
export default PopularPage;