import React from "react";
import PropTypes from "prop-types";

export class AuthorsAndBooks extends React.Component {
  list(authorAndBooks) {
    return (
      <ul>
        {authorAndBooks.map(author => (
          <li key={author.id}>
            {author.name}
            <ul>
              {author.books.map(book => (
                <li key={book.id}>
                  {book.title} ({book.year})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const loading = this.props.authorAndBooks.loading,
      authorAndBooks = this.props.authorAndBooks.value;

    return (
      <div className="component">
        <h3>Authors and Books list</h3>
        {loading ? "Loading..." : this.list(authorAndBooks)}
      </div>
    );
  }
}

AuthorsAndBooks.defaultProps = {
  authorAndBooks: {}
};

AuthorsAndBooks.propTypes = {
  authorAndBooks: PropTypes.object
};
