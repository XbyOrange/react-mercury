import { Api } from "@xbyorange/mercury-api";

// BOOKS MODEL

export const booksModels = new Api(`/books/:id`);

booksModels.addCustomQuery({
  byId: id => ({
    urlParams: {
      id
    }
  })
});
