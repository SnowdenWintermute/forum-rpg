import React, { Component } from "react";
import EmptySlot from "../../img/equipment/empty.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getEquipment,
  getCharacter,
  unequipItem
} from "../../actions/characterActions";

class CurrentEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      hoveredEquipment: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          Current Equipment
        </div>
      )
    };
  }
  componentDidMount() {
    this.props.getEquipment();
    this.props.getCharacter();
    this.setState({ character: this.props.character });
  }

  onUnequipClick = e => {
    this.props.unequipItem(e.target.getAttribute("name"));
    this.setState({
      hoveredEquipment: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          Current Equipment
        </div>
      )
    });
  };

  onMouseEnterEq = e => {
    let item = this.state.character.equipment[e.target.getAttribute("name")];
    let itemStats = [];

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
          itemStats.push({
            statName: stat.charAt(0).toUpperCase() + stat.slice(1),
            statValue: item[stat]
          });
        }
      } else if (stat === "resistances") {
        for (let res in item[stat]) {
          if (item[stat][res]) {
            itemStats.push({
              statName: "Resist " + res.charAt(0).toUpperCase() + res.slice(1),
              statValue: item[stat][res]
            });
          }
        }
      }
    }

    this.setState({
      hoveredEquipment: (
        <div style={{ fontSize: "1.2rem", marginLeft: "10px" }}>
          {item.name}
          <div
            style={{
              fontSize: ".8rem",
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div>
              {item.armorClass ? "Armor Class: " + item.armorClass : null}
              {item.damage.min
                ? "Damage: " + item.damage.min + " - " + item.damage.max
                : null}
            </div>
            <div>
              {itemStats[0]
                ? `${itemStats[0].statName}: ${itemStats[0].statValue}`
                : null}
            </div>
            {itemStats[1]
              ? `${itemStats[1].statName}: ${itemStats[1].statValue}`
              : null}
          </div>
        </div>
      )
    });
  };

  render() {
    let equipment = this.state.character
      ? this.state.character.equipment
        ? this.state.character.equipment
        : null
      : null;

    let eqPics = {
      empty: EmptySlot
    };

    return (
      <section id="current-equipment">
        <div id="item-stats">{this.state.hoveredEquipment}</div>
        <div id="eq-grid-holder">
          <div id="eq-grid">
            <div id="eq-shoulders" className="eq-grid-item">
              <div className="eq-slot-label">Shoulders</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.shoulders ? (
                    <div
                      className="unequip-hover"
                      name="shoulders"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.shoulders
                        ? `/img/equipment/${equipment.shoulders.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>
            </div>
            <div id="eq-head" className="eq-grid-item">
              <div className="eq-slot-label">Head</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.head ? (
                    <div
                      className="unequip-hover"
                      name="head"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.head
                        ? `/img/equipment/${equipment.head.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-neck" className="eq-grid-item">
              <div className="eq-slot-label">Neck</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.neck ? (
                    <div
                      className="unequip-hover"
                      name="neck"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.neck
                        ? `/img/equipment/${equipment.neck.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-arms" className="eq-grid-item">
              <div className="eq-slot-label">Arms</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.arms ? (
                    <div
                      className="unequip-hover"
                      name="arms"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.arms
                        ? `/img/equipment/${equipment.arms.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-body" className="eq-grid-item">
              <div className="eq-slot-label">Body</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.body ? (
                    <div
                      className="unequip-hover"
                      name="body"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.body
                        ? `/img/equipment/${equipment.body.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-hands" className="eq-grid-item">
              <div className="eq-slot-label">Hands</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.hands ? (
                    <div
                      className="unequip-hover"
                      name="hands"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.hands
                        ? `/img/equipment/${equipment.hands.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-ring1" className="eq-grid-item">
              <div className="eq-slot-label">Ring</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.ringRight ? (
                    <div
                      className="unequip-hover"
                      name="ringRight"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.ringRight
                        ? `/img/equipment/${equipment.ringRight.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-legs" className="eq-grid-item">
              <div className="eq-slot-label">Legs</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.legs ? (
                    <div
                      className="unequip-hover"
                      name="legs"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.legs
                        ? `/img/equipment/${equipment.legs.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-ring2" className="eq-grid-item">
              <div className="eq-slot-label">Ring</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.ringLeft ? (
                    <div
                      className="unequip-hover"
                      name="ringLeft"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.ringLeft
                        ? `/img/equipment/${equipment.ringLeft.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-right-hand" className="eq-grid-item">
              <div className="eq-slot-label">Right</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.handRight ? (
                    <div
                      className="unequip-hover"
                      name="handRight"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.handRight
                        ? `/img/equipment/${equipment.handRight.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-feet" className="eq-grid-item">
              <div className="eq-slot-label">Feet</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.feet ? (
                    <div
                      className="unequip-hover"
                      name="feet"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.feet
                        ? `/img/equipment/${equipment.feet.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>{" "}
            </div>
            <div id="eq-left-hand" className="eq-grid-item">
              <div className="eq-slot-label">Left</div>
              <div className="eq-img-holder">
                {equipment ? (
                  equipment.handLeft ? (
                    <div
                      className="unequip-hover"
                      name="handLeft"
                      onClick={this.onUnequipClick}
                      onMouseEnter={this.onMouseEnterEq}
                    >
                      X
                    </div>
                  ) : null
                ) : null}
                <img
                  alt="eq"
                  src={
                    equipment
                      ? equipment.handLeft
                        ? `/img/equipment/${equipment.handLeft.img}.png`
                        : eqPics.empty
                      : eqPics.empty
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.character !== prevState.character) {
      this.setState({ character: this.props.character });
    }
  }
}

CurrentEquipment.propTypes = {
  auth: PropTypes.object.isRequired,
  getEquipment: PropTypes.func.isRequired,
  unequipItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  equipment: state.character.equipment,
  character: state.character
});

export default connect(
  mapStateToProps,
  { getEquipment, getCharacter, unequipItem }
)(CurrentEquipment);
