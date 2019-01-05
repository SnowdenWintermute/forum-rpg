import React, { Component } from "react";
import EmptySlot from "../../img/equipment/empty.png";
import {connect} from "react-redux"
import PropTypes from "prop-types"

import {getEquipment, getCharacter} from "../../actions/characterActions"

class CurrentEquipment extends Component {
  componentDidMount(){
    this.props.getEquipment()
    this.props.getCharacter()
  }
  render() {
    let {equipment} = this.props.character

    let eqPics = {
      empty: EmptySlot,
      shoulders: require('../../img/equipment/shoulders.png'),
      head: require('../../img/equipment/head.png'),
      neck: require('../../img/equipment/neck.png'),
      arms: require('../../img/equipment/arms.png'),
      body: require('../../img/equipment/body.png'),
      hands: require('../../img/equipment/hands.png'),
      ring: require('../../img/equipment/ring.png'),
      legs: require('../../img/equipment/legs.png'),
      feet: require('../../img/equipment/feet.png'),
    }



    // let getEquipmentImage = (slot) => {
    //   if(equipment){
    //     if(equipment[slot]){
    //       console.log(equipment)
    //       console.log(`../../img/equipment/${equipment[slot].img}.png`)
    //       return `../../img/equipment/${equipment[slot].img}.png`
    //     }
    //   }
    //   return EmptySlot
    // }
    // let shouldersImg = getEquipmentImage("shoulders")

    return (
      <section id="current-equipment">
        <div id="item-stats">ItemStats</div>
        <div id="eq-grid-holder">
          <div id="eq-grid">
            <div id="eq-shoulders" className="eq-grid-item">
              <div className="eq-slot-label">Shoulders</div>
              <img alt="eq" src={eqPics[equipment ? equipment.shoulders  ? equipment.shoulders.type: "empty": "empty"]} />
            </div>
            <div id="eq-head" className="eq-grid-item">
              <div className="eq-slot-label">Head</div>
              <img alt="eq" src={eqPics[equipment ? equipment.head ? equipment.head.type: "empty": "empty"]} />
            </div>
            <div id="eq-neck" className="eq-grid-item">
              <div className="eq-slot-label">Neck</div>
              <img alt="eq" src={eqPics[equipment ? equipment.neck ? equipment.neck.type: "empty" : "empty"]} />
            </div>
            <div id="eq-arms" className="eq-grid-item">
              <div className="eq-slot-label">Arms</div>
              <img alt="eq" src={eqPics[equipment ? equipment.arms ? equipment.arms.type: "empty": "empty"]} />
            </div>
            <div id="eq-body" className="eq-grid-item">
              <div className="eq-slot-label">Body</div>
              <img alt="eq" src={eqPics[equipment ? equipment.body ? equipment.body.type: "empty": "empty"]} />
            </div>
            <div id="eq-hands" className="eq-grid-item">
              <div className="eq-slot-label">Hands</div>
              <img alt="eq" src={eqPics[equipment ? equipment.hands ? equipment.hands.type: "empty": "empty"]} />
            </div>
            <div id="eq-ring1" className="eq-grid-item">
              <div className="eq-slot-label">Ring</div>
              <img alt="eq" src={eqPics[equipment ? equipment.ringRight ? equipment.ringRight.type: "empty": "empty"]} />
            </div>
            <div id="eq-legs" className="eq-grid-item">
              <div className="eq-slot-label">Legs</div>
              <img alt="eq" src={eqPics[equipment ? equipment.legs ? equipment.legs.type: "empty": "empty"]} />
            </div>
            <div id="eq-ring2" className="eq-grid-item">
              <div className="eq-slot-label">Ring</div>
              <img alt="eq" src={eqPics[equipment ? equipment.ringLeft ? equipment.ringLeft.type: "empty": "empty"]} />
            </div>
            <div id="eq-right-hand" className="eq-grid-item">
              <div className="eq-slot-label">Right</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-feet" className="eq-grid-item">
              <div className="eq-slot-label">Feet</div>
              <img alt="eq" src={eqPics[equipment ? equipment.feet ? equipment.feet.type: "empty": "empty"]} />
            </div>
            <div id="eq-left-hand" className="eq-grid-item">
              <div className="eq-slot-label">Left</div>
              <img alt="eq" src={EmptySlot} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

CurrentEquipment.propTypes = {
  auth: PropTypes.object.isRequired,
  getEquipment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  equipment: state.character.equipment,
  character: state.character
})

export default connect(mapStateToProps, {getEquipment, getCharacter})(CurrentEquipment);
