import AbstractView from "./abstract";

const createFilmsListExtraContainerTemplate = (name) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${name}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsListExtraContainerView extends AbstractView {
  constructor(extraContainersName) {
    super();
    this._extraContainersName = extraContainersName;
  }

  getTemplate() {
    return createFilmsListExtraContainerTemplate(this._extraContainersName);
  }
}
