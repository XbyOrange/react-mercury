import { connect } from "@xbyorange/react-mercury";

import { booksCollection } from "../../../data-sources/booksCollection";

import { CreateBook as CreateBookComponent } from "../../../components/books/CreateBook";

export const mapDataSourceToProps = () => ({
  createBook: booksCollection.create
});

export const CreateBook = connect(mapDataSourceToProps)(CreateBookComponent);
