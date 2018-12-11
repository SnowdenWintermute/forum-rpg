import React, { Component } from "react";
import InputGroup from "../common/InputGroup";
import TextAreaGroup from "../common/TextAreaGroup";

class NewThreadForm extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={"new-thread-form-holder"}>
        <form
          onSubmit={this.props.onSubmit}
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
          <label htmlFor="title" className={classes.text + " form-label"}>
            Thread Title:
          </label>
          <InputGroup
            type="text"
            placeholder="Post title"
            name="title"
            value={this.props.title}
            onChange={this.props.onChange}
            error={this.props.errors.title}
          />
          <label htmlFor="text" className={classes.text + " form-label"}>
            Thread Body:
          </label>
          <TextAreaGroup
            type="text"
            placeholder="Post body"
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

export default NewThreadForm;
