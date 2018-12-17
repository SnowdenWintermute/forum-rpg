import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { getClasses } from "../../actions/classActions";
import {
  getThread,
  deleteThread,
  likeThread,
  createNewReply,
  clearThreadFromState,
  editThread,
  editReply
} from "../../actions/forumActions";

import { clearErrors } from "../../actions/errorActions";
import { getWallet } from "../../actions/walletActions";

import ThreadReplyCard from "./ThreadReplyCard";
import NewReplyForm from "./NewReplyForm";
import NewThreadForm from "./NewThreadForm";

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newReplyFormActive: false,
      editThreadFormActive: false,
      editReplyFormActive: false,
      title: "",
      text: "",
      wallet: {},
      errors: {}
    };
  }

  //      COMPONENT FUNCTIONS
  //      COMPONENT FUNCTIONS
  //      COMPONENT FUNCTIONS

  // To close new reply form
  escFunction = event => {
    if (event.keyCode === 27) {
      this.onExitClick();
    }
  };

  componentDidMount() {
    // this.props.clearErrors();
    this.props.getWallet();

    document.addEventListener("keydown", this.escFunction, false);

    this.props.getClasses({
      cards: "card-wide card-dark",
      page: "page-body body-dark",
      headers: "header-text-dark",
      text: "text-dark",
      links: "link link-dark",
      detailText: "detail-text-dark",
      btnGray: "btn btn-gray",
      btnBlue: "btn btn-blue",
      xButton: "x-btn-dark",
      form: "bg-dark"
    });

    this.props.getThread(
      this.props.match.params.forumSection,
      this.props.match.params.threadId
    );
  }

  // Remove escape key listener to prevent memory leaks
  componentWillUnmount() {
    this.props.clearThreadFromState();
    document.removeEventListener("keydown", this.escFunction, false);
  }

  // If we get the unauthorized error, close the reply form to show it
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(prevState.wallet);
    console.log(nextProps.wallet);
    if (nextProps.wallet !== prevState.wallet && !nextProps.wallet.loading) {
      console.log("updated wallet");
      if (nextProps.wallet.wallet) console.log(nextProps.wallet.wallet.balance);
      if (nextProps.wallet.wallet && prevState.wallet.wallet) {
        if (prevState.wallet.wallet.balance < nextProps.wallet.wallet.balance) {
          console.log("+money");
        }
        return { wallet: nextProps.wallet };
      }
    }
    if (nextProps.errors === "Unauthorized") {
      window.scrollTo(0, 0);
      return {
        newReplyFormActive: false,
        errors: nextProps.errors
      };
    }
    return { errors: nextProps.errors };
  }

  // Put form data into local state
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Open the form to make new reply
  createNewReplyClick = () => {
    this.setState({ newReplyFormActive: true });
  };

  // Open the form to edit thread
  onEditThreadClick = () => {
    this.setState({ editThreadFormActive: true });
  };

  // Like thread
  onLikeClick = () => {
    this.props.likeThread(
      this.props.match.params.forumSection,
      this.props.match.params.threadId
    );
  };

  // X button for reply form
  onExitClick = () => {
    this.setState({ newReplyFormActive: false });
    this.setState({ editThreadFormActive: false });
    this.setState({ editReplyFormActive: false });
  };

  // Submit new reply
  onSubmitReply = e => {
    e.preventDefault();
    const replyData = {
      text: this.state.text
    };
    const createReplyAndUpdateWallet = new Promise((resolve, reject) => {
      resolve(
        this.props.createNewReply(
          this.props.match.params.forumSection,
          this.props.match.params.threadId,
          this.props.match.params.threadTitle,
          replyData,
          this.props.history
        )
      );
    });
    createReplyAndUpdateWallet.then(this.props.getWallet());

    // Deactivate form if there is any text in submission
    if (this.state.text) {
      this.setState({ newReplyFormActive: false });
    }
    this.props.getWallet();
  };

  onSubmitEditThread = e => {
    e.preventDefault();
    const threadData = {
      title: this.state.title,
      text: this.state.text,
      forumSection: this.props.match.params.forumSection
    };
    this.props.editThread(
      this.props.match.params.forumSection,
      this.props.match.params.threadId,
      this.props.match.params.threadTitle,
      threadData,
      this.props.history
    );
    // Deactivate form if there is both text and title in submission
    if (this.state.text && this.state.title) {
      this.setState({ editThreadFormActive: false });
    }
  };

  // Delete thread function
  onDeleteClick = () => {
    this.props.deleteThread(
      this.props.match.params.forumSection,
      this.props.match.params.threadId,
      this.props.match.params.threadTitle,
      this.props.history
    );
  };

  //      COMPONENT RENDER
  //      COMPONENT RENDER
  //      COMPONENT RENDER

  render() {
    const { thread, loading, classes, auth, errors } = this.props;

    let threadPath = <span>Loading thread...</span>;
    let threadOriginal;
    let visibleThreads = <span>Searching for thread...</span>;
    let activeForm;

    // Load and display thread and replies
    if (thread === undefined || thread === null || loading) {
      visibleThreads = <span>Loading threads...</span>;
      threadPath = <span>Loading thread...</span>;
    } else if (thread.likes) {
      // checking for likes because for some reason thread itself doesn't work
      threadPath = (
        <span className={classes.headers}>{` /forum/${
          this.props.match.params.forumSection
        }/${this.props.match.params.threadTitle}`}</span>
      );

      threadOriginal = <ThreadReplyCard reply={thread} classes={classes} />;

      visibleThreads = thread.replies.map((reply, index) => (
        <ThreadReplyCard
          reply={reply}
          classes={classes}
          key={index}
          onEditReplyClick={this.onEditReplyClick}
        />
      ));
    } else {
      visibleThreads = (
        <h4 className={classes.headers}>No thread found in this section</h4>
      );
      threadPath = (
        <span className={classes.headers}> No thread at this url...</span>
      );
    }

    // Show the new reply form if active
    if (this.state.newReplyFormActive) {
      activeForm = (
        <NewReplyForm
          classes={classes}
          onChange={this.onChange}
          onSubmitReply={this.onSubmitReply}
          onExitClick={this.onExitClick}
          text={this.state.text}
          errors={errors}
          header={"New Reply"}
        />
      );
    }

    // Show the edit thread form if active
    if (this.state.editThreadFormActive) {
      activeForm = (
        <NewThreadForm
          classes={classes}
          onChange={this.onChange}
          onSubmit={this.onSubmitEditThread}
          onExitClick={this.onExitClick}
          text={this.state.text}
          errors={errors}
          header={"Edit Thread"}
        />
      );
    }

    // Show the edit reply form if active
    if (this.state.editReplyFormActive) {
      activeForm = (
        <NewReplyForm
          classes={classes}
          onChange={this.onChange}
          onSubmit={this.onSubmitEditReply}
          onExitClick={this.onExitClick}
          text={this.state.text}
          errors={errors}
          header={"Edit Reply"}
        />
      );
    }

    //      COMPONENT RENDER RETURN
    //      COMPONENT RENDER RETURN
    //      COMPONENT RENDER RETURN

    return (
      <div className={classes.page}>
        {errors === "Unauthorized" && (
          <div className="error-box" id="error-box">
            You must log in to perform that action
          </div>
        )}

        {/* Display Section Name */}
        <h1 className={classes.headers}>
          Section:{" "}
          {this.props.match.params.forumSection === "general-discussion" ||
          this.props.match.params.forumSection === "gaming" ||
          this.props.match.params.forumSection === "roleplaying" ||
          this.props.match.params.forumSection === "fine-art"
            ? this.props.match.params.forumSection
                .split("-")
                .map(word => {
                  let arr = word.split("");
                  arr[0] = arr[0].toUpperCase();
                  return arr.join("");
                })
                .join(" ")
            : "Forum section not found"}
        </h1>

        {/* Display top buttons */}
        <div className="forum-top-links">
          <div>
            <Link
              to={`/forum/${this.props.match.params.forumSection}`}
              className="btn btn-gray"
            >
              Go Back
            </Link>
            {threadPath}
          </div>
          <div
            style={{
              display: "flex"
            }}
          >
            <div>
              {/* Delete Thread Button */}
              {thread ? (
                auth.user.id === thread.user ? (
                  <button
                    onClick={this.onDeleteClick}
                    className="btn btn-red"
                    style={{ marginRight: "10px" }}
                  >
                    Delete Thread
                  </button>
                ) : null
              ) : null}
              {/* Edit Thread Button */}
              {thread ? (
                auth.user.id === thread.user ? (
                  <button
                    onClick={this.onEditThreadClick}
                    className="btn btn-green"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                ) : null
              ) : null}
            </div>
            <div>
              <button
                className={classes.btnBlue}
                onClick={this.createNewReplyClick}
                style={{ marginRight: "10px" }}
              >
                Reply
              </button>
              {/* LIKE BUTTON */}
              <button className={classes.btnBlue} onClick={this.onLikeClick}>
                {thread && thread.likes ? (
                  thread.likes.filter(
                    like => like._id === this.props.auth.user.id
                  ).length > 0 ? (
                    <i className="fa fa-heart" />
                  ) : (
                    <i className="far fa-heart" />
                  )
                ) : (
                  <i className="far fa-heart" />
                )}{" "}
                {thread ? (thread.likes ? thread.likes.length : 0) : null}
              </button>
            </div>
          </div>
        </div>
        {threadOriginal}
        {visibleThreads}
        {activeForm}
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    // console.log("state: ");
    // console.log(this.state.wallet);
    // console.log("props: ");
    // console.log(prevProps.wallet);
  }
}

Thread.propTypes = {
  getClasses: PropTypes.func.isRequired,
  getThread: PropTypes.func.isRequired,
  editThread: PropTypes.func.isRequired,
  likeThread: PropTypes.func.isRequired,
  deleteThread: PropTypes.func.isRequired,
  createNewReply: PropTypes.func.isRequired,
  editReply: PropTypes.func.isRequired,
  clearThreadFromState: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  getWallet: PropTypes.func.isRequired,
  thread: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classes: state.classes,
  thread: state.threads.thread,
  auth: state.auth,
  errors: state.errors,
  wallet: state.wallet
});

export default connect(
  mapStateToProps,
  {
    getClasses,
    getThread,
    editThread,
    deleteThread,
    likeThread,
    createNewReply,
    editReply,
    clearThreadFromState,
    clearErrors,
    getWallet
  }
)(withRouter(Thread));
