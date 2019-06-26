import { Selector } from "@xbyorange/mercury";
import { errorBooksCollection } from "../origins/error";
import { authorsAndBooks } from "../../authors-and-books";

// Example of a Selector that tries to fetch data from an errored origin and then it handles the error returning another valid selector
export const authorsAndBooksErrored = new Selector(
  {
    source: errorBooksCollection,
    query: query => query,
    catch: () => {
      // error is catched and a valid selector is returned as result
      return authorsAndBooks;
    }
  },
  booksResults => booksResults,
  []
);
