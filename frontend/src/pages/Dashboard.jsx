import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Button,
  Modal
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import copy from 'copy-to-clipboard';

function Dashboard () {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [id, setId] = React.useState('');
  let quizzes = React.useState('');
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  });
  function sum (arr) {
    let s = 0
    for (let i = 0; i < arr.length; i++) {
      s += arr[i].time
    }
    return s
  }
  const createQuiz = async () => {
    try {
      await fetch('http://localhost:5005/admin/quiz/new', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ name }),
      });
      fresh()
    } catch (err) {
      alert(err)
    }
  }
  const deleteQuiz = async (id) => {
    try {
      await fetch('http://localhost:5005/admin/quiz/' + id, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      });
      fresh()
    } catch (err) {
      alert(err)
    }
  }
  const startQuiz = async (id) => {
    try {
      await fetch('http://localhost:5005/admin/quiz/' + id + '/start', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      });
      handleShow()
    } catch (err) {
      alert(err)
    }
  }
  const advanceQuiz = async (id) => {
    try {
      await fetch('http://localhost:5005/admin/quiz/' + id + '/advance', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      });
    } catch (err) {
      alert(err)
    }
  }
  const stopQuiz = async (id) => {
    try {
      await fetch('http://localhost:5005/admin/quiz/' + id + '/end', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      });
      getquiz(id)
      const data = JSON.parse(localStorage.getItem('quiz'))
      const sessionid = data.active
      localStorage.setItem('s', sessionid)
      handleShow1()
    } catch (err) {
      alert(err)
    }
  }
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = React.useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const gotojoin = async (id) => {
    getquiz(id)
    const data = JSON.parse(localStorage.getItem('quiz'))
    const sessionid = data.active
    copy('http://localhost:3000/joinplay' + sessionid)
  }
  const getquiz = async (id) => {
    const response = await fetch('http://localhost:5005/admin/quiz/' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      }
    })
    const data = await response.json();
    localStorage.setItem('quiz', JSON.stringify(data))
    localStorage.setItem('id', JSON.stringify(id))
  }
  const getquizzes = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      }
    })
    const data = await response.json();
    const body = data.quizzes
    const num = body.length
    const quizzes1 = []
    for (let i = 0; i < num; i++) {
      await getquiz(body[i].id);
      let quiz = localStorage.getItem('quiz')
      quiz = JSON.parse(quiz)
      quiz.id = localStorage.getItem('id')
      quizzes1.push(quiz);
    }
    localStorage.setItem('quizzes', JSON.stringify(quizzes1))
  }
  function renderdash () {
    getquizzes()
    quizzes = JSON.parse(localStorage.getItem('quizzes'))
  }
  const fresh = async () => {
    await getquizzes()
    location.reload()
  }
  renderdash()

  return (
    <>
      <div className='Title'><h1>Dashboard</h1></div>
      <Row xs={1} md={4} className="g-4">
        {quizzes.map(quiz => (
          <Col key={quiz.id}>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Game started!</Modal.Title>
              </Modal.Header>
              <Modal.Body>The quiz id your started is {quiz.id} </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={e => { gotojoin(quiz.id, e); handleClose(e) }}>
                  Copy url of game
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleClose1}>
              <Modal.Header closeButton>
                <Modal.Title>Game stopped!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Do you want to see result?</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" href={`/getresult${quiz.id}`}>
                  Yes
                </Button>
                <Button variant="secondary" onClick={handleClose1}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
            <Card>
              <Card.Img variant="top" src={quiz.thumbnail} />
              <Card.Body>
                <Card.Title>{quiz.name}</Card.Title>
                <Card.Text>
                  questions: {quiz.questions.length}
                </Card.Text>
                <Card.Text>
                  finish time: {sum(quiz.questions)}
                </Card.Text>
                <Card.Text>
                  <Button variant="outline-primary" size="sm" href={`/editquiz${quiz.id}`}>Edit</Button>
                  <br />
                  <Button variant="outline-secondary" size="sm" onClick={e => deleteQuiz(quiz.id, e)}>Delete</Button>
                </Card.Text>
                <Card.Text>
                  <Button variant="link" size="sm" onClick={e => startQuiz(quiz.id, e)}>Start</Button>
                  <br />
                  <Button variant="link" size="sm" onClick={e => advanceQuiz(quiz.id, e)}>Advance</Button>
                  <br />
                  <Button variant="link" size="sm" onClick={e => stopQuiz(quiz.id, e)}>Stop</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <br />
      Quiz name: <input type="text" onChange={e => setName(e.target.value)}></input>
      <button onClick={createQuiz}>Create</button>
      <br />
      <br />
      Quiz id: <input type="text" onChange={e => setId(e.target.value)}></input>
      <button onClick={e => deleteQuiz(id, e)}>Delete</button>
    </>);
}

export default Dashboard;
