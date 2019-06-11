import { sortBy } from "lodash";
import { Selector } from "@xbyorange/mercury";
import { booksCollection, titleContainingFilter } from "../origins/booksCollection";

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
      booksResults = booksResults.filter((book) => {
        return book.year.startsWith(year);
      });
    }

    return sortBy(booksResults, (filter && filter.sortBy) || "id");
  },
  []
);

// Custom filters are optional, but improve the interface
booksFilteredAndSorted.addCustomQuery({
  sortBy: sortBy => ({ sortBy })
});

booksFilteredAndSorted.addCustomQuery({
  titleContaining: titleContaining => ({ titleContaining }),
  year: year => ({ year })
});
