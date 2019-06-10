import React from "react";
import PropTypes from "prop-types";

import Loading from "../loading";
import ErrorComponent from "../error";

export const BookDetails = ({ book }) => {
  const bookDetails = book.value || [];
  const bookLoading = book.loading;
  const bookError = book.error;

  const details = () => (
    <ul>
      <li> Id: {bookDetails.id}</li>
      <li> Title: {bookDetails.title}</li>
    </ul>
  );

  const loading = () => <Loading />;

  const error = () => <ErrorComponent message={bookError.message} />;

  const content = bookLoading ? loading() : bookError ? error() : details();

  return (
    <div className="component">
      <h3>Book details</h3>
      {content}
    </div>
  );
};

BookDetails.propTypes = {
  book: PropTypes.any
};
