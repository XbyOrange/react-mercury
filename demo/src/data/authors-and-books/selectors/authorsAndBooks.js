import { Selector } from "@xbyorange/mercury";
import { booksCollection } from "../../books";
import { authorsCollection, authorsBooksCollection } from "../../authors";

// Example of a Selector with concurrent accesses to different origins and selectors
export const authorsAndBooksFilteredAndSorted = new Selector(
  authorsCollection,
  {
    source: authorsBooksCollection,
    query: () => ({ queryString: { all: true } })
  },
  booksCollection,
  (authorsResults, authorsAndBooksResults, booksResults) => {
    const result = Object.keys(authorsAndBooksResults).map(authorId => {
      const author = authorsResults.find(author => author.id === authorId);
      const bookIds = authorsAndBooksResults[authorId];
      const books = [];
      bookIds.forEach(bookId => {
        const book = booksResults.find(book => book.id === bookId);
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
