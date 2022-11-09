import React from 'react';
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchUserPage(){


    const users = JSON.parse(localStorage.getItem('user_search_return'));
    //console.log(recipes);


    return(
        <>
            <div className='Title'><h1>Search</h1></div>
            <div className='Container1'>
            <text><b>Search Results:</b></text>
            <br />
            <Row xs={1} md={1} className="g-4">
              {users.map(user =>(
                    <Col >
                      <Card>
                        <Card.Img variant="top" />
                        <Card.Body>
                          <Button variant="outline-success" href={`/viewpersonalpage/${user.username}`}>
                            <Card.Img variant="top" src={user.user_photo} height="180px"/>
                          </Button>
                          <Card.Title>{user.username}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
              ))}
            </Row>

          </div>
        </>
    );
}
export default SearchUserPage;