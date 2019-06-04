import { connect } from "@xbyorange/react-mercury";

import { booksModels } from "../../../data-sources/booksModels";

import { UpdateBook as UpdateBookComponent } from "../../../components/books/UpdateBook";

export const mapDataSourceToProps = ({ id }) => {
  const bookToUpdate = booksModels.byId(id);
  return {
    book: bookToUpdate.read,
    updateBook: bookToUpdate.update
  };
};

export const UpdateBook = connect(mapDataSourceToProps)(UpdateBookComponent);
