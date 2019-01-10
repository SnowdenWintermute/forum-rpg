import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { buyEquipment } from "../../actions/shopActions";

class EquipmentShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: this.props.character,
      activeTab: "weapons"
    };
  }

  onTabClick = e => {
    this.setState({ activeTab: e.target.name });
  };

  onPurchaseClick = e => {
    let eqtype = e.target.getAttribute("eqtype");
    let subtype = e.target.getAttribute("subtype");
    this.props.buyEquipment(eqtype, subtype);
  };

  render() {
    const forumCoin = "./img/forumcoin.png";
    let activeTabContent;

    if (this.state.activeTab === "weapons") {
      activeTabContent = (
        <div className="eq-shop-grid">
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Repair All</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              50
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button
              className="btn-fill btn-blue"
              eqtype="random"
              subtype="random"
              onClick={this.onPurchaseClick}
            >
              Random Weapon
            </button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              50
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Sword</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Club</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Axe</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Katana</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Staff</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Greataxe</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Polearm</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Bow</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Crossbow</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Rifle</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Pistol</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Arrows</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              50
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Bolts</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              50
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Bullets</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              50
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
        </div>
      );
    }

    if (this.state.activeTab === "armor") {
      activeTabContent = (
        <div className="eq-shop-grid">
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Repair All</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              50
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Random Armor</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              50
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Body</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Legs</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Arms</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Hands</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Shoulders</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Head</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Feet</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Ring</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button className="btn-fill btn-blue">Amulet</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div id="equipment-shop">
        <div className="small-window-header">
          <div
            id="stats-tab-buttons"
            style={{
              width: "100%"
            }}
          >
            <button
              onClick={this.onTabClick}
              name="weapons"
              className="stats-tab-button"
              style={
                this.state.activeTab === "weapons" ? { background: "#333" } : {}
              }
            >
              Weapons
            </button>
            <button
              onClick={this.onTabClick}
              name="armor"
              className="stats-tab-button"
              style={
                this.state.activeTab === "armor" ? { background: "#333" } : {}
              }
            >
              Armor
            </button>
          </div>
        </div>
        <div className="eq-shop-grid-holder">{activeTabContent}</div>
      </div>
    );
  }
}

EquipmentShop.propTypes = {
  auth: PropTypes.object.isRequired,
  buyEquipment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { buyEquipment }
)(EquipmentShop);
