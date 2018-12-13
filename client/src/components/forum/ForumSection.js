import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { getClasses } from "../../actions/classActions";
import { getForumThreads, createNewThread } from "../../actions/forumActions";
import { clearErrors } from "../../actions/errorActions";

import ForumCard from "./ForumCard";
import NewThreadForm from "./NewThreadForm";

class ForumSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newThreadFormActive: false,
      title: "",
      text: "",
      errors: {}
    };
  }

  escFunction = event => {
    if (event.keyCode === 27) {
      this.setState({ newThreadFormActive: false });
    }
  };

  componentDidMount() {
    this.props.clearErrors();
    document.addEventListener("keydown", this.escFunction, false);

    this.props.getClasses({
      cards: "card-wide card-dark",
      page: "page-body body-dark",
      headers: "header-text-dark",
      links: "link link-dark",
      form: "bg-dark",
      text: "text-dark",
      detailText: "detail-text-dark",
      btnBlue: "btn btn-blue",
      btnGray: "btn btn-gray",
      xButton: "x-btn-dark"
    });

    this.props.getForumThreads(this.props.match.params.forumSection);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      wallet: nextProps.wallet
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createThreadClick = () => {
    this.setState({ newThreadFormActive: true });
  };

  onExitClick = () => {
    this.setState({ newThreadFormActive: false });
  };

  onSubmit = e => {
    e.preventDefault();
    const threadData = {
      title: this.state.title,
      text: this.state.text
    };
    this.props.createNewThread(
      this.props.match.params.forumSection,
      threadData,
      this.props.history
    );
  };

  render() {
    const { threads, loading } = this.props.threads;
    const { classes } = this.props;
    const { errors } = this.state;
    let visibleThreads;
    let newThreadForm;

    // Load and display threads
    if (threads === null || loading) {
      visibleThreads = <span>Loading threads...</span>;
    } else {
      if (threads.length > 0) {
        visibleThreads = threads
          // Sort by date before rendering TODO: Make more sort criteria
          .sort((a, b) => {
            if (a.dateCreated > b.dateCreated) return -1;
            if (a.dateCreated < b.dateCreated) return 1;
            return null;
          })
          .map((thread, index) => (
            <ForumCard thread={thread} classes={classes} key={index} />
          ));
      } else {
        visibleThreads = <h4>No threads found in this section</h4>;
      }
    }

    if (this.state.newThreadFormActive) {
      newThreadForm = (
        <NewThreadForm
          classes={classes}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onExitClick={this.onExitClick}
          title={this.state.title}
          text={this.state.text}
          errors={errors}
          header={"New Thread"}
        />
      );
    }

    return (
      <div className={classes.page}>
        {errors === "Unauthorized" && (
          <div className="error-box" id="error-box">
            You must log in to create a new thread
          </div>
        )}
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
        <div className="forum-top-links">
          <div>
            <Link to={`/forum/`} className={classes.btnGray}>
              Go Back
            </Link>
            <span className={classes.headers}>{` /forum/${
              this.props.match.params.forumSection
            }`}</span>
          </div>
          <div>
            <button
              className={classes.btnBlue}
              onClick={this.createThreadClick}
            >
              New Thread
            </button>
          </div>
        </div>
        {visibleThreads}
        {newThreadForm} {/* New Thread Form*/}
      </div>
    );
  }
}

ForumSection.propTypes = {
  getClasses: PropTypes.func.isRequired,
  getForumThreads: PropTypes.func.isRequired,
  createNewThread: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classes: state.classes,
  threads: state.threads,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getClasses, getForumThreads, createNewThread, clearErrors }
)(withRouter(ForumSection));
