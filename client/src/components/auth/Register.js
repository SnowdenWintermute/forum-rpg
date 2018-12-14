import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { getClasses } from "../../actions/classActions";

import InputGroup from "../common/InputGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    this.props.getClasses({
      card: "card-dark card",
      page: "page-body body-dark",
      headers: "header-text-dark"
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(userData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className={this.props.classes.page}>
        <h1 className={this.props.classes.headers}>New Account</h1>
        <form onSubmit={this.onSubmit} noValidate>
          <div className={this.props.classes.card}>
            <InputGroup
              name="name"
              type="text"
              placeholder="User Name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
              style={{ marginBottom: "4px" }}
            />
            <InputGroup
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              style={{ marginBottom: "4px" }}
            />
            <InputGroup
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
              style={{ marginBottom: "6px" }}
            />
            <InputGroup
              name="password2"
              type="password"
              placeholder="Repeat Password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
              style={{ marginBottom: "6px" }}
            />
            <button
              type="submit"
              className="btn btn-blue"
              style={{ width: "100%" }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classes: state.classes,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, getClasses }
)(withRouter(Register));
