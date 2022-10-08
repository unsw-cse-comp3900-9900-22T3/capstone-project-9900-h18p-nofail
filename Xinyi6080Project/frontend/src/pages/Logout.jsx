import { useNavigate } from 'react-router-dom';
import React from 'react';

function Logout () {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  try {
    fetch('http://localhost:5005/admin/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      }
    })
    React.useEffect(() => {
      navigate('/login')
    });
  } catch (err) {
    alert(err)
    console.log(err)
  }
  localStorage.removeItem('token')
  return (
    <>
    </>);
}

export default Logout;
