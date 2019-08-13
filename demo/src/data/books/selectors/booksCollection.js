import { sortBy } from "lodash";
import { Selector } from "@xbyorange/mercury";
import { booksCollection, titleContainingFilter } from "../origins/booksCollection";
import { authorsBooksCollection } from "../../authors";

// SELECTORS

export const booksFiltered = new Selector(
  {
    source: booksCollection,
    query: titleContainingFilter
  },
  booksResults => booksResults,
  []
);

// Example of a Selector with a filter being sent to the server, another filter resolved locally by client and sortering locally
export const booksFilteredAndSorted = new Selector(
  {
    source: booksFiltered,
    query: query => query && query.titleContaining
  },
  (booksResults, filter) => {
    const { year } = filter;

    // year query property is not sent to server, the books results are filtered by client
    if (year) {
      booksResults = booksResults.filter(book => {
        return book.year.startsWith(year);
      });
    }

    return sortBy(booksResults, (filter && filter.sortBy) || "id");
  },
  []
);

// Custom filters are optional, but improve the interface
booksFilteredAndSorted.addCustomQuery({
  sortBy: sortedBy => ({ sortBy: sortedBy })
});

booksFilteredAndSorted.addCustomQuery({
  titleContaining: titleContaining => ({ titleContaining }),
  year: year => ({ year })
});

// Example of a Selector with nested queries, every level depends on previous origin data
export const authorsAndBooksFilteredAndSorted = new Selector(
  {
    source: authorsBooksCollection,
    query: query => {
      if (query && query.author) {
        return {
          queryString: {
            authorId: query.author
          }
        };
      }
    }
  },
  {
    source: booksCollection,
    query: (query, previousResults) => {
      if (previousResults && previousResults.length > 0) {
        return {
          queryString: {
            bookIds: previousResults
          }
        };
      }
    }
  },
  (query, booksResults, filter) => {
    const { titleContaining } = filter;

    // title query property is not sent to server, the books results are filtered by client
    if (titleContaining) {
      booksResults = booksResults.filter(book => {
        return book.title.toLowerCase().includes(titleContaining.toLowerCase());
      });
    }

    return sortBy(booksResults, (filter && filter.sortBy) || "id");
  },
  []
);

// Custom filters are optional, but improve the interface
authorsAndBooksFilteredAndSorted.addCustomQuery({
  sortBy: sortedBy => ({ sortedBy })
});

authorsAndBooksFilteredAndSorted.addCustomQuery({
  author: author => ({ author }),
  titleContaining: titleContaining => ({ titleContaining })
});
