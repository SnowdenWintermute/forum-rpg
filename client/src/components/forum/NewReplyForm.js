import React, { Component } from "react";
import TextAreaGroup from "../common/TextAreaGroup";

class NewReplyForm extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={"new-thread-form-holder"}>
        <form
          onSubmit={this.props.onSubmitReply}
          className={classes.form + " new-thread-form"}
        >
          <button
            onClick={this.props.onExitClick}
            className={classes.xButton}
            type="button"
          >
            X
          </button>
          <h3 className={classes.headers}>{this.props.header}</h3>
          <label htmlFor="text" className={classes.text + " form-label"}>
            Thread Body:
          </label>
          <TextAreaGroup
            type="text"
            placeholder="Reply"
            name="text"
            value={this.props.text}
            onChange={this.props.onChange}
            error={this.props.errors.text}
          />
          <button className={classes.btnBlue} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewReplyForm;
