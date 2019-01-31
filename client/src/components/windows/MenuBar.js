import React, { Component } from "react";

export default class MenuBar extends Component {
  render() {
    const { onClose, onMinimize, title } = this.props;
    let closeButton, minimizeButton;

    if (this.props.closeButton) {
      closeButton = (
        <button className="x-btn-dark" onClick={onClose}>
          X
        </button>
      );
    } else {
      closeButton = null;
    }

    if (this.props.minimizeButton) {
      minimizeButton = (
        <button className="min-btn-dark" onClick={onClose}>
          -
        </button>
      );
    } else {
      minimizeButton = null;
    }

    let displayedTitle = <h3>{title}</h3>;

    return (
      <div className="window-menu-bar handle">
        {displayedTitle}
        {closeButton}
        {minimizeButton}
      </div>
    );
  }
}
