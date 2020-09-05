import FilmsListContainerView from '../view/films-list-container';
import {render, remove} from '../utils/render';
import NoFilmsView from '../view/no-films';
import {FILM_COUNT_PER_STEP, EXSTRA_MOVIES_COUNT, extraContainersName, sortTypes} from '../constants';
import LoadMoreButtonView from '../view/load-more-button';
import FilmsListExtraContainerView from '../view/films-list-extra-container';
import {getTopRatedMovies, getTopCommentedMovies} from '../mock/filter';
import FilmCardView from '../view/film-card';
import FilmCardPopupView from '../view/film-card-popup';
import {sortDateDown, sortRatingDown} from '../utils/film';
import SortView from '../view/main-sort';

export default class MovieListPresenter {
  constructor(siteMainElement) {
    this._siteMainElement = siteMainElement;
    this._noFilms = new NoFilmsView();
    this._sortComponent = new SortView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._filmsListTopRatedSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED);
    this._filmsListTopCommentedSection = new FilmsListExtraContainerView(extraContainersName.MOST_COMMENTED);
    this._FILM_COUNT_PER_STEP = FILM_COUNT_PER_STEP;
    this._EXSTRA_MOVIES_COUNT = EXSTRA_MOVIES_COUNT;
    this._currentSortType = sortTypes.DEFAULT;
    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case sortTypes.BY_DATE:
        this._films.sort(sortDateDown);
        break;
      case sortTypes.BY_RATING:
        this._films.sort(sortRatingDown);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmsOnTheBoard(this._films);
  }

  _handlerSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
  }

  _renderSort() {
    render(this._siteMainElement, this._sortComponent);
    this._sortComponent.setSortTypeHandler(this._handlerSortTypeChange);
  }

  _clearFilmList() {
    this._siteMainElement.querySelector(`.films-list__container`).innerHTML = ``;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }


  _renderFilmsListContainer() {
    render(this._siteMainElement, new FilmsListContainerView());
  }


  _renderFilm(container, film) {
    const filmCard = new FilmCardView(film);
    const filmPopup = new FilmCardPopupView(film);
    const showPopup = () => {
      render(document.body, filmPopup);
      document.addEventListener(`keydown`, onEscKeyDown);
      filmPopup.setCloseButtonHandler(closePopup);
      filmCard.removePosterAndCommentsClickHandler(showPopup);
    };
    const closePopup = () => {
      remove(filmPopup);
      document.removeEventListener(`keydown`, onEscKeyDown);
      filmPopup.removeCloseButtonHandler(closePopup);
      filmCard.setPosterAndCommentsClickHandler(showPopup);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
      }
    };
    filmCard.setPosterAndCommentsClickHandler(showPopup);
    render(container, filmCard);
  }

  _renderTopRatedFilms(container, films) {
    const topRatedMovies = getTopRatedMovies(films);
    const filmsListTopRatedContainer = this._filmsListTopRatedSection.getElement().querySelector(`.films-list__container`);
    for (let i = 0; i < this._EXSTRA_MOVIES_COUNT; i++) {
      this._renderFilm(filmsListTopRatedContainer, topRatedMovies[i]);
    }
    render(container, this._filmsListTopRatedSection);
  }

  _renderTopCommentedFilms(container, films) {
    const topCommentedMovies = getTopCommentedMovies(films);
    const filmsListTopCommentedContainer = this._filmsListTopCommentedSection.getElement().querySelector(`.films-list__container`);
    for (let i = 0; i < this._EXSTRA_MOVIES_COUNT; i++) {
      this._renderFilm(filmsListTopCommentedContainer, topCommentedMovies[i]);
    }
    render(container, this._filmsListTopCommentedSection);
  }


  _renderFilmsOnTheBoard(films) {
    const siteMainFilms = this._siteMainElement.querySelector(`.films`);
    const siteMainFilmsList = siteMainFilms.querySelector(`.films-list`);
    const siteMainFilmsListContainer = siteMainFilmsList.querySelector(`.films-list__container`);
    for (let i = 0; i < Math.min(films.length, this._FILM_COUNT_PER_STEP); i++) {
      this._renderFilm(siteMainFilmsListContainer, films[i]);
    }
    if (films.length > this._FILM_COUNT_PER_STEP) {
      render(siteMainFilmsList, this._loadMoreButton);

      let renderedFilmCount = this._FILM_COUNT_PER_STEP;

      this._loadMoreButton.setLoadMoreButtonHandler(() => {
        films.slice(renderedFilmCount, renderedFilmCount + this._FILM_COUNT_PER_STEP)
        .forEach((film) => this._renderFilm(siteMainFilmsListContainer, film));
        renderedFilmCount += this._FILM_COUNT_PER_STEP;

        if (renderedFilmCount > films.length) {
          remove(this._loadMoreButton);
        }
      });
    }

    this._renderTopRatedFilms(siteMainFilms, films);
    this._renderTopCommentedFilms(siteMainFilms, films);
  }


  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._renderSort();
    this._renderFilmsListContainer();
    const siteMainFilms = this._siteMainElement.querySelector(`.films`);
    const siteMainFilmsList = siteMainFilms.querySelector(`.films-list`);
    if (!this._films.length) {
      render(siteMainFilmsList, this._noFilms);
    } else {
      this._renderFilmsOnTheBoard(this._films);
    }
  }
}
