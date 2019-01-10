import React, { Component } from "react";
import { connect } from "react-redux";

import Inventory from "../character/Inventory";
import EquipmentShop from "./EquipmentShop";
import {clearErrors} from "../../actions/errorActions"

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeShopTab: "stats",
      errors: this.props.errors
    };
  }

  componentDidMount = () => {
    this.props.clearErrors()
  }

  onStatsTabClick = e => {
    this.setState({ activeStatTab: e.target.name });
  };

  render() {
    return (
      <div className="page-body body-dark" id="character-page">
        <h3 className="header-text-dark">Equipment Shop</h3>        
        <div id="character-windows-holder">
          <EquipmentShop />
          <Inventory />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {clearErrors}
)(Shops);
