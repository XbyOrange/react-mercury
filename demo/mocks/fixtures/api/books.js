const books = new Set();

books.add({
  id: "3",
  title: "Don Quijote de la Mancha"
});

books.add({
  id: "1",
  title: "El viejo y el mar"
});

books.add({
  id: "2",
  title: "El rayo que no cesa"
});

const getBooks = {
  url: "/books",
  method: "GET",
  response: (req, res) => {
    res.status(200);
    if (req.query.title_containing) {
      res.send(
        Array.from(books).filter(book =>
          book.title.toLowerCase().includes(req.query.title_containing.toLowerCase())
        )
      );
    } else {
      res.send(Array.from(books));
    }
  }
};

const getBook = {
  url: "/books/:id",
  method: "GET",
  response: (req, res) => {
    let selectedBook = Array.from(books).find(book => book.id === req.params.id);
    if (selectedBook) {
      res.status(200);
      res.send(selectedBook);
    } else {
      res.status(404);
      res.send();
    }
  }
};

const addBook = {
  url: "/books",
  method: "POST",
  response: (req, res) => {
    const book = req.body;
    if (Array.from(books).find(book => book.id === req.body.id)) {
      res.status(409);
      res.send();
    } else if (!book.id || !book.title) {
      res.status(422);
      res.send();
    } else {
      books.add(req.body);
      res.status(201);
      res.send(null);
    }
  }
};

const updateBook = {
  url: "/books/:id",
  method: "PATCH",
  response: (req, res) => {
    const book = Array.from(books).find(book => book.id === req.body.id);
    if (!book) {
      res.status(404);
      res.send();
    } else if (!req.body.title) {
      res.status(422);
      res.send();
    } else {
      book.title = req.body.title;
      res.status(204);
      res.send(null);
    }
  }
};

const deleteBook = {
  url: "/books/:id",
  method: "DELETE",
  response: (req, res) => {
    const book = Array.from(books).find(book => book.id === req.params.id);
    if (!book) {
      res.status(404);
      res.send();
    } else {
      books.delete(book);
      res.status(204);
      res.send(null);
    }
  }
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
};
