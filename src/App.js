import React from "react";
import "./App.css";
import axios from "axios";
import Home from "./Home";
import CreateAccount from "./CreateAccount";

import Quizzes from "./Quizzes";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/CreateAccount" component={CreateAccount} />
          <Route path="/Quizzes" component={Quizzes} />
        </div>
      </Router>
    );
  }

  //   componentDidMount() {
  //     this.getUsers()
  //   }

  //   getUsers = () => {
  //     axios({
  //       url: `${databaseUrl}/api/users`,
  //       // url: 'https://project3-backend-test.herokuapp.com/api/users',
  //       method: 'get'
  //     })
  //       .then(users => {
  //         console.log(users)
  //         this.setState({ users })
  //       })
  //   }

  //   render() {
  //     console.log(this.state.users)
  //     console.log("Rendered")
  //     return (
  //       <div className="App" >
  //         <header className="App-header">
  //           <h1>Teacher's Pet!</h1>
  //         </header>
  //       </div>
  //     );
  //   }
}

export default App;
