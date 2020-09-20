const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

// const updateItem = (items, updatedItem) => {
//   const index = items.findIndex((item) => item.id === updatedItem.id);

//   if (index === -1) {
//     return items;
//   }

//   return [
//     ...items.slice(0, index),
//     updatedItem,
//     ...items.slice(index + 1)
//   ];
// };

export {getRandomInteger, getRandomArrayElement};
