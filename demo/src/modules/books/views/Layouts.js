import React from "react";
import PropTypes from "prop-types";

import { BooksList, BooksListFiltered, BooksListFilteredByAuthor } from "../controllers/BooksList";
import { BooksSearch, BooksSearchByAuthor } from "../controllers/BooksSearch";
import { BookDetails } from "../controllers/BookDetails";
import { UpdateBook } from "../controllers/UpdateBook";
import { CreateBook } from "../controllers/CreateBook";
import { DeleteBook } from "../controllers/DeleteBook";
import { DeviceData } from "../controllers/DeviceData";
import { AuthorsAndBooks, AuthorsAndBooksErrorManagement } from "../controllers/AuthorsAndBooks";
import { idGenerator } from "../../../helpers/id-generator";

export const BooksListLayout = ({ match }) => (
  <div className="component">
    <h2>Books</h2>
    <BooksList baseUrl={match.url} Delete={DeleteBook} />
    <CreateBook id={idGenerator()} />
    <BooksSearch>
      <BooksListFiltered baseUrl={match.url} Delete={DeleteBook} />
    </BooksSearch>
    <BooksSearchByAuthor>
      <BooksListFilteredByAuthor baseUrl={match.url} Delete={DeleteBook} />
    </BooksSearchByAuthor>
    <DeviceData />
    <AuthorsAndBooks />
    <AuthorsAndBooksErrorManagement />
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
