module.exports = {
  presets: ["react-app"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@xbyorange/react-mercury": "../dist/react-mercury.esm.js"
        }
      }
    ]
  ]
};
