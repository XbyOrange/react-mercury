import { connect } from "@xbyorange/react-mercury";

import { authorsAndBooksFilteredAndSorted } from "../../../data/authors-and-books";

import { default as AuthorsAndBooksComponent } from "../../../components/authors-and-books-list";

export const mapDataSourceToProps = () => ({
  authorAndBooks: authorsAndBooksFilteredAndSorted.read
});

export const AuthorsAndBooks = connect(mapDataSourceToProps)(AuthorsAndBooksComponent);
