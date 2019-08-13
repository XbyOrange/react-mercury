import { getSourceId } from "./helpers";

const getSourceData = source => {
  return source.read().then(result => {
    return Promise.resolve({
      id: getSourceId(source),
      result
    });
  });
};

const resultsToObject = results => {
  return Promise.resolve(
    results.reduce((allResults, result) => {
      allResults[result.id] = result.result;
      return allResults;
    }, {})
  );
};

export const readServerSideData = (...args) =>
  Promise.all(args.map(getSourceData)).then(resultsToObject);
