import { connect } from "@xbyorange/react-mercury";

import {
  booksCollection,
  booksFilteredAndSorted,
  authorsAndBooksFilteredAndSorted
} from "../../../data/books";

import { default as BooksListComponent } from "../../../components/books-list";

export const mapDataSourceToProps = () => ({
  books: booksCollection.read
});

export const BooksList = connect(mapDataSourceToProps)(BooksListComponent);

export const mapDataSourceToPropsFiltered = props => ({
  books: booksFilteredAndSorted
    .titleContaining(props.titleFilter)
    .year(props.yearFilter)
    .sortBy(props.sortBy).read
});

export const BooksListFiltered = connect(mapDataSourceToPropsFiltered)(BooksListComponent);

export const mapDataSourceToPropsFilteredByAuthor = props => ({
  books: authorsAndBooksFilteredAndSorted
    .author(props.authorFilter)
    .titleContaining(props.titleFilter)
    .sortBy(props.sortBy).read
});

export const BooksListFilteredByAuthor = connect(mapDataSourceToPropsFilteredByAuthor)(
  BooksListComponent
);
