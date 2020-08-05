import {siteFilmCardTemplate} from './view/film-card';
import {filmsWithFilmsListContainerTemplate} from './view/films-list-container.js';
import {filmsListExtraContainerTemplate} from './view/films-list-extra-container.js';
import {siteFooterStatisticsTemplate} from './view/footer-statistic.js';
import {siteHeaderProfileTemplate} from './view/header-profile.js';
import {loadMoreButonTemplate} from './view/load-more-button.js';
import {siteMainNavigationTemplate} from './view/main-navigation.js';
import {siteMainSortTemplate} from './view/main-sort.js';


const FILM_COUNT = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, element, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, element);
};

render(siteHeaderElement, siteHeaderProfileTemplate());
render(siteMainElement, siteMainNavigationTemplate());
render(siteMainElement, siteMainSortTemplate());
render(siteMainElement, filmsWithFilmsListContainerTemplate());

const siteMainFilmsListContainer = siteMainElement.querySelector(`.films-list__container`);
for (let count = 0; count < FILM_COUNT; count++) {
  render(siteMainFilmsListContainer, siteFilmCardTemplate());
}

const siteMainFilmsList = siteMainElement.querySelector(`.films-list`);
render(siteMainFilmsList, loadMoreButonTemplate());
const siteMainFilms = siteMainElement.querySelector(`.films`);
render(siteMainFilms, filmsListExtraContainerTemplate());

const filmsListExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
render(filmsListExtraContainers[0], siteFilmCardTemplate());
render(filmsListExtraContainers[0], siteFilmCardTemplate());
render(filmsListExtraContainers[1], siteFilmCardTemplate());
render(filmsListExtraContainers[1], siteFilmCardTemplate());

render(siteFooterElement, siteFooterStatisticsTemplate());
