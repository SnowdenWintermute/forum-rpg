import React, { Component } from "react";
import { connect } from "react-redux";

class EquipmentShop extends Component {
  
  
    render() {
    const forumCoin = "./img/forumcoin.png"

      return (
        <div id="equipment-shop">
            <div className="small-window-header">
                Equipment Shop
            </div>
            <div className="eq-shop-grid">
                <div className="eq-shop-grid-item">
                    <button className="btn-fill btn-blue">Random Item</button>
                </div>
                <div className="eq-shop-grid-item eq-shop-price">
                    <div>
                        50<img src={forumCoin} className="shop-coin-icon"/>
                    </div>
                </div>             
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
  )(EquipmentShop);