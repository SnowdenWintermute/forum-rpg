import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { buyEquipment } from "../../actions/shopActions";
import {clearErrors} from "../../actions/errorActions"

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
    this.props.clearErrors()
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
              *
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
            <button
              className="btn-fill btn-blue"
              eqtype="hand"
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
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="oneHandSword"
              onClick={this.onPurchaseClick}
            >Sword</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="oneHandClub"
              onClick={this.onPurchaseClick}
            >Club</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="oneHandAxe"
              onClick={this.onPurchaseClick}
            >Axe</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="pistol"
              onClick={this.onPurchaseClick}
            >Pistol</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="twoHandSword"
              onClick={this.onPurchaseClick}
            >Katana</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="twoHandClub"
              onClick={this.onPurchaseClick}
            >Staff</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="twoHandAxe"
              onClick={this.onPurchaseClick}
            >Greataxe</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="polearm"
              onClick={this.onPurchaseClick}
            >Polearm</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="bow"
              onClick={this.onPurchaseClick}
            >Bow</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="crossbow"
              onClick={this.onPurchaseClick}
            >Crossbow</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="rifle"
              onClick={this.onPurchaseClick}
            >Rifle</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="ammunition"
              subtype="arrow"
              onClick={this.onPurchaseClick}
            >Arrows</button>
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
              eqtype="ammunition"
              subtype="bolt"
              onClick={this.onPurchaseClick}
            >Bolts</button>
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
              eqtype="ammunition"
              subtype="bullet"
              onClick={this.onPurchaseClick}
            >Bullets</button>
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
             <button
              className="btn-fill btn-blue"
              eqtype="hand"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Repair All</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              *
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="randomArmor"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Random Armor</button>
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
              eqtype="arms"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Arms</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="hands"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Hands</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="feet"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Feet</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              100
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="shoulders"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Shoulders</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              150
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="head"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Head</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              150
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="body"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Body</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="legs"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Legs</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="ring"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Ring</button>
          </div>
          <div className="eq-shop-grid-item eq-shop-price">
            <div>
              200
              <img src={forumCoin} alt="g" className="shop-coin-icon" />
            </div>
          </div>
          <div className="eq-shop-grid-item">
             <button
              className="btn-fill btn-blue"
              eqtype="neck"
              subtype="random"
              onClick={this.onPurchaseClick}
            >Amulet</button>
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
  buyEquipment: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { buyEquipment, clearErrors }
)(EquipmentShop);
