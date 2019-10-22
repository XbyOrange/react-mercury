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
      if (allResults.hasOwnProperty(result.id)) {
        console.warn(
          `Duplicated mercury id ${result.id} detected in server-side-data. Data may not be assigned properly to correspondent sources in client-side`
        );
      }
      allResults[result.id] = result.value;
      return allResults;
    }, {})
  );
};

export const readOnServerSide = sources => {
  if (sources) {
    const sourcesToAdd = Array.isArray(sources) ? sources : [sources];
    sourcesToAdd.forEach(source => {
      serverSideData.add(source);
    });
  }
};

export const addServerSideData = readOnServerSide;

export const readServerSide = sources => {
  readOnServerSide(sources);
  return Promise.all(Array.from(serverSideData).map(readSourceValue)).then(resultsToObject);
};

export const readServerSideData = readServerSide;

export const clearServerSide = () => {
  serverSideData.clear();
};
