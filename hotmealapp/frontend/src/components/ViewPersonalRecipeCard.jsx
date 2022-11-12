import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';

function ViewPersonalRecipeCard () {
    const params = useParams();
    const username = params.username;

    //get a user's recipe list
    const recipe_username = username;
    const getrecipe = async () => {
        await new Promise(r => setTimeout(r, 4000));

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
          localStorage.setItem('recipe_num', recipes.length);
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
  

    
  
    return(
        <>

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