import React from "react";
import "./App.css";
import axios from "axios";
import { Button, Card, Container, Row, Col, Accordion } from "react-bootstrap";

import Instructor from "./Instructor";

const serverUrl = "http://localhost:3000/api";

class Quizzes extends React.Component {
  constructor(props) {
    super();
    this.state = {
      quizzes: [],
      instructor: props.location.props.instructor,
      questions: [],
      id: "",
      newInstructor: {},
      instructors: [],
      updateInstructor: {}
    };
    console.log(props.location.props)
    this.getQuiz = this.getQuiz.bind(this);
    this.createQuiz = this.createQuiz.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
  }

  updateInstructor = e => {
    e.preventDefault();
    let id = this.state.updateInstructor.id;
    let intId = Number(id);
    axios({
      url: `${serverUrl}/instructors/${intId}`,
      method: "put",
      data: { updateInstructor: this.state.updateInstructor }
    }).then(response => {
      this.setState(prevState => ({
        instructors: [...prevState.instructors, response.data.instructor]
      }));
    });
  };

  onHandleChangeInstructor = e => {
    let updateInstructor = {
      [e.target.name]: e.target.value
    };
    console.log(updateInstructor.id);
    this.setState((prevState, currentState) => ({
      updateInstructor: { ...prevState.updateInstructor, ...updateInstructor }
    }));
  };

  handleChange = e => {
    let id = parseInt(e.target.value);
    this.setState({ id });
  };

  getQuestions = e => {
    e.preventDefault();
    let id = this.state.id;
    axios({
      url: `${serverUrl}/questions/`,
      method: "get"
    }).then(response => {
      this.setState({
        questions: response.data.questions
      });
      console.log(response.data.questions);
      // console.log(response.data.instructor.quizzes)
      // console.log('quizzes', this.state.quizzes)
    });
  };
  getQuizzes = e => {
    e.preventDefault();
    let id = this.state.id;
    axios({
      url: `${serverUrl}/quizzes/${id}`,
      method: "get"
    }).then(response => {
      this.setState({
        quizzes: response.data.question.questions
      });
      console.log(response.data.question.questions);
      // console.log(response.data.instructor.quizzes)
      // console.log('quizzes', this.state.quizzes)
    });
  };

  getQuiz() {
    console.log("getting quiz");

    axios({
      url:
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple",
      method: "get"
    }).then(quizzes => {
      console.log(quizzes.data.results);
      this.setState({
        question1_question: quizzes.data.results[0].question,
        question1_correct_answer: quizzes.data.results[0].correct_answer,
        question1_incorrect_answer1:
          quizzes.data.results[0].incorrect_answers[0],
        question1_incorrect_answer2:
          quizzes.data.results[0].incorrect_answers[1],
        question1_incorrect_answer3:
          quizzes.data.results[0].incorrect_answers[2],
        question1_category: quizzes.data.results[0].category,
        question1_difficulty: quizzes.data.results[0].difficulty,
        question2_question: quizzes.data.results[1].question,
        question2_correct_answer: quizzes.data.results[1].correct_answer,
        question2_incorrect_answer1:
          quizzes.data.results[1].incorrect_answers[0],
        question2_incorrect_answer2:
          quizzes.data.results[1].incorrect_answers[1],
        question2_incorrect_answer3:
          quizzes.data.results[1].incorrect_answers[2],
        question2_category: quizzes.data.results[1].category,
        question2_difficulty: quizzes.data.results[1].difficulty,
        question3_question: quizzes.data.results[2].question,
        question3_correct_answer: quizzes.data.results[2].correct_answer,
        question3_incorrect_answer1:
          quizzes.data.results[2].incorrect_answers[0],
        question3_incorrect_answer2:
          quizzes.data.results[2].incorrect_answers[1],
        question3_incorrect_answer3:
          quizzes.data.results[2].incorrect_answers[2],
        question3_category: quizzes.data.results[2].category,
        question3_difficulty: quizzes.data.results[2].difficulty
      });
    });
  }

  onHandleChangeQuiz = e => {
    let newQuiz = {
      [e.target.name]: e.target.value
    };

    this.setState((prevState, currentState) => ({
      newQuiz: { ...prevState.newQuiz, ...newQuiz }
    }));
  };

  createQuiz = e => {
    let instructorId = this.state.newQuiz.instructorId;
    let instructId = Number(instructorId);
    console.log("instructorId", instructId);
    e.preventDefault();
    axios({
      url: `${serverUrl}/quizzes`,
      method: "post",
      data: {
        newQuiz: {
          instructorId: instructId,
          category: this.state.question1_category,
          difficulty: this.state.question1_difficulty
        }
      },
      category: this.state.question1_category,
      difficulty: this.state.question1_difficulty
    }).then(response => {
      this.setState(prevState => ({
        quizzes: [...prevState.quizzes, response.data.quiz]
      }));
    });
  };

  onHandleChangeQuestion = e => {
    let newQuestion = {
      [e.target.name]: e.target.value
    };

    this.setState((prevState, currentState) => ({
      newQuestion: { ...prevState.newQuestion, ...newQuestion }
    }));
  };

  // maybe run a loop for this for each question returned from the getQuiz call
  createQuestion = e => {
    let quizId = this.state.newQuestion.quizId;
    let quzId = Number(quizId);
    console.log("quizId", quzId);
    e.preventDefault();
    axios({
      url: `${serverUrl}/questions`,
      method: "post",
      data: {
        newQuestion: {
          quizId: quzId,
          question: this.state.question1_question,
          correct_answer: this.state.question1_correct_answer,
          incorrect_answer1: this.state.question1_incorrect_answer1,
          incorrect_answer2: this.state.question1_incorrect_answer2,
          incorrect_answer3: this.state.question1_incorrect_answer3
        }
      }
    }).then(response => {
      this.setState(prevState => ({
        questions: [...prevState.questions, response.data.question]
      }));
    });
  };

  render() {
    if (this.state.instructor) {
      console.log(this.state.instructor);
      var renderInstructor = `
                        Name: ${this.state.instructor.name} -- Grade: ${this.state.instructor.grade_level} -- Subject: ${this.state.instructor.subject}
                    `;
    }
    console.log(this.state.question);
    console.log(this.state.category);
    console.log(this.state.quizId);

    if (this.state.quizzes) {
      console.log(this.state.quizzes);
      var renderQuizzes = this.state.quizzes.map((quiz, index) => {
        return (
          <div key={index}>
            <Accordion defaultActiveKey="1">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click for Question
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {" "}
                    <ul>
                      <li>Question: {quiz.question}</li>
                      <li>Correct Answer: {quiz.correct_answer}</li>
                      <li>Incorrect Answer 1: {quiz.incorrect_answer1}</li>
                      <li>Incorrect Answer 2: {quiz.incorrect_answer2}</li>
                      <li>Incorrect Answer 3: {quiz.incorrect_answer3}</li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      });
    }

    return (
      <div>
        <Button variant="success" onClick={this.getQuiz}>
          Get Quiz
        </Button>

        <Container>
          <Row>
            <Col>
              {" "}
              <h1>Save Question</h1>
              <form
                onSubmit={this.createQuestion}
                onChange={e => this.onHandleChangeQuestion(e)}
              >
                Quiz Id: <input type="text" name="quizId" />
                <input type="submit" value="Save Question" />
              </form>
            </Col>

            <Col>
              <h1>Save Quiz</h1>
              <form
                onSubmit={this.createQuiz}
                onChange={e => this.onHandleChangeQuiz(e)}
              >
                Instructor Id: <input type="text" name="instructorId" />
                <input type="submit" value="Save Quiz" />
              </form>
            </Col>

            <Col>
              <div>
                <h1>Update Instructor</h1>
                <form
                  onSubmit={this.updateInstructor}
                  onChange={e => this.onHandleChangeInstructor}
                >
                  Name: <input type="text" name="name" />
                  Subject: <input type="text" name="subject" />
                  Grade Level: <input type="text" name="grade_level" />
                  Instructor Id: <input type="text" name="id" />
                  <input type="submit" value="Update Instructor" />
                </form>

                {this.state.instructor.name ? (
                  <Instructor instructor={this.state.instructor} />
                ) : null}
                <div>
                  <form
                    onSubmit={this.getQuizzes}
                    onChange={e => this.handleChange(e)}
                  >
                    Quiz Id: <input type="text" name="id" />
                    <input type="submit" value="Get Quiz" />
                  </form>
                </div>
              </div>
              <div>{renderQuizzes}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Quizzes;
