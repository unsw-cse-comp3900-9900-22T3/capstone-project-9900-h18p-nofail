import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';

function PersonalRecipeCard () {

  const params = useParams();
  //const username = params.username;
  const username = localStorage.getItem('username');

  //get a user's recipe list
  const recipe_username = username;
  const getrecipe = async () => {
      //make the page wait for 2 seconds
      await new Promise(r => setTimeout(r, 3000));

      const response_recipe = await fetch('http://localhost:8080/recipe/showlist', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          recipe_username
        })
      });
      const data_recipe = await response_recipe.json();
      if(data_recipe.status==="success") {
        let recipes = data_recipe.recipe_list;
        localStorage.setItem('recipes', JSON.stringify(recipes));
        localStorage.setItem('recipe_num', recipes.length)
      }

      //get a user's recipe number
      else if(data_recipe.status==="fail"){
        localStorage.setItem('recipe_num', 0);
        alert(data_recipe.message)
      }
  }
  React.useEffect(() => {
      (async () => {
        await getrecipe();
        if(location.href.indexOf("#2")==-1 ){
          location.href=location.href+"#2";
          location.reload();
        } 
          
      })(); 
  }, []); 
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  //console.log(recipes);
  

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
                        <Card.Img variant="top"/>
                        <Card.Body>
                          <Button variant="outline-success" href = {`/recipe_and_follower/recipe.html?receipId=${recipe.recipe_id}`}>
                            <Card.Img variant="top" src={"/"+recipe.recipe_photo} height="180px"/>
                          </Button>
                          <Card.Title>{recipe.recipe_name}</Card.Title>
                          <Card.Text>❤️{recipe.like_num}</Card.Text>
                          <Button variant="outline-success" size="sm" href={`/updaterecipe/${recipe.recipe_id}`}>
                            Edit
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
              ))}
            </Row>

          </div>
</>
    );

}

export default PersonalRecipeCard;