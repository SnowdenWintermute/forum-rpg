import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";

import { deleteReply, editReply, likeReply } from "../../actions/forumActions";

import NewReplyForm from "./NewReplyForm";

class ThreadReplyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editReplyFormActive: false,
      text: "",
      errors: {}
    };
  }

  // To close new reply form
  escFunction = event => {
    if (event.keyCode === 27) {
      this.onExitClick();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    this.setState({ text: this.props.reply.text });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  // X button for reply form
  onExitClick = () => {
    this.setState({ editReplyFormActive: false });
  };

  // Put form data into local state
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Delete Reply
  onDeleteReplyClick = e => {
    this.props.deleteReply(
      this.props.match.params.forumSection,
      this.props.match.params.threadId,
      this.props.reply._id
    );
  };

  // Open the form to make new reply
  onEditReplyClick = e => {
    this.setState({ editReplyFormActive: true });
  };

  // Edit reply action
  onSubmitEditReply = e => {
    e.preventDefault();
    const replyData = {
      text: this.state.text
    };
    this.props.editReply(
      this.props.match.params.forumSection,
      this.props.match.params.threadId,
      this.props.match.params.threadTitle,
      this.props.reply._id,
      replyData,
      this.props.history
    );
    // Deactivate form if there is both text and title in submission
    if (this.state.text) {
      this.setState({ editReplyFormActive: false });
    }
  };

  onLikeClick = e => {
    e.preventDefault();
    this.props.likeReply(
      this.props.match.params.forumSection,
      this.props.match.params.threadId,
      this.props.reply._id
    );
  };

  render() {
    const { reply, classes, auth, errors } = this.props;
    let card;
    let activeForm;

    console.log(this.props.reply.likes);
    console.log(this.props.auth.user.id);
    console.log(
      this.props.reply.likes.filter(
        like => like._id === this.props.auth.user.id
      ).length
    );

    // Show the edit reply form if active
    if (this.state.editReplyFormActive) {
      activeForm = (
        <NewReplyForm
          classes={classes}
          onChange={this.onChange}
          onSubmitReply={this.onSubmitEditReply}
          onExitClick={this.onExitClick}
          text={this.state.text}
          errors={errors}
          header={"Edit Reply"}
        />
      );
    }
    if (reply.likes !== undefined) {
      card = (
        <div
          className={
            classes.cards +
            " flex flex-column" +
            (reply.replies
              ? " reply-card-master"
              : "") /* Puts a border if it is the master reply (original thread post) */
          }
        >
          {/* editDate avatar signature */}
          <p>{reply.text}</p>

          <div className={classes.detailText + " flex flex-between"}>
            <div>
              <small>
                Date:{" "}
                <Moment format="MM/DD/YYYY HH:MM:SS">
                  {reply.dateCreated}
                </Moment>
              </small>
              <br />
              <small>By {reply.author}</small>
            </div>
            <div className={classes.detailText} style={{ height: "100%" }}>
              <div className="like-box">
                {!this.props.reply.replies && (
                  <button
                    onClick={this.onLikeClick}
                    className="like-heart-button"
                  >
                    {this.props.reply.likes.filter(
                      like => like._id === this.props.auth.user.id
                    ).length > 0 ? (
                      <i className="fa fa-heart" />
                    ) : (
                      <i className="far fa-heart" />
                    )}{" "}
                  </button>
                )}
                {/* Display likes if not orginal post */}
                {!reply.replies ? (
                  <small>Likes: {reply.likes.length}</small>
                ) : null}
              </div>
              <div style={{ display: "flex" }}>
                {!reply.replies && reply.user === auth.user.id ? (
                  <button
                    onClick={this.onEditReplyClick}
                    className="nav-btn btn-green"
                    style={{ marginTop: "10px", marginRight: "10px" }}
                  >
                    Edit
                  </button>
                ) : null}
                {!reply.replies && reply.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteReplyClick}
                    className="nav-btn btn-red"
                    style={{ marginTop: "10px" }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          {activeForm}
        </div>
      );
    } else {
      card = <div>Loading...</div>;
    }
    return card;
  }
}

ThreadReplyCard.propTypes = {
  reply: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReply: PropTypes.func.isRequired,
  editReply: PropTypes.func.isRequired,
  likeReply: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteReply, editReply, likeReply }
)(withRouter(ThreadReplyCard));
