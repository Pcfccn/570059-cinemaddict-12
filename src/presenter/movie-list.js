import FilmsListContainerView from '../view/films-list-container';
import {render, remove} from '../utils/render';
import NoFilmsView from '../view/no-films';
import {FILM_COUNT_PER_STEP, EXSTRA_MOVIES_COUNT, extraContainersName, sortTypes} from '../constants';
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

    this._FILM_COUNT_PER_STEP = FILM_COUNT_PER_STEP;
    this._EXSTRA_MOVIES_COUNT = EXSTRA_MOVIES_COUNT;
    this._currentSortType = sortTypes.DEFAULT;
    this._filmPresenter = {};

    this._noFilms = new NoFilmsView();
    this._sortComponent = new SortView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._filmsListTopRatedSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED);
    this._filmsListTopCommentedSection = new FilmsListExtraContainerView(extraContainersName.MOST_COMMENTED);

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._filmChangeHandler = this._filmChangeHandler.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    this._renderSort();
    this._renderFilmsListContainer();
    this._siteMainFilms = this._siteMainElement.querySelector(`.films`);
    const siteMainFilmsList = this._siteMainFilms.querySelector(`.films-list`);
    if (!this._getFilms().length) {
      render(siteMainFilmsList, this._noFilms);
    } else {
      this._renderFilmsOnTheBoard();
      this._renderTopRatedFilms(this._siteMainFilms);
      this._renderTopCommentedFilms(this._siteMainFilms);
    }
  }

  _filmChangeHandler(updatedFilm) {
    // this._films = updateItem(this._films, updatedFilm);
    // this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(this._siteMainFilmsListContainer, updatedFilm);
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

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmsOnTheBoard();
    this._renderTopRatedFilms(this._siteMainFilms);
    this._renderTopCommentedFilms(this._siteMainFilms);
  }

  _renderSort() {
    render(this._siteMainElement, this._sortComponent);
    this._sortComponent.setSortTypeHandler(this._sortTypeChangeHandler);
  }

  _clearFilmList() {
    Object.values(this._filmPresenter).forEach((presenter) => {
      presenter.destroy();
    });
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }


  _renderFilmsListContainer() {
    render(this._siteMainElement, new FilmsListContainerView());
  }


  _renderFilm(container, film) {
    const filmCardPresenter = new FilmCardPresenter(this._filmChangeHandler, this._handleModeChange);
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
    const siteMainFilms = this._siteMainElement.querySelector(`.films`);
    const siteMainFilmsList = siteMainFilms.querySelector(`.films-list`);
    this._siteMainFilmsListContainer = siteMainFilmsList.querySelector(`.films-list__container`);
    let films = this._getFilms().slice(0, Math.min(this._getFilms().length, this._FILM_COUNT_PER_STEP));
    this._renderFilms(films);

    if (this._getFilms().length > this._FILM_COUNT_PER_STEP) {
      render(siteMainFilmsList, this._loadMoreButton);

      let renderedFilmCount = this._FILM_COUNT_PER_STEP;

      this._loadMoreButton.setLoadMoreButtonHandler(() => {
        films = this._getFilms().slice(renderedFilmCount, renderedFilmCount + this._FILM_COUNT_PER_STEP);
        this._renderFilms(films);
        renderedFilmCount += this._FILM_COUNT_PER_STEP;

        if (renderedFilmCount > this._getFilms().length) {
          remove(this._loadMoreButton);
        }
      });
    }
  }
}
