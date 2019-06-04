import { connect } from "@xbyorange/react-mercury";

import { booksSearchFilters } from "../../../data-sources/booksSearchFilters";

import { BooksSearch as BooksSearchComponent } from "../../../components/books/BooksSearch";

export const mapDataSourceToProps = () => ({
  titleFilter: booksSearchFilters.query("title").read,
  sortBy: booksSearchFilters.query("sortBy").read,
  updateFilters: booksSearchFilters.update
});

export const BooksSearch = connect(mapDataSourceToProps)(BooksSearchComponent);
