import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { getClasses } from "../../actions/classActions";
import { getWallet, createWallet } from "../../actions/walletActions";

import loadingGif from "../../img/loading.gif";

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
            <div
              className="card-wide card-dark text-dark"
              key={transaction.date}
            >
              <table>
                <tbody>
                  <tr>
                    <td className={"td-padding"} style={{ fontWeight: "bold" }}>
                      Amount
                    </td>
                    <td className={"td-padding"} style={{ fontWeight: "bold" }}>
                      From
                    </td>
                    <td className={"td-padding"} style={{ fontWeight: "bold" }}>
                      To
                    </td>
                    <td className={"td-padding"} style={{ fontWeight: "bold" }}>
                      Date
                    </td>
                    <td className={"td-padding"} style={{ fontWeight: "bold" }}>
                      Note
                    </td>
                  </tr>
                  <tr>
                    <td className={"td-padding"}>{transaction.amount}</td>
                    <td className={"td-padding"}>{transaction.from}</td>
                    <td className={"td-padding"}>{transaction.to}</td>
                    <td className={"td-padding"}>
                      <Moment format="MM/DD/YYYY HH:mm:ss">
                        {transaction.date}
                      </Moment>
                    </td>
                    <td className={"td-padding"}>{transaction.note}</td>
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
        <h3 className={classes.headers}>Wallet</h3>
        <div className={classes.cards}>
          {this.props.wallet.wallet ? (
            <h3>Balance: {balance}</h3>
          ) : (
            <img
              src={loadingGif}
              alt="loading..."
              style={{ height: "100px" }}
            />
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
