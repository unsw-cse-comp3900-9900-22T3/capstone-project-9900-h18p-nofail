import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomepageRecipeCard () {

  //get all recipes
  const getrecipe = async () => {
      
     const response_all_recipe = await fetch('http://localhost:8080/recipe/showall', {
       method: 'POST',
       headers: {
         'Content-type': 'application/json',
       },
       body: JSON.stringify({
        
       })
     })
     const data_all_recipe = await response_all_recipe.json();
     if(data_all_recipe.status==="success") {
       let all_recipes = data_all_recipe.recipe_list
       localStorage.setItem('all_recipes', JSON.stringify(all_recipes))
       console.log(all_recipes)
     }else {
      alert(data_all_recipe.message)
    }
   }
   React.useEffect(() => {
     (async () => {
       await getrecipe();
       if(location.href.indexOf("#1")==-1){
        location.href=location.href+"#1";
        location.reload();
        }
     })(); 
   }, []); 
  
  const all_recipes = JSON.parse(localStorage.getItem('all_recipes'));

  // const filter_cooking_time = document.getElementById('filter_cooking_time').value;
  //   console.log(filter_cooking_time);
  //filters
  // const filter_cooking_time = async() => {
  //   const filter_cooking_time = document.getElementById('filter_cooking_time').value;
  //   console.log(filter_cooking_time);
  // }

  

    return (
            <>
            {/*Filters*/}
              <div className='Container2'>
                  <div id="Filters">
                        <br />
                        <label htmlFor="Cooking Time">Cooking Time: </label>
                        <select id="filter_cooking_time">
                          <option value="easy">Less than 30min</option>
                          <option value="middle">30-60min</option>
                          <option value="hard">More than 60min</option>
                        </select>
                        <label htmlFor="Food Style" style={{ marginLeft: 80 }}>
                          Food Style: 
                        </label>
                        <select>
                          <option value="Chinese">Chinese</option>
                          <option value="Japanese">Japanese</option>
                          <option value="Korean">Korean</option>
                          <option value="South East Asia">South East Asia</option>
                          <option value="French">French</option>
                          <option value="Italy">Italy</option>
                          <option value="Fast Food">Fast Food</option>
                          <option value="Middle East">Middle East</option>
                          <option value="Indian">Indian</option>
                          <option value="Russian">Russian</option>
                        </select>
                        <label htmlFor="Ingredient" style={{ marginLeft: 80 }}>
                          Ingredient: 
                        </label>
                        <select>
                          <option value="rice">Rice</option>
                          <option value="noodle">Noodle</option>
                          <option value="beef">Beef</option>
                          <option value="chicken">Chicken</option>
                          <option value="pork">Pork</option>
                          <option value="fish">Fish</option>
                          <option value="vegetable">Vegetable</option>
                          <option value="milk">Milk</option>
                        </select>
                        <label htmlFor="Sorting" style={{ marginLeft: 130}}>
                          Sort By: 
                        </label>
                        <select>
                          <option value="Most Likes">Most Likes</option>
                          <option value="Most Subscribed">Most Followers</option>
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