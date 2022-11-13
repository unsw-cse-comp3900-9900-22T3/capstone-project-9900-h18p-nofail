import React from 'react';
import {
  Card,
  Row,
  Col,
  Button,
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
          console.log("all_recipes:",all_recipes)
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


  //filters - Cooking Time
  const filter_cooking_time = async() => {
      const filter_cooking_time_value = document.getElementById('filter_cooking_time').value;
      const filter_content = JSON.stringify({"search_content":"","difficult":filter_cooking_time_value,"style_name":"","ingredient":""});
      var filter_content_real = JSON.parse(filter_content);

      const response = await fetch('http://localhost:8080/search/recipe', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          filter_content_real
        }.filter_content_real)
      });
      const data = await response.json();
      if(data.status==="success") {
        localStorage.setItem('all_recipes', JSON.stringify(data.return_recipe));
        console.log("filter_cooking_time:",data.return_recipe);
        const all_recipes = JSON.parse(localStorage.getItem('all_recipes'));

        if(location.href.indexOf("#1")!=-1){
           location.href=location.href+"#2";
           location.reload();
           }
      }else {
        alert("No recipe found!")
      }
  }


  //filters - Food Style
  const filter_food_style = async() => {
        const filter_food_style_value = document.getElementById('filter_food_style').value;
        const filter_content = JSON.stringify({"search_content":"","difficult":"","style_name":filter_food_style_value,"ingredient":""});
        var filter_content_real = JSON.parse(filter_content);

        const response = await fetch('http://localhost:8080/search/recipe', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            filter_content_real
          }.filter_content_real)
        });
        const data = await response.json();
        if(data.status==="success") {
          localStorage.setItem('all_recipes', JSON.stringify(data.return_recipe));
          console.log("filter_food_style:",data.return_recipe);
          const all_recipes = JSON.parse(localStorage.getItem('all_recipes'));

          if(location.href.indexOf("#1")!=-1){
            location.href=location.href+"#2";
            location.reload();
            }
        }else {
          alert("No recipe found!")
        }
  }


  //filters - Ingredients
  const filter_ingredient = async() => {
        const filter_ingredient_value = document.getElementById('filter_ingredient').value;
        const filter_content = JSON.stringify({"search_content":"","difficult":"","style_name":"","ingredient":filter_ingredient_value});
        var filter_content_real = JSON.parse(filter_content);

        const response = await fetch('http://localhost:8080/search/recipe', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            filter_content_real
          }.filter_content_real)
        });
        const data = await response.json();
        if(data.status==="success") {
          localStorage.setItem('all_recipes', JSON.stringify(data.return_recipe));
          console.log("filter_food_style:",data.return_recipe);
          const all_recipes = JSON.parse(localStorage.getItem('all_recipes'));

          if(location.href.indexOf("#1")!=-1){
            location.href=location.href+"#2";
            location.reload();
            }
        }else {
          alert("No recipe found!")
        }
  }


  //filter - Sort by
  function filter_sort_by(){
    const filter_sort_by_value = document.getElementById('filter_sort_by').value;
    if(filter_sort_by_value==="Most Likes"){
        all_recipes.sort(function(a,b){
          return b.like_num - a.like_num;
        })
        localStorage.setItem('all_recipes', JSON.stringify(all_recipes));
        console.log("sort_by_like_num:",all_recipes);

        if(location.href.indexOf("#1")!=-1){
          location.href=location.href+"#2";
          location.reload();
          }
    }
  }



  

    return (
            <>
            {/*Filters*/}
              <div className='Container2'>
                  <div id="Filters">
                        <br />
                        <label htmlFor="Cooking Time">Cooking Time: </label>
                        <select id="filter_cooking_time" onChange={e => filter_cooking_time(e.target.value)}>
                          <option value="">Open to select</option>
                          <option value="easy">Less than 30min</option>
                          <option value="middle">30-60min</option>
                          <option value="hard">More than 60min</option>
                        </select>
                        <label htmlFor="Food Style" style={{ marginLeft: 80 }}>Food Style: </label>
                        <select id="filter_food_style" onChange={e => filter_food_style(e.target.value)}>
                          <option value="">Open to select</option>
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
                        <label htmlFor="Ingredient" style={{ marginLeft: 80 }}>Ingredient: </label>
                        <select id="filter_ingredient" onChange={e => filter_ingredient(e.target.value)}>
                          <option value="">Open to select</option>
                          <option value="rice">Rice</option>
                          <option value="noodle">Noodle</option>
                          <option value="beef">Beef</option>
                          <option value="chicken">Chicken</option>
                          <option value="pork">Pork</option>
                          <option value="fish">Fish</option>
                          <option value="vegetable">Vegetable</option>
                          <option value="milk">Milk</option>
                          <option value="egg">Egg</option>
                        </select>
                        <label htmlFor="Sorting" style={{ marginLeft: 130}}>Sort By: </label>
                        <select id="filter_sort_by" onChange={e => filter_sort_by(e.target.value)}>
                          <option value="">Open to select</option>
                          <option value="Most Likes">Most Likes</option>
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