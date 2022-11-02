import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Logout () {
  // const navigate = useNavigate();
  // const token = localStorage.getItem('token');
  // try {
  //   fetch('http://localhost:5005/admin/auth/logout', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: 'Bearer ' + token,
  //     }
  //   })
  //   React.useEffect(() => {
  //     navigate('/login')
  //   });
  // } catch (err) {
  //   alert(err)
  //   console.log(err)
  // }
  // localStorage.removeItem('token')

  function logout(){
    // localStorage.removeItem('personal_info');
    // localStorage.removeItem('recipes');
    // localStorage.removeItem('recipe_num');
    // localStorage.removeItem('fav_recipes');
    // localStorage.removeItem('all_recipes');
    window.location.href = 'http://localhost:3000/login';
  }

  return (
    <>
    <Button onClick={logout} variant="secondary" style={{ marginLeft: 30 }}>
        Log Out
      </Button>
    </>);
}

export default Logout
