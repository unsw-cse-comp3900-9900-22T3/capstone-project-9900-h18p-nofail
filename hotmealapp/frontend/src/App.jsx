import React from 'react';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import CreateRecipe from './pages/CreateRecipe';
import Homepage from './pages/Homepage'
import Personalpage from './pages/Personalpage'
import Viewpersonalpage from './pages/Viewpersonalpage'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Nav,
  Navbar,
  Container,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="https://wenqingbucket2.s3.ap-southeast-2.amazonaws.com/homepage/index.html">Hot Meal</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/homepage">Homepage</Nav.Link>
              <Nav.Link href="/personalpage">Personalpage</Nav.Link>
              <Nav.Link href="/viewpersonalpage">Viewpersonalpage</Nav.Link>
              <Nav.Link href="createrecipe">CreateRecipe</Nav.Link>
              <Nav.Link href="https://zheyuanrecipe.s3.ap-southeast-2.amazonaws.com/recipe+and+follower/recipe.html">Recipe</Nav.Link>
              <Button href="/logout" variant="secondary">Logout</Button>
              {/* <Button onClick={logout}>Logout</Button> */}
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/personalpage" element={<Personalpage />} />
          <Route path="/viewpersonalpage" element={<Viewpersonalpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
