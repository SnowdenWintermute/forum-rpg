import React, { Component } from "react";
import EmptySlot from "../../img/equipment/empty.png";

class CurrentEquipment extends Component {
  render() {
    return (
      <section id="current-equipment">
        <div id="item-stats">ItemStats</div>
        <div id="eq-grid-holder">
          <div id="eq-grid">
            <div id="eq-shoulders" className="eq-grid-item">
              <div className="eq-slot-label">Shoulders</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-head" className="eq-grid-item">
              <div className="eq-slot-label">Head</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-neck" className="eq-grid-item">
              <div className="eq-slot-label">Neck</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-arms" className="eq-grid-item">
              <div className="eq-slot-label">Arms</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-body" className="eq-grid-item">
              <div className="eq-slot-label">Body</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-hands" className="eq-grid-item">
              <div className="eq-slot-label">Hands</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-ring1" className="eq-grid-item">
              <div className="eq-slot-label">Ring</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-legs" className="eq-grid-item">
              <div className="eq-slot-label">Legs</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-ring2" className="eq-grid-item">
              <div className="eq-slot-label">Ring</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-right-hand" className="eq-grid-item">
              <div className="eq-slot-label">Right</div>
              <img alt="eq" src={EmptySlot} />
            </div>
            <div id="eq-feet" className="eq-grid-item">
              <div className="eq-slot-label">Feet</div>
              <img alt="eq" src={EmptySlot} />
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

export default CurrentEquipment;
