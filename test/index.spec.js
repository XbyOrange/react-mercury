const index = require("../src/index");

describe("index", () => {
  it("should export the connect method", () => {
    expect(index.connect).toBeDefined();
  });
});
