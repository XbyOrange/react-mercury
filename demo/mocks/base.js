const { Feature } = require("@xbyorange/mocks-server");

const { getBooks, getBook, addBook, updateBook, deleteBook } = require("./fixtures/api/books");

const api = new Feature([getBooks, getBook, addBook, updateBook, deleteBook]);

module.exports = {
  api
};
