import {createElement} from "../utils";
import AbstractView from "./abstract";

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

export default class FilterView extends AbstractView {
  constructor(filteredElementCount) {
    super();
    this._filteredElementCount = filteredElementCount;
  }

  getTemplate() {
    return createFilterTemplate(this._filteredElementCount);
  }
}
