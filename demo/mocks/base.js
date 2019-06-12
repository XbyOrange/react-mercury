const { Feature } = require("@xbyorange/mocks-server");

const { getBooks, getBook, addBook, updateBook, deleteBook } = require("./fixtures/api/books");
const { getAuthors } = require("./fixtures/api/authors");
const { getAuthorBooks } = require("./fixtures/api/author-books");

const api = new Feature([getBooks, getBook, addBook, updateBook, deleteBook, getAuthors, getAuthorBooks]);

module.exports = {
  api
};
