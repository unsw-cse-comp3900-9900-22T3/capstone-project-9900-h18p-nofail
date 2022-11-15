import React from 'react';
import {
    Button,
    Form,
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';
import PersonalRecipeCard from '../components/PersonalRecipeCard';
import PersonalDetail from '../components/PersonalDetail';
import Logout from '../pages/Logout';

function Personalpage() {
  //const username = localStorage.getItem('username');
  const params = useParams();
  const username = params.username;
  
  //logo jump to homepage
  function logoJump() {
      window.location.href = 'http://localhost:3000/homepage';
    }

  //create recipe button
  function createRecipe() {
      window.location.href = 'http://localhost:3000/createrecipe';
    }

  


    return (
      <>
        <div className='Title'>
          <h1>Personal Page</h1>
        </div>
          <meta charSet="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Web site created using create-react-app" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <title>React App</title>
          <div id="root" />
          {/*Header*/}
          <br />
            <div class="loginRemark" style={{ marginLeft: 1200 }}>
              <Form>
                <Form.Text>Welcome {username}</Form.Text>
                <Logout />
                </Form>
            </div>

          {/*Personal Details*/}
          <PersonalDetail />

          <div style={{ marginLeft: 100 }}>
            <table border={0}>
              <tbody>
                <tr>
                  <td>
                    <br />
                    <Button id="editSaveBtn" href={`/update_personal_info/${username}`} variant="outline-success" style={{ marginLeft: 110 }}>
                      Edit
                    </Button>
                  </td>
                  <td></td>
                  <td>
                    <Button type="createRecipeBtn" onClick={createRecipe} variant="success" style={{ marginLeft: 730 }}>
                      Create New Recipe
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        {/*Recipe List*/}
        <br />
                    <table bgcolor="#7DA395">
                        <tbody>
                          <tr>
                            <td>
                              <b><a href={`/personalpage/${username}`}  style={{ marginLeft: 370, color:'black'}}>{username}'s Recipe</a></b>
                            </td>
                            <td>
                              <a href={`/favrecipepage/${username}`} style={{ margin: 420 , color:'black'}}>Favorite Recipe</a>
                            </td>
                            </tr>
                        </tbody>
                      </table>
                    <br />
        <PersonalRecipeCard />

  {/*script*/}
</>

      );
    }
  

export default Personalpage;
