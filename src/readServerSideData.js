const serverSideData = new Set();

const readSourceValue = source => {
  return source.read().then(value => {
    return Promise.resolve({
      id: source._id,
      value
    });
  });
};

const resultsToObject = results => {
  return Promise.resolve(
    results.reduce((allResults, result) => {
      allResults[result.id] = result.value;
      return allResults;
    }, {})
  );
};

export const addServerSideData = sources => {
  if (sources) {
    const sourcesToAdd = Array.isArray(sources) ? sources : [sources];
    sourcesToAdd.forEach(source => {
      serverSideData.add(source);
    });
  }
};

export const readServerSideData = sources => {
  addServerSideData(sources);
  return Promise.all(Array.from(serverSideData).map(readSourceValue)).then(resultsToObject);
};
