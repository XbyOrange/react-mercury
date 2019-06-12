import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { routes, sectionsAsArray } from "./Router";

import { baseApi } from "./config";

import { booksCollection, booksModels } from "../data/books";
import { authorsCollection, authorsBooksCollection } from "../data/authors";

import "./app.css";

const dataSourcesConfig = {
  baseUrl: baseApi
};

// TODO: REFACTOR THIS!
booksCollection.config(dataSourcesConfig);
booksModels.config(dataSourcesConfig);
authorsCollection.config(dataSourcesConfig);
authorsBooksCollection.config(dataSourcesConfig);

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter basename={routes.index.route}>
          <Switch>
            <Redirect exact from={routes.index.route} to={routes.index.redirectTo} />
            {sectionsAsArray.map(section => (
              <Route key={section.route} path={section.route} component={section.component} />
            ))}
            <Route component={routes.notFound.component} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
