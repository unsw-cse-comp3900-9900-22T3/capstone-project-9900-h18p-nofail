import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PersonalDetail () {

    const username = localStorage.getItem('username');
    const recipe_num = localStorage.getItem('recipe_num');

    //get personal info
    const getpersonalinfo = async () => {

        //make the page wait for 2 seconds
        await new Promise(r => setTimeout(r, 2000));

        const response_personal_info = await fetch('http://localhost:8080/user/getpersonalinfo', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username
        })
        })
        const data_personal_info = await response_personal_info.json();
        const personal_info = data_personal_info.personal_info
        localStorage.setItem('personal_info', JSON.stringify(personal_info[0]))
        console.log(personal_info)
    }
    React.useEffect(() => {
        (async () => {
            await getpersonalinfo();
             if(location.href.indexOf("#1")==-1){
                 location.href=location.href+"#1";
                 location.reload();
                 }
        })(); 
    }, []); 
    const personal_info_from_infos = JSON.parse(localStorage.getItem('personal_info'));
    

    //following button
    function following() {
        window.location.href = '/recipe_and_follower/following.html';
      }
  
    //follower button
    function follower() {
        window.location.href = '/recipe_and_follower/follower.html';
      }

    //my recipe button
    function myRecipe() {
        window.location.href = 'http://localhost:3000/personalpage';
      }



    return (
        <>
        <React.Suspense fallback={<div>Loading...</div>}>
        <div id="Personal Details" style={{ marginLeft: 150 }}>
            <table border={0}>
            <tbody>
                <tr>
                <td>
                    <img src={"/"+ personal_info_from_infos.user_photo} width={180} height={180} />
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
        </React.Suspense>

    </>
        );
}

export default PersonalDetail;