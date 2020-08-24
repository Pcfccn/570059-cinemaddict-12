import {createElement} from "../utils";

const createFooterStatisticsTemplate = (filmsTotalCounter) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsTotalCounter} movies inside</p>
    </section>`
  );
};

export default class FooterStatisticsnView {
  constructor(filmsTotalCounter) {
    this._element = null;
    this._filmsTotalCounter = filmsTotalCounter;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsTotalCounter);
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
