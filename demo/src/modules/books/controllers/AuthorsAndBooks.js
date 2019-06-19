import { connect } from "@xbyorange/react-mercury";

import { authorsAndBooks } from "../../../data/authors-and-books";
import { authorsAndBooksErrored } from "../../../data/authors-and-books-errored";

import { default as AuthorsAndBooksComponent } from "../../../components/authors-and-books-list";

export const mapDataSourceToProps = () => ({
  authorAndBooks: authorsAndBooks.read
});

export const AuthorsAndBooks = connect(mapDataSourceToProps)(AuthorsAndBooksComponent);

export const mapDataSourceToPropsErrored = () => ({
  authorAndBooks: authorsAndBooksErrored.read
});

export const AuthorsAndBooksErrorManagement = connect(mapDataSourceToPropsErrored)(
  AuthorsAndBooksComponent
);
