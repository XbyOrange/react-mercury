import React from "react";
import PropTypes from "prop-types";

import ErrorComponent from "../error";

export class CreateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || "",
      title: "",
      year: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleIdChange(event) {
    this.setState({
      ...this.state,
      id: event.target.value
    });
  }

  handleTitleChange(event) {
    this.setState({
      ...this.state,
      title: event.target.value
    });
  }

  handleYearChange(event) {
    this.setState({
      ...this.state,
      year: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.createBook.dispatch(this.state);
    event.preventDefault();
  }

  render() {
    const error = this.props.createBook.error ? (
      <ErrorComponent message={this.props.createBook.error.message} />
    ) : null;
    const button = this.props.createBook.loading ? (
      <button disabled>...</button>
    ) : (
      <input type="submit" value="Submit" />
    );
    return (
      <div className="component">
        <h3> Create book </h3>
        <form onSubmit={this.handleSubmit}>
          {error}
          <div>
            <label>
              Id:
              <input type="text" value={this.state.id} onChange={this.handleIdChange} />
            </label>
          </div>
          <div>
            <label>
              Title:
              <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
            </label>
          </div>
          <div>
            <label>
              Year:
              <input type="text" value={this.state.year} onChange={this.handleYearChange} />
            </label>
          </div>
          {button}
        </form>
      </div>
    );
  }
}

CreateBook.propTypes = {
  createBook: PropTypes.any,
  id: PropTypes.string
};
