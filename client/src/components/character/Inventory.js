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

          const currentDurability = item.durability.current
          const maxDurability = item.durability.max
          const maxDamage = item.damage.max ? item.damage.max : null; 
          const minDamage = item.damage.min ? item.damage.min : null; 
          const armorClass = item.armorClass ? item.armorClass : null
  
          let stats = []

          for(let stat in item){
            if(stat !== "preReqs" &&
              stat !== "_id" &&
              stat !== "rarity" &&
              stat !== "owner" &&
              stat !== "name" &&
              stat !== "resistances"
              &&
              stat !== "damage"
              &&
              stat !== "durability"
              && stat !== "type"
              && stat !== "subType"
              && stat !== "handling"
              && stat !== "armorClass") {
            if(item[stat]) {
              stats.push(
                {
                  "statName":stat.charAt(0).toUpperCase() + stat.slice(1),
                  "statValue": item[stat] 
                }
              )
            }
              }else if(stat === "resistances"){
                for(let res in item[stat]){
                  if(item[stat][res]){
                    stats.push(
                      {
                        "statName":"Resist " +res.charAt(0).toUpperCase() + res.slice(1),
                        "statValue": item[stat][res] 
                      }
                    )
                  }
                }
              }
          }

          inventoryItems.push(
          <div key={item._id} className="inventory-item">
            <div style={{width: "100%", borderBottom: "1px solid grey"}}>
              <div style={{fontSize: "1.2rem", borderBottom:"1px solid gray"}}>{item.name}</div>
              <div>
                <div style={{display: "flex", justifyContent: "space-around", margin:"10px 0 10px 0"}}>{maxDamage ? `Damage ${minDamage} - ${maxDamage}`: null} {armorClass ? `Armor Class: ${armorClass}` : null} </div>
                <div style={{display: "flex", justifyContent: "space-around", margin:"10px 0 10px 0"}}>
                  <div>{stats[0].statName}: {stats[0].statValue}</div>
                  <div>{stats[1].statName}: {stats[1].statValue}</div>
                </div>
              </div>
            </div>
            <div>
              <button className="btn-inv btn-green">Equip</button>
              <button className="btn-inv btn-red">Destroy</button>
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

const mapStateToProps = state => ({
  auth: state.auth,
  character: state.character
});

export default connect(
  mapStateToProps,
  { getInventory }
)(Inventory);
