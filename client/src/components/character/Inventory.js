import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getInventory, equipItem } from "../../actions/characterActions";
import LoadingGif from "../../img/loading.gif";

class Inventory extends Component {
  componentDidMount() {
    this.props.getInventory();
  }

  onEquipClick = e => {
    const equipItem = this.props.equipItem
    const getInventory = this.props.getInventory
    const equipItemPromise = new Promise(function(resolve, reject){
      resolve(
        equipItem(e.target.name)
      )
    }
    )
    equipItemPromise.then(function(val){
      getInventory()
      })
  };

  render() {
    let { character } = this.props;
    let inventoryItems;

    if (character === undefined || character === null || character.loading) {
      inventoryItems = (
        <div>
          <img src={LoadingGif} alt="loading..." />
        </div>
      );
    } else if (character.inventory) {
      if (character.inventory.length) {
        inventoryItems = [];
        character.inventory.forEach(item => {
          const maxDamage = item.damage.max ? item.damage.max : null;
          const minDamage = item.damage.min ? item.damage.min : null;
          const armorClass = item.armorClass ? item.armorClass : null;

          let stats = [];

          for (let stat in item) {
            if (
              stat !== "preReqs" &&
              stat !== "_id" &&
              stat !== "rarity" &&
              stat !== "owner" &&
              stat !== "name" &&
              stat !== "resistances" &&
              stat !== "damage" &&
              stat !== "durability" &&
              stat !== "type" &&
              stat !== "subType" &&
              stat !== "handling" &&
              stat !== "armorClass" &&
              stat !== "img"
            ) {
              if (item[stat]) {
                stats.push({
                  statName: stat.charAt(0).toUpperCase() + stat.slice(1),
                  statValue: item[stat]
                });
              }
            } else if (stat === "resistances") {
              for (let res in item[stat]) {
                if (item[stat][res]) {
                  stats.push({
                    statName:
                      "Resist " + res.charAt(0).toUpperCase() + res.slice(1),
                    statValue: item[stat][res]
                  });
                }
              }
            }
          }

          inventoryItems.push(
            <div key={item._id} className="inventory-item">
              <div>
                <img
                  src={require(`../../img/equipment/${item.img}.png`)}
                  alt="item"
                />
                <div>
                  <button
                    className="btn-inv btn-blue"
                    onClick={this.onEquipClick}
                    name={item._id}
                  >
                    Equip
                  </button>
                  <button className="btn-inv btn-gray">Destroy</button>
                </div>
              </div>
              <div id="item-info" style={{ paddingLeft: "10px" }}>
                <div
                  style={{
                    borderBottom: "1px solid grey",
                    fontSize: "1.2rem"
                  }}
                >
                  {item.name}
                </div>
                <div>
                  Durability: {item.durability.current} / {item.durability.max}
                </div>
                <div>
                  {maxDamage ? `Damage ${minDamage} - ${maxDamage}` : null}{" "}
                  {armorClass ? `Armor Class: ${armorClass}` : null}{" "}
                </div>
                <div>
                  {stats[0] ? stats[0].statName : "undefined" }: {stats[0] ? stats[0].statValue : "undefined"}
                </div>
                <div>
                  {stats[1] ? stats[1].statName : "undefined" }: {stats[1] ? stats[1].statValue : "undefined"}
                </div>
                <div>Prerequisites: None</div>
              </div>
            </div>
          );
        });
      }
    }

    return (
      <section id="inventory">
        <div id="inventory-header">Inventory</div>
        <div id="inventory-list">{inventoryItems}</div>
      </section>
    );
  }
}

Inventory.propTypes = {
  auth: PropTypes.object.isRequired,
  getInventory: PropTypes.func.isRequired,
  equipItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  character: state.character
});

export default connect(
  mapStateToProps,
  { getInventory, equipItem }
)(Inventory);
