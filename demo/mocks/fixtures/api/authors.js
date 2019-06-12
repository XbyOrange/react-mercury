const authors = new Set();

authors.add({
    id: "1",
    name: "Miguel de Cervantes"
});

authors.add({
    id: "2",
    name: "Ernest Hemingway"
});

authors.add({
    id: "3",
    name: "Miguel Hernández"
});

authors.add({
    id: "4",
    name: "Don Juan Manuel"
});

const getAuthors = {
  url: "/authors",
  method: "GET",
  response: (req, res) => {
    res.status(200);
    res.send(Array.from(authors));
  }
};

module.exports = {
  getAuthors
};
