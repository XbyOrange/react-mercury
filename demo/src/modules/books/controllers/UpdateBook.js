import { connect } from "@xbyorange/react-mercury";

import { booksModels } from "../../../data/books";

import { default as UpdateBookComponent } from "../../../components/update-book";

export const mapDataSourceToProps = ({ id }) => {
  const bookToUpdate = booksModels.byId(id);
  return {
    book: bookToUpdate.read,
    updateBook: bookToUpdate.update
  };
};

export const UpdateBook = connect(mapDataSourceToProps)(UpdateBookComponent);
