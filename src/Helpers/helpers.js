const objectToArray = object => {
  const keys = Object.keys(object);
  const values = keys.map(key => object[key]);

  return {
    keys,
    values,
    getRandomFromObject: () => getRandomFromArray(values)
  };
};
const getRandomFromArray = array =>
  array[Math.floor(Math.random() * array.length)];
const percentTrue = percent => {
  return Math.random() <= percent / 100;
};
export { objectToArray, getRandomFromArray, percentTrue };
