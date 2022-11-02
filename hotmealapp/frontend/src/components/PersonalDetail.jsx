import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portrait from '../images/Portrait.jpeg';

function PersonalDetail () {

    function following() {
        window.location.href = '/recipe_and_follower/following.html';
      }
  
    function follower() {
        window.location.href = '/recipe_and_follower/follower.html';
      }

    function myRecipe() {
        window.location.href = 'http://localhost:3000/personalpage';
      }

    const username = localStorage.getItem('username');
    const recipe_num = localStorage.getItem('recipe_num');

    
    //  const infos = JSON.parse(localStorage.getItem('info'));
    //  const personal_info_from_infos = infos[0];
    const personal_info_from_infos = JSON.parse(localStorage.getItem('personal_info'));

    // const getinfo = async (username) => {
    //     try {
    //       const response = await fetch('http://localhost:8080/user/getpersonalinfo', {
    //         method: 'POST',
    //         headers: {
    //           'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           username  // username: username
    //         })
            
    //       });
    //       const data = await response.json();
    //       console.log(data);
    //       return data;
    //     } catch (error) {
    //       console.log(error);
    //       return error;
    //     }
    //   }
      

    //   useEffect(() => {
    //     (async () => {
    //       let info = await getinfo(username);
    //       if (info.status === 'success') {
    //         localStorage.setItem('info', JSON.stringify(info.personal_info));
            
    //         console.log(info.personal_info);
            
    //       } else {
    //         alert(info.message);
    //       }
    //     })(); // IIFE
    //   }, []); // [] means no dependency

        


  


    return (
        <>
        <div id="Personal Details" style={{ marginLeft: 150 }}>
            <table border={0}>
            <tbody>
                <tr>
                <td>
                    <img src={personal_info_from_infos.user_photo} width={180} height={180} />
                </td>
                <td>
                    <b>
                    <h2>{username}</h2>
                    </b>
                    <br />
                    <label>
                        {personal_info_from_infos.description}
                    </label>
                </td>
                <td>
                    <label style={{ marginLeft: 550 }}>
                        {personal_info_from_infos.following_num}
                    </label>
                    <br />
                    <Button onClick={following} variant="outline-secondary" style={{ marginLeft: 550 }}>
                        Following
                    </Button>
                </td>
                <td>
                    <label style={{ marginLeft: 50 }}>
                        {personal_info_from_infos.follower_num}
                    </label>
                    <br />
                    <Button onClick={follower} variant="outline-secondary" style={{ marginLeft: 50 }}>
                        Follower
                    </Button>
                </td>
                <td>
                    <label htmlFor="Recipes Number" style={{ marginLeft: 50 }}>
                        {recipe_num}
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

export default PersonalDetail;