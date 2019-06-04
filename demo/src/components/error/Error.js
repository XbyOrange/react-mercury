import React from "react";
import PropTypes from "prop-types";

import "./error.css";

export const ErrorComponent = ({ message }) => <div className="error">Error: {message}</div>;

ErrorComponent.propTypes = {
  message: PropTypes.string
};
