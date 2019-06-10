import React from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";

export class BooksSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState();

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleChange = debounce(this.handleChange, 300).bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title || prevProps.sortBy !== this.props.sortBy) {
      this.setState(this.propsToState());
    }
  }

  propsToState() {
    return {
      title: this.props.title || "",
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
        By title <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
        Sort by
        <select onChange={this.handleSortChange} value={this.state.sortBy}>
          <option value="id">id</option>
          <option value="title">title</option>
        </select>
      </div>
    );
  }
}

BooksSearchBar.defaultProps = {
  title: "",
  sortBy: "id"
};

BooksSearchBar.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  sortBy: PropTypes.string
};
