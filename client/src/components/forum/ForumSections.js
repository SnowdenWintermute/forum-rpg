import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getClasses } from "../../actions/classActions";

class ForumSections extends Component {
  componentDidMount() {
    this.props.getClasses({
      cards: "card-wide card-dark",
      page: "page-body body-dark",
      headers: "header-text-dark",
      links: "link link-dark"
    });
  }

  render() {
    return (
      <div className={this.props.classes.page}>
        <h1 className={this.props.classes.headers}>Forum Sections</h1>
        <div className={this.props.classes.cards}>
          <ul>
            <li>
              <Link
                to="/forum/general-discussion"
                className={this.props.classes.links}
              >
                General Discussion
              </Link>
            </li>
            <li>
              <Link to="/forum/gaming" className={this.props.classes.links}>
                Gaming
              </Link>
            </li>
            <li>
              <Link
                to="/forum/roleplaying"
                className={this.props.classes.links}
              >
                Roleplaying
              </Link>
            </li>
            <li>
              <Link to="/forum/fine-art" className={this.props.classes.links}>
                Fine Art
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

ForumSections.propTypes = {
  getClasses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  classes: state.classes
});

export default connect(
  mapStateToProps,
  { getClasses }
)(ForumSections);
