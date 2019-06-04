import React, { Component } from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import AxiosMock from "./Axios.mock.js";
import { Api } from "@xbyorange/mercury-api";
import { connect } from "../src/index";

import jsdom from "jsdom";
const { JSDOM } = jsdom;
const { document } = new JSDOM("<!doctype html><html><body></body></html>").window;
global.document = document;
global.window = document.defaultView;

Enzyme.configure({ adapter: new Adapter() });

let bookUpdate;

class BooksList extends Component {
  render() {
    bookUpdate = this.props.bookUpdate;
    const author = this.props.author;
    const booksList = this.props.books ? this.props.books.value : this.props.booksValue;
    const booksLoading = this.props.books ? this.props.books.loading : this.props.booksLoading;
    const booksError = this.props.books ? this.props.books.error : this.props.booksError;
    const bookUpdateLoading = this.props.bookUpdateLoading ? (
      <div className="updating">Updating</div>
    ) : null;

    const list = () => (
      <ul>
        {booksList.map(book => (
          <li key={book.id} className="book">
            {book.title}
          </li>
        ))}
      </ul>
    );

    const loading = () => <div className="loading">Loading</div>;

    const error = () => <div className="error">Error</div>;

    const content = booksLoading ? loading() : booksError ? error() : list();

    return (
      <div className="component">
        {bookUpdateLoading}
        <h1>Books list</h1>
        {content}
        <h2>{this.props.subtitle}</h2>
        <h3>Has been read: {this.props.read ? "yes" : "no"}</h3>
        <h4>{author}</h4>
      </div>
    );
  }
}

BooksList.propTypes = {
  author: PropTypes.string,
  booksValue: PropTypes.any,
  booksError: PropTypes.any,
  booksLoading: PropTypes.bool,
  bookUpdate: PropTypes.any,
  bookUpdateLoading: PropTypes.bool,
  books: PropTypes.any,
  read: PropTypes.bool,
  subtitle: PropTypes.any
};

describe("react connect plugin", () => {
  const fooBooks = [
    {
      id: 1,
      title: "El quijote",
      author: "Cervantes"
    },
    {
      id: 2,
      title: "El viejo y el mar",
      author: "Hemingway"
    }
  ];
  let books;
  let axios;

  beforeAll(() => {
    axios = new AxiosMock();
    books = new Api("/books", {
      defaultValue: []
    });
    books.client = axios._stub;
  });

  afterAll(() => {
    axios.restore();
  });

  beforeEach(() => {
    axios.stubs.instance.resetHistory();
    axios.stubs.instance.resolves({
      data: fooBooks
    });
  });

  it("mock component should render without error", () => {
    const wrapper = shallow(
      <BooksList
        books={{
          error: null,
          loading: false,
          value: []
        }}
      />
    );
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it("should pass source properties to component, and update value when finish loading", async () => {
    expect.assertions(2);
    const mapDataSourceToProps = () => ({
      books: books.read
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    books.read();
    wrapper.update();
    expect(wrapper.find(".loading").length).toEqual(1);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });

  it("should be able to pass string properties to component", async () => {
    expect.assertions(2);
    const mapDataSourceToProps = () => ({
      books: books.read,
      subtitle: "Foo subtitle"
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    wrapper.update();
    expect(wrapper.find("h2").text()).toEqual("Foo subtitle");
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });

  it("should be able to pass numeric properties to component", async () => {
    expect.assertions(2);
    const mapDataSourceToProps = () => ({
      books: books.read,
      subtitle: 5
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    wrapper.update();
    expect(wrapper.find("h2").text()).toEqual("5");
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });

  it("should be able to pass null properties to component", async () => {
    expect.assertions(2);
    const mapDataSourceToProps = () => ({
      books: books.read,
      subtitle: null
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    wrapper.update();
    expect(wrapper.find("h2").text()).toEqual("");
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });

  it("should be able to pass undefined properties to component", async () => {
    expect.assertions(2);
    const mapDataSourceToProps = () => ({
      books: books.read,
      subtitle: undefined
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    wrapper.update();
    expect(wrapper.find("h2").text()).toEqual("");
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });

  it("should be able to pass boolean properties to component", async () => {
    expect.assertions(2);
    const mapDataSourceToProps = () => ({
      books: books.read,
      read: true
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    wrapper.update();
    expect(wrapper.find("h3").text()).toEqual("Has been read: yes");
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });

  it("should read source again when it is cleaned", async () => {
    expect.assertions(3);
    const mapDataSourceToProps = () => ({
      books: books.read
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    books.clean();
    wrapper.update();
    expect(wrapper.find(".loading").length).toEqual(1);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });

  it("should read source when read getters are passed", async () => {
    expect.assertions(3);
    books.clean();
    const mapDataSourceToProps = () => ({
      booksValue: books.read.getters.value,
      booksLoading: books.read.getters.loading,
      booksError: books.read.getters.error
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    books.clean();
    wrapper.update();
    expect(wrapper.find(".loading").length).toEqual(1);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });

  it("should catch source errors when getters are passed", async () => {
    expect.assertions(4);
    books.clean();
    axios.stubs.instance.rejects(new Error());
    const mapDataSourceToProps = () => ({
      booksValue: books.read.getters.value,
      booksLoading: books.read.getters.loading,
      booksError: books.read.getters.error
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    wrapper.update();
    expect(wrapper.find(".loading").length).toEqual(1);
    return new Promise(resolve => {
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find(".loading").length).toEqual(0);
        expect(wrapper.find(".error").length).toEqual(1);
        expect(wrapper.find("li.book").length).toEqual(0);
        wrapper.unmount();
        resolve();
      }, 200);
    });
  });

  it("should not be listening to events after it is unmounted", async () => {
    expect.assertions(2);
    const mapDataSourceToProps = () => ({
      books: books.read
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
    books.clean();
    expect(Object.keys(books._cache._cachedData).length).toEqual(0);
  });

  it("should be able to query source with component props", async () => {
    expect.assertions(2);
    const mapDataSourceToProps = ({ author }) => ({
      books: books.query({
        queryString: {
          author
        }
      }).read
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks author="cervantes" />);
    return new Promise(resolve => {
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find("li.book").length).toEqual(2);
        expect(axios.stubs.instance.getCall(0).args[0].url).toEqual("/books?author=cervantes");
        wrapper.unmount();
        books.clean();
        resolve();
      }, 200);
    });
  });

  it("should read source again if component props change", async () => {
    expect.assertions(6);
    const mapDataSourceToProps = ({ author }) => ({
      books: books.query({
        queryString: {
          author
        }
      }).read
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks author="wells" />);
    return new Promise(resolve => {
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find("li.book").length).toEqual(2);
        expect(axios.stubs.instance.getCall(0).args[0].url).toEqual("/books?author=wells");
        expect(wrapper.find("h4").text()).toEqual("wells");
        wrapper.setProps({
          author: "hemingway"
        });
        setTimeout(() => {
          expect(wrapper.find("h4").text()).toEqual("hemingway");
          expect(wrapper.find("li.book").length).toEqual(2);
          expect(axios.stubs.instance.getCall(1).args[0].url).toEqual("/books?author=hemingway");
          wrapper.unmount();
          books.clean();
          resolve();
        }, 200);
      }, 1000);
    });
  });

  it("should be able to redefine props in mapDataSourceToProps function", async () => {
    expect.assertions(6);
    const mapDataSourceToProps = ({ author }) => ({
      books: books.query({
        queryString: {
          author
        }
      }).read,
      author: "foo"
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks author="miller" />);
    return new Promise(resolve => {
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find("li.book").length).toEqual(2);
        expect(axios.stubs.instance.getCall(0).args[0].url).toEqual("/books?author=miller");
        expect(wrapper.find("h4").text()).toEqual("foo");
        wrapper.setProps({
          author: "quevedo"
        });
        setTimeout(() => {
          expect(wrapper.find("h4").text()).toEqual("foo");
          expect(wrapper.find("li.book").length).toEqual(2);
          expect(axios.stubs.instance.getCall(1).args[0].url).toEqual("/books?author=quevedo");
          wrapper.unmount();
          books.clean();
          resolve();
        }, 200);
      }, 200);
    });
  });

  it("should set specific properties for each different source method", async () => {
    expect.assertions(4);
    const mapDataSourceToProps = () => ({
      books: books.read,
      bookUpdateLoading: books.update.getters.loading,
      booksUpdate: books.update.getters.dispatch
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    expect(wrapper.find(".updating").length).toEqual(0);
    books.update();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    expect(wrapper.find(".updating").length).toEqual(1);

    wrapper.unmount();
  });

  it("should parse props if second function is passed to connector", async () => {
    expect.assertions(4);
    books.read.value = [];
    books.clean();
    const mapDataSourceToProps = () => ({
      books: books.read,
      bookUpdateLoading: books.update.getters.loading,
      booksUpdate: books.update.getters.dispatch
    });
    const ConnectedBooks = connect(
      mapDataSourceToProps,
      props => {
        return {
          ...props,
          books:
            props.books && props.books.value && props.books.value.length > 0
              ? props.books
              : {
                  value: [
                    {
                      id: 1,
                      title: "Foo",
                      author: "Foo author"
                    }
                  ],
                  loading: false,
                  error: null
                },
          bookUpdateLoading: false
        };
      }
    )(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(1);
    expect(wrapper.find(".updating").length).toEqual(0);
    books.update();
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    expect(wrapper.find(".updating").length).toEqual(0);

    wrapper.unmount();
  });

  it("should catch errors when dispatching source actions", done => {
    expect.assertions(2);
    axios.stubs.instance.rejects(new Error());
    const mapDataSourceToProps = () => ({
      books: books.read,
      bookUpdateLoading: books.update.getters.loading,
      bookUpdate: books.update
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    bookUpdate.dispatch();
    wrapper.update();
    expect(wrapper.find(".updating").length).toEqual(1);
    return new Promise(resolve => {
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find(".updating").length).toEqual(0);
        wrapper.unmount();
        resolve();
        done();
      }, 200);
    });
  });

  it("should assign error property when an error is returned after cleaning a source", async () => {
    expect.assertions(3);
    books.clean();
    const mapDataSourceToProps = () => ({
      books: books.read,
      bookUpdate: books.update.getters.dispatch
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    axios.stubs.instance.rejects(new Error());
    books.clean();
    try {
      await books.read();
    } catch (err) {}
    wrapper.update();
    expect(wrapper.find(".error").length).toEqual(1);
    expect(wrapper.find("li.book").length).toEqual(0);
    wrapper.unmount();
  });

  it("should not try to update state after component is unmounted", async () => {
    expect.assertions(2);
    books.clean();
    const mapDataSourceToProps = () => ({
      books: books.read,
      bookUpdate: books.update.getters.dispatch
    });
    const ConnectedBooks = connect(mapDataSourceToProps)(BooksList);

    const wrapper = mount(<ConnectedBooks />);
    await books.read();
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.instance()._unmounted = true;
    books.clean();
    try {
      await books.read();
    } catch (err) {}
    wrapper.update();
    expect(wrapper.find("li.book").length).toEqual(2);
    wrapper.unmount();
  });
});
