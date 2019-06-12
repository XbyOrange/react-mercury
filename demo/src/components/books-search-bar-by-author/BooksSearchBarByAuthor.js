import React from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";

export class BooksSearchBarByAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState();

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleChange = debounce(this.handleChange, 300).bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.title !== this.props.title ||
      prevProps.author !== this.props.author ||
      prevProps.sortBy !== this.props.sortBy
    ) {
      this.setState(this.propsToState());
    }
  }

  propsToState() {
    return {
      title: this.props.title || "",
      author: this.props.author || "",
      sortBy: this.props.sortBy || "id"
    };
  }

  handleTitleChange(event) {
    this.setState({
      ...this.state,
      title: event.target.value
    });
    this.handleChange();
  }

  handleAuthorChange(event) {
    this.setState({
      ...this.state,
      author: event.target.value
    });
    this.handleChange();
  }

  handleSortChange(event) {
    this.setState({
      ...this.state,
      sortBy: event.target.value
    });
    this.handleChange();
  }

  handleChange() {
    this.props.onChange(this.state);
  }

  render() {
    return (
      <div className="component">
        By author
        <select onChange={this.handleAuthorChange} value={this.state.author}>
          <option value="" />
          {this.props.authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        By title <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
        Sort by
        <select onChange={this.handleSortChange} value={this.state.sortBy}>
          <option value="id">id</option>
          <option value="title">title</option>
          <option value="author">author</option>
        </select>
      </div>
    );
  }
}

BooksSearchBarByAuthor.defaultProps = {
  authors: [],
  title: "",
  author: "",
  sortBy: "id"
};

BooksSearchBarByAuthor.propTypes = {
  authors: PropTypes.array,
  onChange: PropTypes.func,
  title: PropTypes.string,
  author: PropTypes.string,
  sortBy: PropTypes.string
};
