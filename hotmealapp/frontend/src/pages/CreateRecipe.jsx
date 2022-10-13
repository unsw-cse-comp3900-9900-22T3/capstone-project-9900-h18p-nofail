import React from 'react';
// import { useNavigate } from 'react-router-dom';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
// import copy from 'copy-to-clipboard';

function CreateRecipe () {
  // const navigate = useNavigate();
  // const [curr, setCurr] = React.useState(0);
  // const go = (val) => {
  //   setCurr(Number(curr) + val);
  // };
  const [show1, setS1] = React.useState('block');
  const [show2, setS2] = React.useState('none');
  const [show3, setS3] = React.useState('none');
  const [show4, setS4] = React.useState('none');
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
  }
  const todelete = () => {
    setList(list.filter((item, index) => index != list.length - 1));
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
                <Form.Control placeholder="recipe name" type='text'/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category: </Form.Label>
                <Form.Select aria-label="Default select example">
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
        />
        </FloatingLabel>
        </Form.Group>
      </div>
      </div>
      <div className='createfoot2'>
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
                    <Form.Control placeholder="group name" type='text'/>
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
                          <Form.Control type="email" placeholder={`ingredient${index1 + 1}`} />
                        </Col>
                      </Row>
                    ))}
                  </Form.Group>
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3">
            <Button variant='success' style={{ float: 'right' }} onClick={addingre}>add</Button>
              <Button variant='success' onClick={addgroup}>Add New Group</Button>
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
          <div className='columnleft1'>
            {list2.map((item, index) => (
              <div key={index} id={item}>
                <Row>
                  <Form.Label>Step {index + 1}: </Form.Label>
                  <InputGroup className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="description"
                    style={{ height: '150px' }}
                    />
                  <Button variant="outline-secondary" onClick={todelete1}>Delete</Button>
                  </InputGroup>
                </Row>
              </div>
            ))}
            <Form.Group className="mb-3">
              <Button variant='success' onClick={addstep}>Add New Step</Button>
            </Form.Group>
          </div>
          <div className='columnright1'>
            <h3>Indredient Details</h3>
            <h4>Meat</h4>
            <div>1: meat1</div>
            <div>2: meat2</div>
            <div>3: meat3</div>
          </div>
        </div>
          <div className='createfoot2'>
            <div><Button variant="outline-success" onClick={click2}>prev</Button>&nbsp; &nbsp; &nbsp; &nbsp; </div>
            <div><Button variant="outline-success" onClick={click4}>next</Button></div>
          </div>
      </div>
      <div style={ifshow4}>
        <div className='createstep'>
          <div className='columnleft2'>
          <div className='Container2'>
            <Form.Group controlId="formFile" className="mb-3">
              <FormLabel>Upload A Picture</FormLabel>
              <Form.Control type="file" />
            </Form.Group>
            <Divider textAlign="left">Other Details</Divider>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Difficulty</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
                </RadioGroup>
              </FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Prepare Time</FormLabel>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="time"
                aria-describedby="basic-addon2"
              />
            <InputGroup.Text id="basic-addon2">Minutes</InputGroup.Text>
            </InputGroup>
          </div>
          </div>
          <div className='columnright2'>
          <div className='Container2'>
            <Form.Group className="mb-3">
            <Form.Label>Tips: </Form.Label>
            <FloatingLabel controlId="floatingTextarea2">
            <Form.Control as="textarea" placeholder="description" style={{ height: '150px' }}/>
            </FloatingLabel>
            </Form.Group>
          </div>
          </div>
        </div>
        <div className='createfoot2'>
            <div><Button variant="outline-success" onClick={click3}>prev</Button>&nbsp; &nbsp; &nbsp; &nbsp;</div>
            <div><Button variant="outline-success" href='https://wenqinghomepage.s3.ap-southeast-2.amazonaws.com/personal-page/index.html'>submit</Button></div>
          </div>
      </div>
    </>);
}
export default CreateRecipe;
