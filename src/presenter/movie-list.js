import FilmsListContainerView from '../view/films-list-container';
import {render, remove} from '../utils/render';
import NoFilmsView from '../view/no-films';
import {FILM_COUNT_PER_STEP, EXSTRA_MOVIES_COUNT, extraContainersName, sortTypes, userActions, updateTypes, renderPosition} from '../constants';
import LoadMoreButtonView from '../view/load-more-button';
import FilmsListExtraContainerView from '../view/films-list-extra-container';
import {getTopRatedMovies, getTopCommentedMovies} from '../mock/filter';
import {sortDateDown, sortRatingDown} from '../utils/film';
import SortView from '../view/main-sort';
import FilmCardPresenter from './film-card';

export default class MovieListPresenter {
  constructor(siteMainElement, filmsModel) {
    this._filmsModel = filmsModel;
    this._siteMainElement = siteMainElement;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._EXSTRA_MOVIES_COUNT = EXSTRA_MOVIES_COUNT;
    this._currentSortType = sortTypes.DEFAULT;
    this._filmPresenter = {};

    this._sortComponent = null;
    this._loadMoreButton = null;

    this._noFilms = new NoFilmsView();
    this._filmsListTopRatedSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED);
    this._filmsListTopCommentedSection = new FilmsListExtraContainerView(extraContainersName.MOST_COMMENTED);

    this._loadMoreButtonClickHandler = this._loadMoreButtonClickHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._мodelEventHandler = this._мodelEventHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._viewActionHandler = this._viewActionHandler.bind(this);

    this._filmsModel.addObserver(this._мodelEventHandler);
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

  _modeChangeHandler() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _мodelEventHandler(updateType, updatedFilm) {
    switch (updateType) {
      case updateTypes.PATCH:
        this._filmPresenter[updatedFilm.id].init(this._siteMainFilmsListContainer, updatedFilm);
        break;
      case updateTypes.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case updateTypes.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }

  _renderSort() {
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeHandler(this._sortTypeChangeHandler);

    render(this._siteMainFilms, this._sortComponent, renderPosition.AFTER_BEGIN);
  }

  // _clearFilmList() {
  //   Object.values(this._filmPresenter).forEach((presenter) => {
  //     presenter.destroy();
  //   });
  //   this._filmPresenter = {};
  //   this._renderedFilmCount = FILM_COUNT_PER_STEP;
  // }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
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
    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;
    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButton);
    }
  }

  _renderFilmsListContainer() {
    render(this._siteMainElement, new FilmsListContainerView());
  }


  _renderFilm(container, film) {
    const filmCardPresenter = new FilmCardPresenter(this._viewActionHandler, this._modeChangeHandler);
    filmCardPresenter.init(container, film);
    this._filmPresenter[film.id] = filmCardPresenter;
  }

  _renderTopRatedFilms(container) {
    const topRatedMovies = getTopRatedMovies(this._getFilms());
    const filmsListTopRatedContainer = this._filmsListTopRatedSection.getElement().querySelector(`.films-list__container`);
    for (let i = 0; i < this._EXSTRA_MOVIES_COUNT; i++) {
      this._renderFilm(filmsListTopRatedContainer, topRatedMovies[i]);
    }
    render(container, this._filmsListTopRatedSection);
  }

  _renderTopCommentedFilms(container) {
    const topCommentedMovies = getTopCommentedMovies(this._getFilms());
    const filmsListTopCommentedContainer = this._filmsListTopCommentedSection.getElement().querySelector(`.films-list__container`);
    for (let i = 0; i < this._EXSTRA_MOVIES_COUNT; i++) {
      this._renderFilm(filmsListTopCommentedContainer, topCommentedMovies[i]);
    }
    render(container, this._filmsListTopCommentedSection);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._siteMainFilmsListContainer, film));
  }

  _renderFilmsOnTheBoard() {
    this._siteMainFilmsListContainer = this._siteMainFilmsList.querySelector(`.films-list__container`);
    let films = this._getFilms().slice(0, Math.min(this._getFilms().length, FILM_COUNT_PER_STEP));
    this._renderFilms(films);

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
      this._renderTopRatedFilms(this._siteMainFilms);
      this._renderTopCommentedFilms(this._siteMainFilms);
    }
  }

  _viewActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case userActions.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case userActions.SUBMIT_COMMENT:
        this._filmsModel.addFilm(updateType, update);
        break;
      case userActions.DELETE_COMMENT:
        this._filmsModel.deleteFilm(updateType, update);
        break;
    }
  }
}
