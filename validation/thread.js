const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateThreadInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  let sections = ["general-discussion", "gaming", "roleplaying", "fine-art"];
  let validSection = () => {
    for (section of sections) {
      if (data.forumSection === section) return true;
    }
    return false;
  };

  if (!validSection()) {
    errors.section = "There is no such forum section";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
