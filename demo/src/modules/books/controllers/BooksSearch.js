import { connect } from "@xbyorange/react-mercury";

import { booksSearchFilters, booksSearchByAuthorFilters } from "../../../data/books";
import { authorsCollection } from "../../../data/authors";

import { default as BooksSearchComponent } from "../../../components/books-search";
import { default as BooksSearchByAuthorComponent } from "../../../components/books-search-by-author";

export const mapDataSourceToProps = () => ({
  titleFilter: booksSearchFilters.query("title").read,
  yearFilter: booksSearchFilters.query("year").read,
  sortBy: booksSearchFilters.query("sortBy").read,
  updateFilters: booksSearchFilters.update
});

export const BooksSearch = connect(mapDataSourceToProps)(BooksSearchComponent);

export const mapDataSourceToPropsByAuthor = () => ({
  authors: authorsCollection.read,
  authorFilter: booksSearchByAuthorFilters.query("author").read,
  titleFilter: booksSearchByAuthorFilters.query("title").read,
  sortBy: booksSearchByAuthorFilters.query("sortBy").read,
  updateFilters: booksSearchByAuthorFilters.update
});

export const BooksSearchByAuthor = connect(mapDataSourceToPropsByAuthor)(
  BooksSearchByAuthorComponent
);
