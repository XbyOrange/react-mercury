const dataMobile = [
  ["mobile data 1", "mobile data 2"],
  ["mobile data 3", "mobile data 4"],
  ["mobile data 5", "mobile data 6"]
];

const dataDesktop = [
  ["desktop data 1", "desktop data 2", "desktop data 3", "desktop data 4"],
  ["desktop data 5", "desktop data 6", "desktop data 7", "desktop data 8"],
  ["desktop data 9", "desktop data 10", "desktop data 11", "desktop data 12"]
];

const getMobileData = {
  url: "/datamobile",
  method: "GET",
  response: (req, res) => {
    res.status(200);
    res.send(dataMobile);
  }
};

const getDesktopData = {
  url: "/datadesktop",
  method: "GET",
  response: (req, res) => {
    res.status(200);
    res.send(dataDesktop);
  }
};

module.exports = {
  getMobileData,
  getDesktopData
};
