import { connect } from "@xbyorange/react-mercury";

import { booksSearchFilters } from "../../../data/books";

import { default as BooksSearchComponent } from "../../../components/books-search";

export const mapDataSourceToProps = () => ({
  titleFilter: booksSearchFilters.query("title").read,
  yearFilter: booksSearchFilters.query("year").read,
  sortBy: booksSearchFilters.query("sortBy").read,
  updateFilters: booksSearchFilters.update
});

export const BooksSearch = connect(mapDataSourceToProps)(BooksSearchComponent);
