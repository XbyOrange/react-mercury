const { Feature } = require("@xbyorange/mocks-server");

const { getBooks, getBook, addBook, updateBook, deleteBook } = require("./fixtures/api/books");
const { getAuthors } = require("./fixtures/api/authors");
const { getAuthorBooks } = require("./fixtures/api/author-books");
const { getMobileData, getDesktopData } = require("./fixtures/api/mobile-desktop");

const api = new Feature([getBooks, getBook, addBook, updateBook, deleteBook, getAuthors, getAuthorBooks, getMobileData, getDesktopData]);

module.exports = {
  api
};
