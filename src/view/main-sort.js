import AbstractView from "./abstract";
import {sortTypes, HTMLTagName} from "../constants";

const createMainSortTemplate = (currentSortType) => {
  console.log(currentSortType);
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button${currentSortType === sortTypes.DEFAULT
      ? ` sort__button--active`
      : ``}" data-sort-type="${sortTypes.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button${currentSortType === sortTypes.BY_DATE
      ? ` sort__button--active`
      : ``}" data-sort-type="${sortTypes.BY_DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button${currentSortType === sortTypes.BY_RATING
      ? ` sort__button--active`
      : ``}" data-sort-type="${sortTypes.BY_RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortView extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._callback = {};
    this._sortTypeHandler = this._sortTypeHandler.bind(this);
  }
  getTemplate() {
    return createMainSortTemplate(this._currentSortType);
  }

  _sortTypeHandler(evt) {
    if (evt.target.tagName !== HTMLTagName.a) {
      return;
    }
    evt.preventDefault();
    this._callback.sort(evt.target.dataset.sortType);


    // const sortButtonsElements = this.getElement().querySelectorAll(`.sort__button`);
    // sortButtonsElements.forEach((currentElement) => {
    //   if (currentElement.classList.contains(`sort__button--active`)) {
    //     currentElement.classList.remove(`sort__button--active`);
    //   }
    // });
    // evt.target.classList.add(`sort__button--active`);
  }

  setSortTypeHandler(callback) {
    this._callback.sort = callback;
    this.getElement().addEventListener(`click`, this._sortTypeHandler);
  }
}
