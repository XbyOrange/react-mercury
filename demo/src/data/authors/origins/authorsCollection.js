import { Api } from "@xbyorange/mercury-api";

// AUTHORS COLLECTION

export const authorsCollection = new Api(`/authors`, {
  defaultValue: []
});

export const authorsBooksCollection = new Api(`/authorbooks`, {
  defaultValue: []
});
