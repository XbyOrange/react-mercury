import React from "react";
import PropTypes from "prop-types";

import BooksSearchBar from "../books-search-bar";

export class BooksSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksLists: null
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.titleFilter !== this.props.titleFilter ||
      prevProps.sortBy !== this.props.sortBy
    ) {
      this.setState({
        booksLists: this.childsWithTitleFilter(
          this.props.titleFilter.value,
          this.props.sortBy.value
        )
      });
    }
  }

  childsWithTitleFilter(titleFilter, sortBy) {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { titleFilter, sortBy })
    );
  }

  handleSearchChange({ title, sortBy }) {
    this.props.updateFilters.dispatch({
      title,
      sortBy
    });
  }

  render() {
    return (
      <div className="component">
        <h3>Books search</h3>
        <BooksSearchBar
          title={this.props.titleFilter.value}
          sortBy={this.props.sortBy.value}
          onChange={this.handleSearchChange}
        />
        {this.state.booksLists}
      </div>
    );
  }
}

BooksSearch.defaultProps = {
  titleFilter: {},
  sortBy: {}
};

BooksSearch.propTypes = {
  titleFilter: PropTypes.any,
  sortBy: PropTypes.any,
  updateFilters: PropTypes.func,
  children: PropTypes.node
};
