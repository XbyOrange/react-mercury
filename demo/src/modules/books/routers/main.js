import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { BooksListLayout, BooksDetailsLayout } from "../views/Layouts";

export const MainRouter = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={BooksListLayout} />
    <Route path={`${match.path}/:id`} component={BooksDetailsLayout} />
  </Switch>
);

MainRouter.propTypes = {
  match: PropTypes.any
};
