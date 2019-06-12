const booksByAuthor = {
  "1": ["3"],
  "2": ["1"],
  "3": ["2"],
  "4": ["4"]
};

const getAuthorBooks = {
  url: "/authorbooks",
  method: "GET",
  response: (req, res) => {
    const authorId = req.query.authorId;

    let bookIds;
    if (authorId) {
      bookIds = booksByAuthor[authorId];
    } else {
      bookIds = Object.values(booksByAuthor).reduce((acc, values) => {
        return acc.concat(values);
      }, []);
    }

    res.status(200);
    res.send(bookIds);
  }
};

module.exports = {
  getAuthorBooks
};