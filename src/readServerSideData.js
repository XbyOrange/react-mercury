import { isArray } from "lodash";
import { getSourceId } from "./helpers";

const serverSideData = new Set();

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

export const addServerSideData = sources => {
  if (sources) {
    const sourcesToAdd = isArray(sources) ? sources : [sources];
    sourcesToAdd.forEach(source => {
      serverSideData.add(source);
    });
  }
};

export const readServerSideData = sources => {
  addServerSideData(sources);
  return Promise.all(Array.from(serverSideData).map(getSourceData)).then(resultsToObject);
};
