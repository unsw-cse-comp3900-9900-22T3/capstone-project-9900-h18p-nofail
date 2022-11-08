import React from 'react';
import {
    Button,
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import HomepageRecipeCard from '../components/HomepageRecipeCard';
import Logout from '../pages/Logout';


function Homepage() {
  const username = localStorage.getItem('username');
  const HomepageRecipeCard = React.lazy(() => import('../components/HomepageRecipeCard'));

  //personal page button
  function personalPage() {
    window.location.href = 'http://localhost:3000/personalpage';
  }
  
  //search button
  const searchBtn = async () => {
      const radio_box = document.getElementsByName("searchType");
      var search_box_content = document.getElementById("SearchBox");
      const search_box_value = search_box_content.value;
      const search_content = JSON.stringify({"search_content":search_box_value,"difficult":"","style_name":"","ingredient":""});
      var search_content_real = JSON.parse(search_content);

        if(radio_box[0].checked){
              const response = await fetch('http://localhost:8080/search/user', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify(
                {
                  search_content_real
                }.search_content_real
              )
            });
            const data = await response.json();
            let user_search_return = data.return_user
            localStorage.setItem('user_search_return', JSON.stringify(user_search_return))

            window.location.href = 'http://localhost:3000/searchuserpage';

        } else if (radio_box[1].checked){
            const response = await fetch('http://localhost:8080/search/recipe', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              search_content_real
            }.search_content_real)
          });
          const data = await response.json();
          localStorage.setItem('recipe_search_return', JSON.stringify(data.return_recipe))

          window.location.href = 'http://localhost:3000/searchrecipepage';
        }
    }


      return (
        <>
        <div className='Title'><h1>Hot Meal</h1></div>
          <p>
            <meta charSet="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta
              name="description"
              content="Web site created using create-react-app"
            />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <title>React App</title>
            <noscript>You need to enable JavaScript to run this app.</noscript>
          </p>
        <div id="root" />

      {/*Header*/}
      <a href = 'http://localhost:3000/homepage' style={{ marginLeft: 200, color:"#7DA395"}}>
        ForU
      </a>
      <a href = 'http://localhost:3000/homepage' style={{ marginLeft: 100, color:"#7DA395" }}>
        Popular
      </a>

      {/*Search Box*/}
       <input type="radio" id="username_box" name="searchType" defaultValue="Username" style={{ marginLeft: 200}} />
         Username
       <input type="radio" id="recipe_box" name="searchType" defaultValue="Recipe" />
         Recipe
       <input type="text" id="SearchBox" />
       <input type="Submit" defaultValue="Search" onClick={searchBtn}/>

      {/*Personal Page Button*/}
      <Button href={`/personalpage/${username}`} variant="outline-success" style={{ marginLeft: 180 }}>
        Personal Page
      </Button>

      <Logout />

      <React.Suspense fallback={<div>Loading...</div>}>
        <HomepageRecipeCard />
      </React.Suspense>
      
      {/*script*/}
      <p />
      </>
      );
    }
  

export default Homepage;
