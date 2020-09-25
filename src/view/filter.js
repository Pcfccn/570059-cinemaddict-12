import {filterTypes, HTMLTagName} from "../constants";
import AbstractView from "./abstract";

const createFilterTemplate = (filter, currentType) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${currentType === filterTypes.ALL
      ? `main-navigation__item--active`
      : ``}" data-filter-type="${filterTypes.ALL}">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${currentType === filterTypes.WATCHLIST
      ? `main-navigation__item--active`
      : ``}" data-filter-type="${filterTypes.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${filter.watchlist}</span></a>
        <a href="#history" class="main-navigation__item ${currentType === filterTypes.HISTORY
      ? `main-navigation__item--active`
      : ``}" data-filter-type="${filterTypes.HISTORY}">History <span class="main-navigation__item-count"> ${filter.history}</span></a>
        <a href="#favorites" class="main-navigation__item ${currentType === filterTypes.FAVORITES
      ? `main-navigation__item--active`
      : ``}" data-filter-type="${filterTypes.FAVORITES}">Favorites <span class="main-navigation__item-count">${filter.favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional ${currentType === filterTypes.STATISTIC
      ? `main-navigation__item--active`
      : ``}" data-filter-type="${filterTypes.STATISTIC}">Stats</a>
    </nav>`
  );
};

export default class FilterView extends AbstractView {
  constructor(filter, currentType) {
    super();
    this._callback = {};
    this._filter = filter;
    this._currentType = currentType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filter, this._currentType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== HTMLTagName.a) {
      return;
    }
    this._callback.filterTypeChange(evt.target.dataset.filterType);
    this._callback.filterTypeChange2(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback, callback2) {
    this._callback.filterTypeChange = callback;
    this._callback.filterTypeChange2 = callback2;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
