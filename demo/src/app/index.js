import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { routes, sectionsAsArray } from "./Router";

import { baseApi } from "./config/config";

import { apis } from "@xbyorange/mercury-api";

import "./app.css";

/////////////TESTING
//import { connect } from "react-redux";
//import * as x from "@xbyorange/mercury";
//import * as x from "@xbyorange/react-mercury";
//import * as x from "@nex/data-layer";
/////////////TESTING

apis.config({
  baseUrl: baseApi
});

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
