import React from 'react';
import { useParams} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portrait from '../images/Portrait.jpeg';

function RecipeCard () {
    const username = localStorage.getItem('username');
    //const following_num = localStorage.getItem('following_num');

    function following() {
        window.location.href = '/recipe_and_follower/following.html';
      }
  
    function follower() {
        window.location.href = '/recipe_and_follower/follower.html';
      }

    function myRecipe() {
        window.location.href = 'http://localhost:3000/personalpage';
      }


    const params = useParams();
    let following_num = React.useState();
    const token = localStorage.getItem('token');
    const getNum = async (username) => {
        const response = await fetch('http://localhost:8080/user/getfollowingnum' + username, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          }
        })
        const data = await response.json();
        //const username = data.username
        const following_num = data.following_num
        localStorage.setItem('following_num', JSON.stringify(following_num))
        
    }
    getNum(username)
    following_num = JSON.parse(localStorage.getItem('following_num'))


    return (
        <>
        <div id="Personal Details" style={{ marginLeft: 100 }}>
            <table border={0}>
            <tbody>
                <tr>
                <td>
                    <img src={Portrait} width={180} height={180} />
                </td>
                <td>
                    <b>
                    <h2>{username}</h2>
                    </b>
                    <br />
                    <label htmlFor="Bio">Welcome, I'm Ryan.</label>
                </td>
                <td>
                    <label style={{ marginLeft: 500 }}>
                        {following_num}
                    </label>
                    <br />
                    <Button onClick={following} variant="outline-secondary" style={{ marginLeft: 500 }}>
                        Following
                    </Button>
                </td>
                <td>
                    <label style={{ marginLeft: 50 }}>
                        10
                    </label>
                    <br />
                    <Button onClick={follower} variant="outline-secondary" style={{ marginLeft: 50 }}>
                        Follower
                    </Button>
                </td>
                <td>
                    <label htmlFor="Recipes Number" style={{ marginLeft: 50 }}>
                        5
                    </label>
                    <br />
                    <Button onClick={myRecipe} variant="outline-secondary"  style={{ marginLeft: 50 }}>
                        Recipes
                    </Button>
                </td>
                </tr>
                </tbody>
            </table>
        </div>


    </>
        );
}

export default RecipeCard;