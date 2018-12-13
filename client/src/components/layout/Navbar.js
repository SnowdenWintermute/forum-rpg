import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getWallet } from "../../actions/walletActions";
import forumcoin from "../../img/forumcoin.png";

class Navbar extends Component {
  componentDidMount() {
    this.props.getWallet();
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { wallet } = this.props;
    const navClasses = {
      nav: "nav nav-dark",
      navLink: "nav-link nav-link-dark",
      navBtn: "nav-btn nav-btn-dark",
      navHeaderText: "nav-header-text"
    };

    let balance;
    wallet.wallet ? (balance = wallet.wallet.balance) : (balance = 0);

    const authLinks = (
      <React.Fragment>
        <span style={{ marginRight: "20px", fontSize: "22px" }}>
          Welcome {user.name}{" "}
          <img style={{ height: "20px" }} alt="$" src={forumcoin} /> {balance}
        </span>
        <Link
          to="/dashboard"
          className={navClasses.navLink}
          style={{ marginRight: "20px" }}
        >
          Dashboard
        </Link>
        <button
          onClick={this.onLogoutClick.bind(this)}
          className={navClasses.navBtn}
          style={{ marginRight: "30px" }}
        >
          Logout
        </button>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <Link
          to="/login"
          className={navClasses.navBtn}
          style={{ marginRight: "10px" }}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={navClasses.navBtn}
          style={{ marginRight: "30px" }}
        >
          Register
        </Link>
      </React.Fragment>
    );

    return (
      <nav className={navClasses.nav}>
        <div>
          <span
            className={navClasses.navHeaderText}
            style={{ marginLeft: "30px" }}
          >
            Forum RPG
          </span>
          <Link
            to="/forum"
            className={navClasses.navLink}
            style={{ marginLeft: "20px" }}
          >
            Forum
          </Link>
        </div>
        <div className="nav-link-group">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.wallet !== this.props.wallet) {
      console.log(prevProps.wallet);
      // console.log(prevState.wallet);
    }
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getWallet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  wallet: state.wallet
});

export default connect(
  mapStateToProps,
  { logoutUser, getWallet }
)(Navbar);
