import {remove, render} from "../utils/render";
import ChartView from "../view/chart";
import StatisticView from "../view/statistic";

export default class StatisticPresenter {
  constructor(mainElement, filmsModel) {
    this._mainElement = mainElement;
    this._filmsModel = filmsModel;
  }

  init() {
    this._statisticComponent = new StatisticView();
    render(this._mainElement, this._statisticComponent);
    const chartContainer = document.querySelector(`.statistic__chart`);
    this._chartComponent = new ChartView(chartContainer);
    render(chartContainer, this._chartComponent);
  }

  destroy() {
    remove(this._statisticComponent);
    // remove(this._chartComponent);
  }
}
