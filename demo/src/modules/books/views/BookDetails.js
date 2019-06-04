import { connect } from "@xbyorange/react-mercury";

import { booksModels } from "../../../data-sources/booksModels";

import { BookDetails as BookDetailsComponent } from "../../../components/books/BookDetails";

export const mapDataSourceToProps = ({ id }) => ({
  book: booksModels.byId(id).read
});

export const BookDetails = connect(mapDataSourceToProps)(BookDetailsComponent);
