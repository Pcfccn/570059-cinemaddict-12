import FooterStatisticsView from './view/footer-statistic.js';
import HeaderProfileView from './view/header-profile.js';
import FilterView from './view/filter.js';
import {generateFilmCards} from './mock/film-card.js';
import {getFilterElementCount} from './mock/filter.js';
import {render} from './utils/render';
import MovieListPresenter from './presenter/movie-list';


const films = generateFilmCards();
const filteredElementCount = getFilterElementCount(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView());
render(siteMainElement, new FilterView(filteredElementCount));

new MovieListPresenter(siteMainElement).init(films);

render(siteFooterElement, new FooterStatisticsView(films.length));
