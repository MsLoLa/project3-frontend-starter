import { Button, Card, Container, Row, Col, Accordion } from "react-bootstrap";
import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import CreateAccount from "./CreateAccount";
const serverUrl = "http://localhost:3000/api";
//test
class Home extends React.Component {
  state = {
    instructor: "",
    quizzes: [],
    questions: [],
    id: "",
    newInstructor: {},
    instructors: [],
    updateInstructor: {},
    error: false
  };
  handleChange = e => {
    let id = parseInt(e.target.value);
    this.setState({ id });
  };

  getInstructors = e => {
    e.preventDefault();
    let id = this.state.id;
    axios({
      url: `${serverUrl}/instructors/${id}`,
      method: "get"
    }).then(response => {
        this.props.history.push({
            pathname: '/Quizzes',
            props: { 
                instructor: response.data.instructor,
                quizzes: response.data.instructor.quizzes 
            }
        })
        console.log(response.data);
    }).catch(e => {
        this.setState({error: true})
        console.log(e)
    })
      // console.log(response.data.instructor.quizzes)
      // console.log('quizzes', this.state.quizzes)
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Container>
            <Row>
              <Col className="text-center">
                {" "}
                <h1>Teacher's Pet</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>Sign-In</h1>
                {this.state.error ? (
                  <span> Bad</span>
                ) : null}
                <div></div>
                <form
                  onSubmit={this.getInstructors}
                  onChange={e => this.handleChange(e)}
                >
                  Instructor Id: <input type="text" name="id" />
                  <input type="submit" value="Sign-In" />
                </form>
              </Col>
              <Col>
                <CreateAccount />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default Home;
