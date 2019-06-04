import { connect } from "@xbyorange/react-mercury";

import { booksCollection, booksFilteredAndSorted } from "../../../data-sources/booksCollection";

import { BooksList as BooksListComponent } from "../../../components/books/BooksList";

export const mapDataSourceToProps = () => ({
  books: booksCollection.read
});

export const BooksList = connect(mapDataSourceToProps)(BooksListComponent);

export const mapDataSourceToPropsFiltered = props => ({
  books: booksFilteredAndSorted.titleContaining(props.titleFilter).sortBy(props.sortBy).read
});

export const BooksListFiltered = connect(mapDataSourceToPropsFiltered)(BooksListComponent);
