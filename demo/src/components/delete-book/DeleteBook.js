import React from "react";
import PropTypes from "prop-types";

export const DeleteBook = ({ error, loading, remove }) => {
  if (loading) {
    return <button>...</button>;
  }

  return (
    <span>
      <button onClick={() => remove()}>delete</button>
      {(error && error.message) || ""}
    </span>
  );
};

DeleteBook.propTypes = {
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool,
  remove: PropTypes.func
};
