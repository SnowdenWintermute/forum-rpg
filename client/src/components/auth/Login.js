import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { getClasses } from "../../actions/classActions";

import InputGroup from "../common/InputGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    this.props.getClasses({
      card: "card-dark card",
      page: "page-body body-dark"
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
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className={this.props.classes.page}>
        <form onSubmit={this.onSubmit} noValidate>
          <div className={this.props.classes.card}>
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
            <button
              type="submit"
              className="btn btn-blue"
              style={{ width: "100%" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
  { loginUser, getClasses }
)(Login);
