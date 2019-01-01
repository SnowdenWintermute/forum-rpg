import React, { Component } from "react";
import { connect } from "react-redux";

import { getInventory } from "../../actions/characterActions";

class Inventory extends Component {
  componentDidMount() {
    this.props.getInventory();
  }

  render() {
    let { character } = this.props;
    let inventory = this.props.character.inventory;
    let inventoryItems;

    if (character === undefined || character === null) {
      inventoryItems = <div>{"loading"}</div>;
    } else if (character.inventory) {
      if (character.inventory.length) {
        inventoryItems = [];
        character.inventory.forEach(item => {
          inventoryItems.push(<div key={item._id}>{item.name}</div>);
        });
      }
    }

    return (
      <section id="inventory">
        <div>Inventory</div>
        <div>{inventoryItems}</div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  character: state.character
});

export default connect(
  mapStateToProps,
  { getInventory }
)(Inventory);
