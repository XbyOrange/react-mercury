import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Loading } from "../loading/Loading";
import { ErrorComponent } from "../error/Error";

export const BooksList = ({ books, baseUrl, Delete }) => {
  const booksList = books.value;
  const booksLoading = books.loading;
  const booksError = books.error;

  const list = () => (
    <ul>
      {booksList.map(book => (
        <li key={book.id}>
          <Link to={`${baseUrl}/${book.id}`}>{book.title}</Link> <Delete id={book.id} />
        </li>
      ))}
    </ul>
  );

  const loading = () => <Loading />;

  const error = () => <ErrorComponent message={booksError.message} />;

  const content = booksLoading ? loading() : booksError ? error() : list();

  return (
    <div className="component">
      <h3>Books list</h3>
      {content}
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.array,
  baseUrl: PropTypes.string,
  Delete: PropTypes.func
};
