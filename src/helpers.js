export const getSourceId = source => {
  if (source._root && source._root.test && source._root.test.selector) {
    return `${source._root.test.selector.toString()}-${source._id}`;
  }
  return source._id;
};
