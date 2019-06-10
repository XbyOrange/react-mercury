import { connect } from "@xbyorange/react-mercury";

import { booksModels } from "../../../data/books";

import { default as DeleteBookComponent } from "../../../components/delete-book";

export const mapDataSourceToProps = ({ id }) => {
  const dataSource = booksModels.byId(id).delete;
  const remove = () => {
    return dataSource.dispatch();
  };
  return {
    error: dataSource.getters.error,
    loading: dataSource.getters.loading,
    remove
  };
};

export const DeleteBook = connect(mapDataSourceToProps)(DeleteBookComponent);
