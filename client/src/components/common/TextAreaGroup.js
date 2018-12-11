import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaGroup = ({ name, placeholder, value, error, type, onChange }) => {
  return (
    <React.Fragment>
      <textarea
        className={classnames("input-field text-area-input", {
          "input-field text-input-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <div className="error-text">{error}</div>}
    </React.Fragment>
  );
};

TextAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextAreaGroup.defaultProps = {
  type: "text"
};

export default TextAreaGroup;
