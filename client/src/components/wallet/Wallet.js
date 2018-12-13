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
      cards: "card card-dark",
      page: "page-body body-dark",
      headers: "header-text-dark",
      links: "link link-dark"
    });
    this.props.getWallet();
  }

  onCreateWalletClick = e => {
    e.preventDefault();
    this.props.createWallet();
  };

  render() {
    //      RENDER METHOD
    //      RENDER METHOD
    //      RENDER METHOD
    const { classes, wallet } = this.props;

    let balance;
    wallet.wallet ? (balance = wallet.wallet.balance) : (balance = 0);

    let transactions = [];

    if (wallet.wallet) {
      if (wallet.wallet.transactions) {
        for (let transaction of wallet.wallet.transactions) {
          transactions.push(
            <div className="card-wide card-dark text-dark">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Amount</td>
                    <td style={{ fontWeight: "bold" }}>From</td>
                    <td style={{ fontWeight: "bold" }}>To</td>
                    <td style={{ fontWeight: "bold" }}>Date</td>
                    <td style={{ fontWeight: "bold" }}>Note</td>
                  </tr>
                  <tr>
                    <td>{transaction.amount}</td>
                    <td>{transaction.from}</td>
                    <td>{transaction.to}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.note}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      }
    }
    return (
      //      COMPONENT RETURN
      //      COMPONENT RETURN
      //      COMPONENT RETURN

      <div className="page-body body-dark">
        <h1 className={classes.headers}>Wallet</h1>
        <div className={classes.cards}>
          {this.props.wallet.wallet ? (
            <h3>Balance: {balance}</h3>
          ) : (
            <button
              onClick={this.onCreateWalletClick}
              className="btn btn-green"
              style={{ width: "100%", height: "100px" }}
            >
              Open new wallet
            </button>
          )}
        </div>
        <div>
          <h3 className={classes.headers}>Transactions</h3>
          {transactions}
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  auth: PropTypes.object.isRequired,
  getClasses: PropTypes.func.isRequired,
  getWallet: PropTypes.func.isRequired,
  wallet: PropTypes.object
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
