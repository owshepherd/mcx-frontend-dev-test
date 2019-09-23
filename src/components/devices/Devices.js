import React, { Component } from "react";
import "./devices.css";
import axios from "axios";
import auth from "../auth/Auth";

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: 0
    };

    this.callAPI = () => {
      axios
        .get(`http://35.201.2.209:8000/devices`)
        .then(res => {
          this.setState({
            devices: res.data.devices.length
          });
        })
        .catch(err => {
          console.log(err);
        });
    };

    setInterval(() => {
      this.callAPI();
    }, 5000);
  }

  notifyHandler = () => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    const text = {
      name: "Owen Shepherd",
      email: "owshepherd@gmail.com",
      repoUrl: "https://github.com/owshepherd/mcx-frontend-dev-test",
      message: "The ritual has been completed"
    };
    console.log(text);

    axios
      .post("http://35.201.2.209:8000/notify", text, header)
      .then(res => {
        console.log(res.data);
        console.log("200 Success: Alright, I won!");
      })
      .catch(err => {
        if (err.status === 400) {
          console.log(
            "400 Bad Request: your request was bad and you should feel bad."
          );
        }
        if (err.status === 401) {
          console.log("401 Unauthorised: you're not supposed to be here.");
        }
      });
  };

  logoutHandler = () => {
    auth.logout(() => {
      this.props.history.push("/");
    });
  };

  render() {
    // Maximum of 8 circles shown on screen
    let devicesOnline = parseInt(this.state.devices);
    let numberDisplay = [...Array(devicesOnline)].map((e, i) => (
      <span className={"circle" + i} key={i}></span>
    ));

    return (
      <div className="devicesWindow">
        <div className="text">
          <h1>{numberDisplay.length}</h1>
          <p>
            Devices
            <br />
            Online
          </p>
        </div>
        <div className="ring">{numberDisplay}</div>

        <div className="navbar">
          <button className="notifybtn" onClick={this.notifyHandler}>
            Notify
          </button>
          <button className="logout" onClick={this.logoutHandler}>
            Log Out
          </button>
        </div>
      </div>
    );
  }
}

export default Devices;
