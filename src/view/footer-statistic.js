import AbstractView from "./abstract";

const createFooterStatisticsTemplate = (filmsTotalCounter) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsTotalCounter} movies inside</p>
    </section>`
  );
};

export default class FooterStatisticsnView extends AbstractView {
  constructor(filmsTotalCounter) {
    super();
    this._filmsTotalCounter = filmsTotalCounter;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsTotalCounter);
  }
}
