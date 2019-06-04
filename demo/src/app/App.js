import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { routes, sectionsAsArray } from "./routes";

import { baseApi } from "./config";

import { booksCollection } from "../data-sources/booksCollection";
import { booksModels } from "../data-sources/booksModels";

import "./app.css";

const dataSourcesConfig = {
  baseUrl: baseApi
};

booksCollection.config(dataSourcesConfig);
booksModels.config(dataSourcesConfig);

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
