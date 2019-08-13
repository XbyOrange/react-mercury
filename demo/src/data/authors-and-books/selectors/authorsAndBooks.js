import { Selector } from "@xbyorange/mercury";
import { booksCollection } from "../../books";
import { authorsCollection, authorsBooksCollection } from "../../authors";

// Example of a Selector with concurrent accesses to different origins and selectors
export const authorsAndBooks = new Selector(
  [
    authorsCollection,
    {
      source: authorsBooksCollection,
      query: () => ({ queryString: { all: true } })
    },
    booksCollection
  ],
  results => {
    const authorsResults = results[0],
      authorsAndBooksResults = results[1],
      booksResults = results[2];

    const result = Object.keys(authorsAndBooksResults).map(authorId => {
      const author = authorsResults.find(currentAuthor => currentAuthor.id === authorId);
      const bookIds = authorsAndBooksResults[authorId];
      const books = [];
      bookIds.forEach(bookId => {
        const book = booksResults.find(currentBook => currentBook.id === bookId);
        if (book) {
          books.push(book);
        }
      });

      return {
        ...author,
        books
      };
    });

    return result;
  },
  []
);
