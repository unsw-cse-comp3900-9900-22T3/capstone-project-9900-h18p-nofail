import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
//   Card,
  Row,
  Button,
  Form,
  Col,
  InputGroup,
//   Modal
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
// import copy from 'copy-to-clipboard';

function CreateRecipe () {
  const navigate = useNavigate();
  // const [curr, setCurr] = React.useState(0);
  // const go = (val) => {
  //   setCurr(Number(curr) + val);
  // };
  const [recipe_name, setName] = React.useState('');
  const [recipe_style, setCategory] = React.useState('');
  const [description, setDes] = React.useState('');
  const [ingredient, setIngre] = React.useState('');
  const [ingres, setIngres] = React.useState('');
  const [group, setGrou] = React.useState('');
  const [steps, setSteps] = React.useState('');
  let [recipe_photo, setImg] = React.useState('');
  const [cooking_time, setTime] = React.useState(0);
  const [show1, setS1] = React.useState('block');
  const [show2, setS2] = React.useState('none');
  const [show3, setS3] = React.useState('none');
  const [show4, setS4] = React.useState('none');
  const recipe_username = localStorage.getItem('username');
  const createrecipe = async () => {
    //console.log(ingredient)
    const pics = recipe_photo.split('\\')
    //console.log(pics)
    recipe_photo = 'imgs/' + pics[2]
    const a = JSON.stringify({
      recipe_name,
      recipe_style,
      recipe_username,
      ingredient,
      description,
      steps,
      recipe_photo,
      cooking_time
    })
    console.log(a);
    try {
      const response = await fetch('http://localhost:8080/recipe/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          recipe_name,
          recipe_style,
          recipe_username,
          ingredient,
          description,
          steps,
          recipe_photo,
          cooking_time,
        })
      });
      const data = await response.json();
      console.log(data)
      if(data.status==="success") {
        alert("create successfully!");
        window.open('/recipe_and_follower/recipe.html');
      }
      else {
        alert(data.message)
        //alert("my alert")
      }
    } catch (err) {
      alert(err)
    }
  }
  function click1 () {
    setS1('block')
    setS2('none')
    setS3('none')
    setS4('none')
  }
  function click2 () {
    setS1('none')
    setS2('block')
    setS3('none')
    setS4('none')
  }
  function click3 () {
    setS1('none')
    setS2('none')
    setS3('block')
    setS4('none')
  }
  function click4 () {
    setS1('none')
    setS2('none')
    setS3('none')
    setS4('block')
  }
  
  const ifshow1 = {
    display: show1
  }
  const ifshow2 = {
    display: show2
  }
  const ifshow3 = {
    display: show3
  }
  const ifshow4 = {
    display: show4
  }
  const list1 = [[1]]
  const list1_ = [1]
  // for (let i = 0; i < answer.length; i++) {
  //   list1.push(1)
  // }
  const [list, setList] = React.useState(list1);
  const [list2, setList2] = React.useState(list1_);

  const addingre = () => {
    setList(list.map((item, index) => index === list.length - 1 ? [...item, 1] : item))
  }
  const addgroup = () => {
    setList([...list, [1]])
    setIngre({...ingredient, [group]: ingres})
  }
  const todelete = () => {
    setList(list.filter((item, index) => index != list.length - 1));
    setIngre(_.omit(ingredient, [group]))
  }
  const addstep = () => {
    setList2([...list2, 1])
  }
  const todelete1 = () => {
    setList2(list2.filter((item, index) => index != list2.length - 1));
  }
  return (
    <>
      <div className='createinfo'>
      <Button variant="outline-success" onClick={click1}>Recipe Details</Button>
      <Button variant="outline-success" onClick={click2}>Ingredients</Button>
      <Button variant="outline-success" onClick={click3}>Cooking Steps</Button>
      <Button variant="outline-success" onClick={click4}>Complete Creation</Button>
      </div>
      <div style={ifshow1}>
        <div className='createstep'>
          <div className='columnleft'>
            <div className='Container1'>
              <Form.Group className="mb-3">
                <Form.Label>Recipe Name: </Form.Label>
                <Form.Control placeholder="recipe name" type='text' onChange={e => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Style: </Form.Label>
                <Form.Select aria-label="Default select example" onChange={e => setCategory(e.target.value)}>
                  <option>Open to select</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
      <div className='columnright'>
        <Form.Group className="mb-3">
        <Form.Label>Description: </Form.Label>
        <FloatingLabel controlId="floatingTextarea2">
        <Form.Control
          as="textarea"
          placeholder="description"
          style={{ height: '150px' }}
          onChange={e => setDes(e.target.value)}
        />
        </FloatingLabel>
        </Form.Group>
      </div>
      </div>
      <div className='createfoot2_2'>
        <div><Button variant="outline-success" onClick={click2}>next</Button></div>
      </div>
      </div>
      <div style={ifshow2}>
        <div className='createstep'>
          <div className='Container2'>
            <h3>Indredient Details</h3>
            <Form.Group className="mb-3">
              {list.map((item, index) => (
                <div key={index} id={item}>
                  <Row>
                    <Form.Label>Group Title {index + 1}: </Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Select aria-label="Default select example" onChange={e => setGrou(e.target.value)}>
                      <option>Open to select</option>
                      <option value="Meat">Meat</option>
                      <option value="Egg">Egg</option>
                      <option value="Vegetable">Vegetable</option>
                      <option value="Milk">Milk</option>
                      <option value="Seafood">Seafood</option>
                      <option value="Seasoning">Seasoning</option>
                      <option value="Grain">Grain</option>
                    </Form.Select>
                    <Button variant="outline-secondary" onClick={todelete}>Delete</Button>
                    </InputGroup>
                  </Row>
                  <p></p>
                  <Form.Group className="mb-3" controlId="formHorizontalEmail">
                    {list[index].map((item1, index1) => (
                      <Row key={index1} id={item1} className="align-items-center">
                        <Form.Label column sm={2}>
                          Ingredient{index1 + 1}
                        </Form.Label>
                        <Col sm={6}>
                          <Form.Control type="email" placeholder={`ingredient${index1 + 1}`} onBlur={e => setIngres([...ingres, e.target.value])}/>
                        </Col>
                      </Row>
                    ))}
                  </Form.Group>
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3">
            <Button variant='success' style={{ float: 'right' }} onClick={addingre}>add</Button>
              <Button variant='success' onClick={addgroup}>Finish This Group</Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className='createfoot2'>
                <div><Button variant="outline-success" onClick={click1}>prev</Button>&nbsp; &nbsp; &nbsp; &nbsp; </div>
                <div><Button variant="outline-success" onClick={click3}>next</Button></div>
              </div>
            </Form.Group>
          </div>
        </div>
      </div>
      <div style={ifshow3}>
        <div className='createstep'>
          <div className='Container2'>
            {list2.map((item, index) => (
              <div key={index} id={item}>
                <Row>
                  <Form.Label>Step {index + 1}: </Form.Label>
                  <InputGroup className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="description"
                    style={{ height: '150px' }}
                    onBlur={e => setSteps([...steps, e.target.value])}
                    />
                  <Button variant="outline-secondary" onClick={todelete1}>Delete</Button>
                  </InputGroup>
                </Row>
              </div>
            ))}
            <Form.Group className="mb-3">
              <Button variant='success' onClick={addstep}>Add New Step</Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className='createfoot2'>
                <div><Button variant="outline-success" onClick={click2}>prev</Button>&nbsp; &nbsp; &nbsp; &nbsp; </div>
                <div><Button variant="outline-success" onClick={click4}>next</Button></div>
              </div>
            </Form.Group>
          </div>
        </div>
      </div>
      <div style={ifshow4}>
        <div className='createstep'>
          <div className='columnleft2'>
          <div className='Container2'>
            <Form.Group controlId="formFile" className="mb-3">
              <FormLabel>Upload A Picture</FormLabel>
              <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={e => setImg(e.target.value)}/>
            </Form.Group>
            <Divider textAlign="left">Other Details</Divider>
              <FormLabel id="demo-row-radio-buttons-group-label">Prepare Time</FormLabel>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="time"
                aria-describedby="basic-addon2"
                onChange={e => setTime(e.target.value)}
              />
            <InputGroup.Text id="basic-addon2">Minutes</InputGroup.Text>
            </InputGroup>
          </div>
          </div>
        </div>
        <div className='createfoot2_2'>
            <div><Button variant="outline-success" onClick={click3}>prev</Button>&nbsp; &nbsp; &nbsp; &nbsp;</div>
            <div><Button variant="outline-success" onClick={createrecipe}>submit</Button></div>
          </div>
      </div>
    </>);
}
export default CreateRecipe;
