import {EXSTRA_MOVIES_COUNT, FILM_COUNT_PER_STEP, renderPosition, sortTypes} from "../constants";
import {sortDateDown, sortRatingDown} from "../utils/film";
import {remove, render} from "../utils/render";
import FilmsListContainerView from "../view/films-list-container";
import SortView from "../view/main-sort";
import NoFilmsView from "../view/no-films";
import LoadMoreButtonView from "../view/load-more-button";
import AbstractFilmListPresenter from "./abstract-list";

export default class FilmsListPresenter extends AbstractFilmListPresenter {
  constructor(filmsModel) {
    super(filmsModel);
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._EXSTRA_MOVIES_COUNT = EXSTRA_MOVIES_COUNT;
    this._currentSortType = sortTypes.DEFAULT;

    this._sortComponent = null;
    this._loadMoreButton = null;

    this._noFilms = new NoFilmsView();

    this._loadMoreButtonClickHandler = this._loadMoreButtonClickHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  init() {
    this._renderFilmsListContainer();
    this._siteMainFilms = this._siteMainElement.querySelector(`.films`);
    this._siteMainFilmsList = this._siteMainFilms.querySelector(`.films-list`);
    this._renderBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case sortTypes.BY_DATE:
        return this._filmsModel.getFilms().slice().sort(sortDateDown);
      case sortTypes.BY_RATING:
        return this._filmsModel.getFilms().slice().sort(sortRatingDown);
    }
    return this._filmsModel.getFilms();
  }


  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearBoard(true);
    this._renderBoard();
  }

  _renderSort() {
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeHandler(this._sortTypeChangeHandler);

    render(this._siteMainFilms, this._sortComponent, renderPosition.AFTER_BEGIN);
  }

  _clearBoard(resetRenderedFilmCount = false, resetSortType = false) {
    const filmCount = this._getFilms().length;
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._noFilms);
    remove(this._loadMoreButton);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedTaskCount = Math.min(filmCount, this._renderedTaskCount);
    }

    if (resetSortType) {
      this._currentSortType = sortTypes.DEFAULT;
    }
  }

  _loadMoreButtonClickHandler() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);
    this._renderFilms(this._siteMainFilmsListContainer, films);
    this._renderedFilmCount = newRenderedFilmCount;
    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButton);
    }
  }

  _renderFilmsListContainer() {
    render(this._siteMainElement, new FilmsListContainerView());
  }

  _renderFilmsOnTheBoard() {
    this._siteMainFilmsListContainer = this._siteMainFilmsList.querySelector(`.films-list__container`);
    let films = this._getFilms().slice(0, Math.min(this._getFilms().length, FILM_COUNT_PER_STEP));
    this._renderFilms(this._siteMainFilmsListContainer, films);

    if (this._getFilms().length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderLoadMoreButton() {
    this._loadMoreButton = new LoadMoreButtonView();
    this._loadMoreButton.setClickHandler(this._loadMoreButtonClickHandler);
    render(this._siteMainFilmsList, this._loadMoreButton);
  }

  _renderBoard() {
    if (!this._getFilms().length) {
      render(this._siteMainFilmsList, this._noFilms);
    } else {
      this._renderSort();
      this._renderFilmsOnTheBoard();
    }
  }
}