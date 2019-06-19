import React from "react";
import PropTypes from "prop-types";
import Loading from "../loading";
import ErrorComponent from "../error";

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
    const { loading, error, value } = this.props.authorAndBooks;
    return (
      <div className="component">
        <h3>Authors and Books list</h3>
        {loading ? <Loading /> : error ? <ErrorComponent message={error.message} /> : this.list(value)}
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
