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
import FilmCardPopupView from './view/film-card-popup.js';
import NoFilmsView from './view/no-films';
import {render, remove} from './utils/render';


const films = generateFilmCards();
const filteredElementCount = getFilterElementCount(films);
const topRatedMovies = getTopRatedMovies(films);
const topCommentedMovies = getTopCommentedMovies(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const renderFilm = (container, film) => {
  const filmCard = new FilmCardView(film);
  const filmPopup = new FilmCardPopupView(film);
  const closeButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);
  const showPopup = () => {
    render(document.body, filmPopup);
    document.addEventListener(`keydown`, onEscKeyDown);
    closeButton.addEventListener(`click`, closePopup);
    filmCard.removePosterAndCommentsClickHandler(showPopup);
  };
  const closePopup = () => {
    remove(filmPopup);
    document.removeEventListener(`keydown`, onEscKeyDown);
    closeButton.removeEventListener(`click`, closePopup);
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
};

const renderFilmsOnTheBoard = (siteMainFilms, siteMainFilmsList) => {
  const siteMainFilmsListContainer = siteMainFilmsList.querySelector(`.films-list__container`);
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(siteMainFilmsListContainer, films[i]);
  }
  if (films.length > FILM_COUNT_PER_STEP) {
    render(siteMainFilmsList, new LoadMoreButonView());
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
  render(siteMainFilms, filmsListTopRatedSection);
  const filmsListTopCommentedSection = new FilmsListExtraContainerView(extraContainersName.MOST_COMMENTED).getElement();
  const filmsListTopCommentedContainer = filmsListTopCommentedSection.querySelector(`.films-list__container`);
  for (let i = 0; i < EXSTRA_MOVIES_COUNT; i++) {
    renderFilm(filmsListTopCommentedContainer, topCommentedMovies[i]);
  }
  render(siteMainFilms, filmsListTopCommentedSection);
};

const renderBoard = () => {
  render(siteHeaderElement, new HeaderProfileView());
  render(siteMainElement, new FilterView(filteredElementCount));
  render(siteMainElement, new SortView());
  render(siteMainElement, new FilmsListContainerView());
  const siteMainFilms = siteMainElement.querySelector(`.films`);
  const siteMainFilmsList = siteMainFilms.querySelector(`.films-list`);
  if (!films.length) {
    render(siteMainFilmsList, new NoFilmsView());
  } else {
    renderFilmsOnTheBoard(siteMainFilms, siteMainFilmsList);
  }
  render(siteFooterElement, new FooterStatisticsnView(films.length));
};

renderBoard();
