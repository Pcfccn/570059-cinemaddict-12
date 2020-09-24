import {timeRange} from "../constants";
import AbstractView from "./abstract";

const createStatisticTemplate = (data, currentTimeRange) => {

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${currentTimeRange === timeRange.ALL_TIME
      ? ` checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${currentTimeRange === timeRange.TODAY
      ? ` checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${currentTimeRange === timeRange.WEEK
      ? ` checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${currentTimeRange === timeRange.MONTH
      ? ` checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${currentTimeRange === timeRange.YEAR
      ? ` checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${data[currentTimeRange].youWatched} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${Math.floor(data[currentTimeRange].totalDuration / 60)} <span class="statistic__item-description">h</span> ${data[currentTimeRange].totalDuration % 60} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${data[currentTimeRange].topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000">
        </canvas>
      </div>

    </section>`
  );
};

export default class StatisticView extends AbstractView {
  constructor(data, currentTimeRange) {
    super();
    this._data = data;
    this._currentTimeRange = currentTimeRange;
    this._callback = {};
    this._statsTimeClickHandler = this._statsTimeClickHandler.bind(this);
  }

  getTemplate() {
    return createStatisticTemplate(this._data, this._currentTimeRange);
  }

  _statsTimeClickHandler(evt) {
    // evt.preventDefault();
    this._callback.statsTimeClickHandler(evt);
  }

  setStatsTimeClickHandler(callback) {
    this._callback.statsTimeClickHandler = callback;
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, this._statsTimeClickHandler);
  }
}
