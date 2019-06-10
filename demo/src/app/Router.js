import NotFound from "../components/not-found";
import { default as BooksRouter } from "../modules/books";

export const routes = {
  index: {
    route: "/",
    redirectTo: "/books"
  },
  notFound: {
    component: NotFound
  }
};

export const sections = {
  books: {
    name: "Books",
    route: "/books",
    component: BooksRouter
  }
};

export const index = routes.index;

export const defaultSection = sections.books.route;

export const sectionsAsArray = Object.values(sections);
