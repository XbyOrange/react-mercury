import { Api } from "@xbyorange/mercury-api";

// COLLECTION pointing to a nonexistent endpoint

export const errorBooksCollection = new Api(`/foo-books`, {
  defaultValue: []
});
