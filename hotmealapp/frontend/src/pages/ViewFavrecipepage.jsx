import React from 'react';
import {
    Button,
    Form,
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';
import FavRecipeCard from '../components/FavRecipeCard';
import ViewPersonalDetail from '../components/ViewPersonalDetail';
import Logout from '../pages/Logout';

function ViewFavrecipepage() {
  const params = useParams();
  const username = params.username;

  class FollowBtn extends React.Component {
    constructor(){
        super()
        this.state={
            isLiked:false
        }
    }
  
    from_username = localStorage.getItem('username');
    to_username = username;
  
    handleFollow = async() =>{
      try{
        const response = await fetch('http://localhost:8080/user/follow', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            from_username,
            to_username
          })
        });
        const data = await response.json();
  
        this.setState((prevState)=>{
            //console.log(prevState)
            return{
                isLiked:!prevState.isLiked
            }
        },()=>{
            //console.log(this.state.isLiked) //获取最新的状态
            if(data.status==="success"){
              this.state.isLiked=='true'
            }
            else {
              alert(data.message)
            }
        })
      }catch (err) {
        alert(err)
      }
    }
  
    render() {
      return (
              <Button variant="outline-success" style={{ marginLeft: 50 }} onClick={this.handleFollow.bind(this)}>
                  {
                  this.state.isLiked ? 'Followed' :'Follow'
                  }
              </Button>
      )
    }
  }
  
  function logoJump() {
      window.location.href = 'http://localhost:3000/homepage';
    }

  
    return (
      <>
        <div className='Title'>
          <h1 onClick={logoJump}>Hot Meal</h1>
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
        <Logout />
        </Form>
    </div>

  {/*Personal Details*/}
  <ViewPersonalDetail />

  <div style={{ marginLeft: 150 }}>
    <table border={0}>
      <tbody>
        <tr>
          <td>
            <br />
            <FollowBtn />
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
                      <a href={`/viewpersonalpage/${username}`}  style={{ marginLeft: 380, color:'black'}}>My Recipe</a>
                    </td>
                    <td>
                      <a href={`/viewfavrecipepage/${username}`} style={{ margin: 434 , color:'black'}}>Favorite Recipe</a>
                    </td>
                    </tr>
                </tbody>
              </table>
            <br />
<FavRecipeCard />

  {/*script*/}
</>

      );
    }
  

export default ViewFavrecipepage;
