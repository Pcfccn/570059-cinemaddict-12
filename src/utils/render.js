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
      container.prepend(element);
  }
};

const createElement = (template) => {
  const divElement = document.createElement(`div`);
  divElement.innerHTML = template;
  return divElement.firstChild;
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export {render, createElement, remove, replace};
