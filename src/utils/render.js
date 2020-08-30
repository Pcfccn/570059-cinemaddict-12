import AbstractView from "../view/abstract";
import {renderPosition} from "../constants";

const render = (container, element, place = renderPosition.BEFORE_END) => {
  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  switch (place) {
    case renderPosition.BEFORE_END:
      container.append(element);
      break;
    case renderPosition.AFTER_BEGIN:
      container.prepand(element);
  }
};

const createElement = (template) => {
  const divElement = document.createElement(`div`);
  divElement.innerHTML = template;
  return divElement.firstChild;
};

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export {render, createElement, remove};
