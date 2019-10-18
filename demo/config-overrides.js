//const path = require("path");

module.exports = function override(config /*, env*/) {
  let eslintRuleIndex;
  config.module.rules.forEach((rule, ruleIndex) => {
    if (rule.use && Array.isArray(rule.use)) {
      rule.use.forEach(loaderDetails => {
        if (loaderDetails.loader.indexOf("eslint-loader") > -1) {
          eslintRuleIndex = ruleIndex;
        }
      });
    }
  });
  if (eslintRuleIndex) {
    config.module.rules.splice(eslintRuleIndex, 1);
  }
  config.module.rules.unshift({
    test: /\.(js|jsx|mjs)$/,
    include: /src/,
    loader: require.resolve("babel-loader"),
    options: {
      plugins: [
        [
          "module-resolver",
          {
            root: ["."],
            alias: {
              "@xbyorange/react-mercury": "./src/react-mercury/react-mercury.esm.js"
            }
          }
        ]
      ],
      cacheDirectory: true
    }
  });

  return config;
};
