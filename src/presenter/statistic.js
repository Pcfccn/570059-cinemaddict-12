import {HTMLTagName, timeRange} from "../constants";
import {getChartRandomData, getStatRandomData} from "../mock/chart";
import {remove, render} from "../utils/render";
import ChartView from "../view/chart";
import StatisticView from "../view/statistic";

export default class StatisticPresenter {
  constructor(mainElement, filmsModel) {
    this._mainElement = mainElement;
    this._filmsModel = filmsModel;
    this._statsTimeClickHandler = this._statsTimeClickHandler.bind(this);
    this._currentTimeRange = timeRange.ALL_TIME;
    this._chartData = getChartRandomData();
    this._statData = getStatRandomData();
  }

  init() {
    this._statisticComponent = new StatisticView(this._statData, this._currentTimeRange);
    render(this._mainElement, this._statisticComponent);
    this._statisticComponent.setStatsTimeClickHandler(this._statsTimeClickHandler);
    this._chartContainer = document.querySelector(`.statistic__chart`);
    this._chartComponent = new ChartView(this._chartContainer, this._chartData[this._currentTimeRange]);
    render(this._chartContainer, this._chartComponent);
  }

  destroy() {
    remove(this._statisticComponent);
    remove(this._chartComponent);
  }

  _statsTimeClickHandler(evt) {
    if (evt.target.tagName !== HTMLTagName.INPUT) {
      return;
    }
    if (this._currentTimeRange === evt.target.value) {
      return;
    }
    this._currentTimeRange = evt.target.value;

    if (this._currentTimeRange === `all-time`) {
      this._currentTimeRange = timeRange.ALL_TIME;
    }

    this.destroy();
    this.init();
  }
}
