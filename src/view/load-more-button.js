import AbstractView from "./abstract";

const createLoadMoreButonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMoreButonView extends AbstractView {
  constructor() {
    super();
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);

  }
  getTemplate() {
    return createLoadMoreButonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setLoadMoreButtonHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
