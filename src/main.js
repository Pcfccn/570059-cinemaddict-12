import FooterStatisticsView from './view/footer-statistic.js';
import HeaderProfileView from './view/header-profile.js';
import FilterView from './view/filter.js';
import {generateFilmCards} from './mock/film-card.js';
import {getFilterElementCount} from './mock/filter.js';
import {render} from './utils/render';
import MovieListPresenter from './presenter/movie-list';
import FilmsModel from './model/movies.js';


const films = generateFilmCards();
const filteredElementCount = getFilterElementCount(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView());
render(siteMainElement, new FilterView(filteredElementCount));

new MovieListPresenter(siteMainElement, filmsModel).init(films);

render(siteFooterElement, new FooterStatisticsView(films.length));
