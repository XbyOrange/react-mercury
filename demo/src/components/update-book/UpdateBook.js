import React from "react";
import PropTypes from "prop-types";

import Loading from "../loading";
import ErrorComponent from "../error";

export class UpdateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      year: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleYearChange(event) {
    this.setState({
      year: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.updateBook.dispatch({
      id: this.props.book.value.id,
      title: this.state.title || this.props.book.value.title,
      year: this.state.year || this.props.book.value.year
    });
    event.preventDefault();
  }

  render() {
    const readLoading = this.props.book.loading ? <Loading /> : null;
    const readError = this.props.book.error ? (
      <ErrorComponent message={this.props.book.error.message} />
    ) : null;
    const updateError = this.props.updateBook.error ? (
      <ErrorComponent message={this.props.updateBook.error.message} />
    ) : null;
    const button = this.props.updateBook.loading ? (
      <button disabled>...</button>
    ) : (
      <input type="submit" value="Submit" />
    );

    const form = (
      <form onSubmit={this.handleSubmit}>
        {updateError}
        <div>
          <label>
            Title:
            <input
              type="text"
              value={
                this.state.title || ((this.props.book.value && this.props.book.value.title) || "")
              }
              onChange={this.handleTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Year:
            <input
              type="text"
              value={
                this.state.year || ((this.props.book.value && this.props.book.value.year) || "")
              }
              onChange={this.handleYearChange}
            />
          </label>
        </div>
        {button}
      </form>
    );

    const content = readError || readLoading || form;

    return (
      <div className="component">
        <h3> Update book </h3>
        {content}
      </div>
    );
  }
}

UpdateBook.propTypes = {
  updateBook: PropTypes.any,
  book: PropTypes.any
};
