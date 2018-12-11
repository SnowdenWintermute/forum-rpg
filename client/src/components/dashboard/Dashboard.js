import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="page-body body-dark">
        <h3 className="header-text-dark">Welcome {user.name}</h3>
        <div className="card card-dark">
          <ul>
            <li>
              <Link to="/forum" className="link link-dark">
                Forum
              </Link>
            </li>
            <li>
              <Link to="/forum" className="link link-dark">
                Character
              </Link>
            </li>
            <li>
              <Link to="/forum" className="link link-dark">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/forum" className="link link-dark">
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
