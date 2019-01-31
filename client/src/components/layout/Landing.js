import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="page-body body-dark">
        <h1 className="header-text-dark">Forum RPG</h1>
        <div className="card-wide card-dark">
          <h2 className="text-dark" style={{ fontSize: "30px" }}>
            Welcome to the forum!
          </h2>
          <p classNam="text-dark">
            This is an ongoing project to demonstrate my ability to use the MERN
            stack. I plan to add more features over time.
          </p>
          <h2 className="text-dark" style={{ fontSize: "30px" }}>
            Current Features:
          </h2>
          <ul>
            <li className="text-dark">
              • Register and log in with server side validation
            </li>
            <li className="text-dark">
              • Post threads and replies in the forum
            </li>
            <li className="text-dark">• Like threads and replies</li>
            <li className="text-dark">
              • Earn coins for posting and replying to threads
            </li>
            <li className="text-dark">
              • Spend coins at the shop to get equipment for your character
            </li>
            <li className="text-dark">
              • Equip your character to get better stats
            </li>
          </ul>
          <h2
            className="text-dark"
            style={{ fontSize: "30px", marginBottom: "20px" }}
          >
            Try it out:
          </h2>
          <Link
            to="/login"
            className={"btn btn-blue"}
            style={{ marginRight: "10px" }}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={"btn btn-green"}
            style={{ marginRight: "30px" }}
          >
            Register
          </Link>
        </div>
      </div>
    );
  }
}
