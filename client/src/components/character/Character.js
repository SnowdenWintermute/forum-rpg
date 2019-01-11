import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import Stats from "./Stats";
import CurrentEquipment from "./CurrentEquipment";
import Inventory from "./Inventory";

import {clearErrors} from '../../actions/errorActions'

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStatTab: "stats"
    };
  }

  componentDidMount=()=>{
    this.props.clearErrors()
  }

  onStatsTabClick = e => {
    this.setState({ activeStatTab: e.target.name });
  };

  render() {
    return (
      <div className="page-body body-dark" id="character-page">
        <h3 className="header-text-dark">Character</h3>
        <div id="character-windows-holder">
          <Stats />
          <CurrentEquipment />
          <Inventory />
        </div>
      </div>
    );
  }
}

Character.propTypes = {
  auth: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {clearErrors}
)(Character);
