import React from "react";
import PropTypes from "prop-types";

import BooksSearchBarByAuthor from "../books-search-bar-by-author";

export class BooksSearchByAuthor extends React.Component {
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
      prevProps.authorFilter !== this.props.authorFilter ||
      prevProps.sortBy !== this.props.sortBy
    ) {
      this.setState({
        booksLists: this.childsWithTitleFilter(
          this.props.titleFilter.value,
          this.props.authorFilter.value,
          this.props.sortBy.value
        )
      });
    }
  }

  childsWithTitleFilter(titleFilter, authorFilter, sortBy) {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { titleFilter, authorFilter, sortBy })
    );
  }

  handleSearchChange({ title, author, sortBy }) {
    this.props.updateFilters.dispatch({
      title,
      author,
      sortBy
    });
  }

  render() {
    return (
      <div className="component">
        <h3>Books search by author</h3>
        <BooksSearchBarByAuthor
          title={this.props.titleFilter.value}
          author={this.props.authorFilter.value}
          sortBy={this.props.sortBy.value}
          authors={this.props.authors.value}
          onChange={this.handleSearchChange}
        />
        {this.state.booksLists}
      </div>
    );
  }
}

BooksSearchByAuthor.defaultProps = {
  authors: [],
  titleFilter: {},
  authorFilter: {},
  sortBy: {}
};

BooksSearchByAuthor.propTypes = {
  authors: PropTypes.any,
  titleFilter: PropTypes.any,
  authorFilter: PropTypes.any,
  sortBy: PropTypes.any,
  updateFilters: PropTypes.object,
  children: PropTypes.node
};
