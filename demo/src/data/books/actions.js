import { booksModels } from "./origins/booksModels";
import { booksCollection } from "./origins/booksCollection";

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
