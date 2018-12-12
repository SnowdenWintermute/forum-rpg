import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { getClasses } from "../../actions/classActions";
import { getWallet, createWallet } from "../../actions/walletActions";

class Wallet extends Component {
    //      COMPONENT FUNCTIONS
    //      COMPONENT FUNCTIONS
    //      COMPONENT FUNCTIONS
    componentDidMount() {
        this.props.getClasses({
          cards: "card-wide card-dark",
          page: "page-body body-dark",
          headers: "header-text-dark",
          links: "link link-dark"
        });

        this.props.getWallet()
      }


    onCreateWalletClick = e => {
        e.preventDefault()
        this.props.createWallet()
    }

  render() {
    //      RENDER METHOD
    //      RENDER METHOD
    //      RENDER METHOD
    const { classes } = this.props;

    return (
    //      COMPONENT RETURN
    //      COMPONENT RETURN
    //      COMPONENT RETURN


        <div className="page-body body-dark">
            <h1 className={classes.headers}>Wallet</h1>
            <div className={classes.cards}>
                {this.props.wallet ? <h3>Balance:</h3> : <button onClick={this.onCreateWalletClick} className="btn btn-green" style={{width: "100%", height: "100px"}}>Open new wallet</button>}
            </div>
        </div>
    );
  }
}

Wallet.propTypes = {
  auth: PropTypes.object.isRequired,
  getClasses: PropTypes.func.isRequired,
  getWallet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classes: state.classes,
  wallet: state.wallet
});

export default connect(
  mapStateToProps,
  { getWallet, getClasses, createWallet }
)(Wallet);
