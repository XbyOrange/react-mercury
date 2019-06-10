import { connect } from "@xbyorange/react-mercury";

import { booksModels } from "../../../data/books";

import { default as BookDetailsComponent } from "../../../components/book-details";

export const mapDataSourceToProps = ({ id }) => ({
  book: booksModels.byId(id).read
});

export const BookDetails = connect(mapDataSourceToProps)(BookDetailsComponent);
