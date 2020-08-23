import {createElement} from "../utils";

const createFilmsListExtraContainerTemplate = (name) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${name}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsListExtraContainerView {
  constructor(extraContainersName) {
    this._element = null;
    this._extraContainersName = extraContainersName;
  }

  getTemplate() {
    return createFilmsListExtraContainerTemplate(this._extraContainersName);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
