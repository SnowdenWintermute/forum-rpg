import React, { Component } from "react";
import { connect } from "react-redux";

import Stats from "./Stats";
import CurrentEquipment from "./CurrentEquipment";
import Inventory from "./Inventory";

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStatTab: "stats"
    };
  }

  onStatsTabClick = e => {
    this.setState({ activeStatTab: e.target.name });
  };

  render() {
    return (
      <div className="page-body body-dark" id="character-page">
        <h1 className="header-text-dark">Character</h1>
        <div id="character-windows-holder" style={{ width: "100%" }}>
          <Stats />
          <CurrentEquipment />
          <Inventory />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Character);
