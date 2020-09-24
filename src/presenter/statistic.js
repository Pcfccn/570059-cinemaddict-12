import {remove, render} from "../utils/render";
import StatisticView from "../view/statistic";

export default class StatisticPresenter {
  constructor(mainElement, filmsModel) {
    this._mainElement = mainElement;
    this._filmsModel = filmsModel;
  }

  init() {
    this._statisticComponent = new StatisticView();
    render(this._mainElement, this._statisticComponent);
  }

  destroy() {
    remove(this._statisticComponent);
  }
}
