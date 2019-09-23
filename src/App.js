import React, { Component } from "react";
import LoginForm from "./components/loginform/LoginForm";
import Devices from "./components/devices/Devices";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  state = {
    token: localStorage.getItem("token")
  };

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={LoginForm} />
          <ProtectedRoute exact path="/devices" component={Devices} />
        </Router>
      </div>
    );
  }
}

export default App;
