import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewPersonalDetail () {

    const params = useParams();
    const username = params.username;
    const recipe_num = localStorage.getItem('recipe_num');

    //get personal info
    const getpersonalinfo = async () => {
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
            location.reload();
        })(); 
    }, []); 
    const personal_info_from_infos = JSON.parse(localStorage.getItem('personal_info'));
    //console.log(personal_info_from_infos);
    const [description, setDes] = React.useState(personal_info_from_infos.description);
    let [user_photo, setImg] = React.useState(personal_info_from_infos.user_photo);
    const [following_num, setFollowing] = React.useState(personal_info_from_infos.following_num);
    const [follower_num, setFollower] = React.useState(personal_info_from_infos.follower_num);

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
                    <img src={user_photo} width={180} height={180} />
                </td>
                <td>
                    <b>
                    <h2>{username}</h2>
                    </b>
                    <br />
                    <label>
                        {description}
                    </label>
                </td>
                <td>
                    <label style={{ marginLeft: 550 }}>
                        {following_num}
                    </label>
                    <br />
                    <Button onClick={following} variant="outline-secondary" style={{ marginLeft: 550 }}>
                        Following
                    </Button>
                </td>
                <td>
                    <label style={{ marginLeft: 50 }}>
                        {follower_num}
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

export default ViewPersonalDetail;