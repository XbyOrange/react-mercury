import React from "react";
import PropTypes from "prop-types";

import { BooksList, BooksListFiltered } from "./views/BooksList";
import { BooksSearch } from "./views/BooksSearch";
import { BookDetails } from "./views/BookDetails";
import { UpdateBook } from "./views/UpdateBook";
import { CreateBook } from "./views/CreateBook";
import { DeleteBook } from "./views/DeleteBook";

export const BooksListLayout = ({ match }) => (
  <div className="component">
    <h2>Books</h2>
    <BooksList baseUrl={match.url} Delete={DeleteBook} />
    <CreateBook />
    <BooksSearch>
      <BooksListFiltered baseUrl={match.url} Delete={DeleteBook} />
    </BooksSearch>
  </div>
);

BooksListLayout.propTypes = {
  match: PropTypes.any
};

export const BooksDetailsLayout = ({ match }) => (
  <div className="component">
    <h2>Book</h2>
    <BookDetails id={match.params.id} />
    <UpdateBook id={match.params.id} />
  </div>
);

BooksDetailsLayout.propTypes = {
  match: PropTypes.any
};
