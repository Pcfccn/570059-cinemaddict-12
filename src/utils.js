import {renderPosition} from "./constants";

const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const createElement = (template) => {
  const divElement = document.createElement(`div`);
  divElement.innerHTML = template;
  return divElement.firstChild;
};

const renderTemplate = (container, element, place = renderPosition.BEFORE_END) => {
  container.insertAdjacentHTML(place, element);
};

const renderElement = (container, element, place = renderPosition.BEFORE_END) => {
  switch (place) {
    case renderPosition.BEFORE_END:
      container.append(element);
      break;
    case renderPosition.AFTER_BEGIN:
      container.prepand(element);
  }
};

export {getRandomInteger, getRandomArrayElement, createElement, renderTemplate, renderElement};
