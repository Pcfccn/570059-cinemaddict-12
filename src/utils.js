const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export {getRandomInteger, getRandomArrayElement};
