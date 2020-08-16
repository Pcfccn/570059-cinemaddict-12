import {createFilmCardTemplate} from './view/film-card';
import {createFilmsListContainerTemplate} from './view/films-list-container.js';
import {createFilmsListExtraContainerTemplate} from './view/films-list-extra-container.js';
import {createFooterStatisticsTemplate} from './view/footer-statistic.js';
import {createHeaderProfileTemplate} from './view/header-profile.js';
import {createLoadMoreButonTemplate} from './view/load-more-button.js';
import {createFilterTemplate} from './view/filter.js';
import {createMainSortTemplate} from './view/main-sort.js';
import {generateFilmCards} from './mock/film-card.js';
import {getFilterElementCount, getTopRatedMovies, getTopCommentedMovies} from './mock/filter.js';
import {FILM_COUNT_PER_STEP} from './constants';
// import {createFilmCardPopupTemplate} from './view/film-card-popup.js';


const films = generateFilmCards();
const filteredElementCount = getFilterElementCount(films);
const topRatedMovies = getTopRatedMovies(films);
const topCommentedMovies = getTopCommentedMovies(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, element, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, element);
};

render(siteHeaderElement, createHeaderProfileTemplate());
render(siteMainElement, createFilterTemplate(filteredElementCount));
render(siteMainElement, createMainSortTemplate());
render(siteMainElement, createFilmsListContainerTemplate());

const siteMainFilmsListContainer = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(siteMainFilmsListContainer, createFilmCardTemplate(films[i]));
}

const siteMainFilmsList = siteMainElement.querySelector(`.films-list`);


if (films.length > FILM_COUNT_PER_STEP) {
  render(siteMainFilmsList, createLoadMoreButonTemplate());
  const loadMoreButton = siteMainFilmsList.querySelector(`.films-list__show-more`);

  let renderedFilmCount = FILM_COUNT_PER_STEP;

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
    .forEach((film) => render(siteMainFilmsListContainer, createFilmCardTemplate(film)));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount > films.length) {
      loadMoreButton.remove();
    }
  });
}


const siteMainFilms = siteMainElement.querySelector(`.films`);
render(siteMainFilms, createFilmsListExtraContainerTemplate());

const filmsListExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
render(filmsListExtraContainers[0], createFilmCardTemplate(topRatedMovies[0]));
render(filmsListExtraContainers[0], createFilmCardTemplate(topRatedMovies[1]));
render(filmsListExtraContainers[1], createFilmCardTemplate(topCommentedMovies[0]));
render(filmsListExtraContainers[1], createFilmCardTemplate(topCommentedMovies[1]));

render(siteFooterElement, createFooterStatisticsTemplate());

// render(document.body, createFilmCardPopupTemplate(films[0]));
