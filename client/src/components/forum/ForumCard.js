import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ForumCard extends Component {
  render() {
    const { thread } = this.props;
    const { classes } = this.props;

    const threadTitleKebabCase = () => {
      return thread.title
        .toLowerCase()
        .split(" ")
        .join("-");
    };
    const linkToFullThread = `/forum/${thread.forumSection}/${
      thread.threadId
    }/${threadTitleKebabCase()}/`;

    return (
      <div className={classes.cards + " flex"}>
        <div
          className="flex flex-between flex-align-center"
          style={{ width: "100%" }}
        >
          <div style={{ width: "100%" }}>
            <Link className={classes.links} to={linkToFullThread}>
              {thread.title}
            </Link>
            <div className={"forum-card-text-and-info"}>
              <p className={classes.text} style={{ width: "80%" }}>
                {thread.text}
              </p>
              <table className={classes.detailText} style={{ width: "200px" }}>
                <tbody>
                  <tr>
                    <td>Views: </td>
                    <td>{thread.views}</td>
                  </tr>
                  <tr>
                    <td>Replies: </td>
                    <td>{thread.replies.length}</td>
                  </tr>
                  <tr>
                    <td>Likes: </td>
                    <td>{thread.likes.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <small className={classes.detailText}>
              Date Created:{" "}
              <Moment format="YYYY/MM/DD">{thread.dateCreated}</Moment>
            </small>
            <small className={classes.detailText}>
              {" "}
              by {this.props.thread.author}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

ForumCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  dateCreated: PropTypes.string,
  userName: PropTypes.string,
  views: PropTypes.number,
  replies: PropTypes.number,
  likes: PropTypes.number
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(ForumCard);
