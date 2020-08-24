import FilmCardView from './view/film-card';
import FilmsListContainerView from './view/films-list-container.js';
import FilmsListExtraContainerView from './view/films-list-extra-container.js';
import FooterStatisticsnView from './view/footer-statistic.js';
import HeaderProfileView from './view/header-profile.js';
import LoadMoreButonView from './view/load-more-button.js';
import FilterView from './view/filter.js';
import SortView from './view/main-sort.js';
import {generateFilmCards} from './mock/film-card.js';
import {getFilterElementCount, getTopRatedMovies, getTopCommentedMovies} from './mock/filter.js';
import {FILM_COUNT_PER_STEP, extraContainersName, EXSTRA_MOVIES_COUNT} from './constants';
import {renderElement} from './utils.js';
import FilmCardPopupView from './view/film-card-popup.js';
import NoFilmsView from './view/no-films';


const films = generateFilmCards();
const filteredElementCount = getFilterElementCount(films);
const topRatedMovies = getTopRatedMovies(films);
const topCommentedMovies = getTopCommentedMovies(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const renderFilm = (container, film) => {
  const filmElement = new FilmCardView(film).getElement();
  const filmPopupElement = new FilmCardPopupView(film).getElement();
  const poster = filmElement.querySelector(`.film-card__poster`);
  const comments = filmElement.querySelector(`.film-card__comments`);
  const closeButton = filmPopupElement.querySelector(`.film-details__close-btn`);
  const showPopup = () => {
    renderElement(document.body, filmPopupElement);
    document.addEventListener(`keydown`, onEscKeyDown);
    closeButton.addEventListener(`click`, closePopup);
    poster.removeEventListener(`click`, showPopup);
    comments.removeEventListener(`click`, showPopup);
  };
  const closePopup = () => {
    filmPopupElement.remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
    closeButton.removeEventListener(`click`, closePopup);
    poster.addEventListener(`click`, showPopup);
    comments.addEventListener(`click`, showPopup);
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
    }
  };
  poster.addEventListener(`click`, showPopup);
  comments.addEventListener(`click`, showPopup);
  renderElement(container, filmElement);
};

const renderFilmsOnTheBoard = (siteMainFilms, siteMainFilmsList) => {
  const siteMainFilmsListContainer = siteMainFilmsList.querySelector(`.films-list__container`);
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(siteMainFilmsListContainer, films[i]);
  }
  if (films.length > FILM_COUNT_PER_STEP) {
    renderElement(siteMainFilmsList, new LoadMoreButonView().getElement());
    const loadMoreButton = siteMainFilmsList.querySelector(`.films-list__show-more`);

    let renderedFilmCount = FILM_COUNT_PER_STEP;

    loadMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(siteMainFilmsListContainer, film));
      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount > films.length) {
        loadMoreButton.remove();
      }
    });
  }
  const filmsListTopRatedSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED).getElement();
  const filmsListTopRatedContainer = filmsListTopRatedSection.querySelector(`.films-list__container`);
  for (let i = 0; i < EXSTRA_MOVIES_COUNT; i++) {
    renderFilm(filmsListTopRatedContainer, topRatedMovies[i]);
  }
  renderElement(siteMainFilms, filmsListTopRatedSection);
  const filmsListTopCommentedSection = new FilmsListExtraContainerView(extraContainersName.MOST_COMMENTED).getElement();
  const filmsListTopCommentedContainer = filmsListTopCommentedSection.querySelector(`.films-list__container`);
  for (let i = 0; i < EXSTRA_MOVIES_COUNT; i++) {
    renderFilm(filmsListTopCommentedContainer, topCommentedMovies[i]);
  }
  renderElement(siteMainFilms, filmsListTopCommentedSection);
};

const renderBoard = () => {
  renderElement(siteHeaderElement, new HeaderProfileView().getElement());
  renderElement(siteMainElement, new FilterView(filteredElementCount).getElement());
  renderElement(siteMainElement, new SortView().getElement());
  renderElement(siteMainElement, new FilmsListContainerView().getElement());
  const siteMainFilms = siteMainElement.querySelector(`.films`);
  const siteMainFilmsList = siteMainFilms.querySelector(`.films-list`);
  if (!films.length) {
    renderElement(siteMainFilmsList, new NoFilmsView().getElement());
  } else {
    renderFilmsOnTheBoard(siteMainFilms, siteMainFilmsList);
  }
  renderElement(siteFooterElement, new FooterStatisticsnView(films.length).getElement());
};

renderBoard();
