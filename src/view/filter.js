import {createElement} from "../utils";

const createFilterTemplate = (filteredElementCount) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filteredElementCount.watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filteredElementCount.history}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filteredElementCount.favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilterView {
  constructor(filteredElementCount) {
    this._element = null;
    this._filteredElementCount = filteredElementCount;
  }

  getTemlate() {
    return createFilterTemplate(this._filteredElementCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemlate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
