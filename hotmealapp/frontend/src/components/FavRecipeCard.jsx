import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';

function FavRecipeCard () {
  const params = useParams();
  const username = params.username;

  //get a user's fav recipe list
  const getfavrecipe = async () => {
      await new Promise(r => setTimeout(r, 4000));

      const response_fav_recipe = await fetch('http://localhost:8080/user/getfavlist', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username
          })
        });
        const data_fav_recipe = await response_fav_recipe.json();
        if(data_fav_recipe.status==="success") {
          let fav_recipes = data_fav_recipe.fav_list
          localStorage.setItem('fav_recipes', JSON.stringify(fav_recipes))
          //console.log(recipes);
        }else {
          alert(data_fav_recipe.message)
        }
  }
  React.useEffect(() => {
      (async () => {
        await getfavrecipe();
        if(location.href.indexOf("#2")==-1 ){
          location.href=location.href+"#2";
          location.reload();
        } 
      })(); 
  }, []); 
  const fav_recipes = JSON.parse(localStorage.getItem('fav_recipes'));


  

    return (
            <>
              {/*Recipe Table*/}
              <div className='Container2'>
                <br />
                <Row xs={1} md={4} className="g-4">
                  {fav_recipes.map(fav_recipe =>(
                    <Col >
                      <Card>
                        <Card.Body>
                          <Button variant="outline-success" href = {`/recipe_and_follower/recipe.html?receipId=${fav_recipe.recipe_id}`}>
                            <Card.Img variant="top" src={"/" + fav_recipe.recipe_photo} height="180px"/>
                          </Button>
                          <Card.Title>{fav_recipe.recipe_name}</Card.Title>
                          <Card.Text>❤️{fav_recipe.like_num}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
              ))}
            </Row>
              </div>
</>
        );
}

export default FavRecipeCard;