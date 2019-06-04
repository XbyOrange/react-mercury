import { Api } from "@xbyorange/mercury-api";

import { booksCollection } from "./booksCollection";

// BOOKS MODEL

export const booksModels = new Api(`/books/:id`);

booksModels.addCustomQuery({
  byId: id => ({
    urlParams: {
      id
    }
  })
});

// RELATIONSHIP BETWEEN MODEL AND COLLECTION

booksModels.onChangeAny(changeDetails => {
  if (
    [booksModels.actions.delete.success, booksModels.actions.update.success].includes(
      changeDetails.action
    )
  ) {
    booksCollection.clean();
  }
});
