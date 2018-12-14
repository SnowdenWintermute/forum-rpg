import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getWallet, createWallet } from "../../actions/walletActions";

import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWallet();
  }

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
              <Link to="/wallet" className="link link-dark">
                Wallet
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
  getWallet: PropTypes.func.isRequired,
  createWallet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  wallet: state.wallet
});

export default connect(
  mapStateToProps,
  { getWallet, createWallet }
)(Dashboard);
