export function flattenData(data) {
  return Object.keys(data).reduce((acc, key) => {
    return {
      ...acc,
      ...data[key]
    };
  }, {});
}