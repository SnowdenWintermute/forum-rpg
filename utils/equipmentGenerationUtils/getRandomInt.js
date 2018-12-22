module.exports = getRandomInt = (min, max) => { // Generate int in range
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
