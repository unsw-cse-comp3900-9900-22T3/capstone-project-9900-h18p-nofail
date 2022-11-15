import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';
//import ViewPersonalRecipeCard from '../components/ViewPersonalRecipeCard';
//import ViewPersonalDetail from '../components/ViewPersonalDetail';
import Logout from '../pages/Logout';


function Viewpersonalpage() {
  const ViewPersonalDetail = React.lazy(() => import('../components/ViewPersonalDetail'));
  const ViewPersonalRecipeCard = React.lazy(() => import('../components/ViewPersonalRecipeCard'));

  const params = useParams();
  const username = params.username;

  //follow button
  const from_username = localStorage.getItem('username');
  const to_username = username;
  const self_username = localStorage.getItem('username');
  const query_username = username;

  //check following status
  const checkFollowStatus = async() =>{
    try{
      const response = await fetch('http://localhost:8080/user/checkfollowingstatus', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          self_username,
          query_username
        })
      });
      const data = await response.json();
      console.log("Check following status:",data.message);
      if(data.message==="This user is following you!"){
        localStorage.setItem('fc', true);
      }
      else {
        localStorage.setItem('fc', false);
      }
    }catch (err) {
      alert("Check following status:"+err)
    }
  }
  useEffect(() => {
    (async () => {
        let fc = await checkFollowStatus();
    })(); 
  }, []); 

  class FollowBtn extends React.Component {
    constructor(){
        super()
        this.state={
            isLiked: localStorage.getItem('fc') === 'true' ? true : false
        }
    }
    handleFollow=async()=>{
      //fetch follow
      if(this.state.isLiked==false){
        const toFollow = async() =>{
            const response_follow = await fetch('http://localhost:8080/user/follow', {
                    method: 'POST',
                    headers: {
                    'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                    from_username,
                    to_username
                    })
            });
            const data_follow = await response_follow.json();
    
            this.setState((prevState)=>{
                //console.log("prevstate",prevState.isLiked)
                return{
                    isLiked:!prevState.isLiked
                }
            },() =>{
                console.log("this state",this.state.isLiked) //获取最新的状态
    
                if(data_follow.status==="success"){
                  this.state.isLiked=='true'
                }
            })
          
        }
        toFollow();
      }
      //fetch unfollow
      else{
        const toUnFollow = async() =>{
              const response_unfollow = await fetch('http://localhost:8080/user/unfollow', {
                      method: 'POST',
                      headers: {
                      'Content-type': 'application/json',
                      },
                      body: JSON.stringify({
                      from_username,
                      to_username
                      })
              });
              const data_unfollow = await response_unfollow.json();
      
              this.setState((prevState)=>{
                  //console.log("prevstate",prevState.isLiked)
                  return{
                      isLiked:!prevState.isLiked
                  }
              },() =>{
                  console.log("this state",this.state.isLiked) //获取最新的状态
      
                  if(data_unfollow.status==="success"){
                    this.state.isLiked=='false'
                  }
              })
        }
        toUnFollow();
      }
    }

  

    render() {
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
              <Button variant="outline-success" style={{ marginLeft: 50 }} onClick={this.handleFollow.bind(this)}>
                  {
                  this.state.isLiked ? 'Followed' :'Follow'
                  }
              </Button>
        </React.Suspense>
      )
    }
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
          <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" />

        {/*Header*/}
        <br />
          <div class="loginRemark" style={{ marginLeft: 1200 }}>
            <Form>
            <Form.Text href={`/personalpage/${username}`}>Welcome {from_username}</Form.Text>
              <Logout />
              </Form>
          </div>

        {/*Personal Details*/}
        <React.Suspense fallback={<div>Loading...</div>}>
          <ViewPersonalDetail />
        </React.Suspense>

        <div style={{ marginLeft: 150 }}>
          <table border={0}>
            <tbody>
              <tr>
                <td>
                  <br />
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <FollowBtn />
                  </React.Suspense>
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
                            <b><a href={`/viewpersonalpage/${username}`}  style={{ marginLeft: 370, color:'black'}}>{username}'s Recipe</a></b>
                          </td>
                          <td>
                            <a href={`/viewfavrecipepage/${username}`} style={{ margin: 420 , color:'black'}}>Favorite Recipe</a>
                          </td>
                          </tr>
                      </tbody>
                    </table>
                  <br />

      <React.Suspense fallback={<div>Loading...</div>}>
        <ViewPersonalRecipeCard />
      </React.Suspense>

        {/*script*/}
</>


      );
    }


export default Viewpersonalpage;
