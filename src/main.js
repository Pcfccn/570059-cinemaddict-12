import FooterStatisticsView from './view/footer-statistic.js';
import HeaderProfileView from './view/header-profile.js';
import {generateFilmCards} from './mock/film-card.js';
import {render} from './utils/render';
import FilmsModel from './model/movies.js';
import AppPresenter from './presenter/app-presenter.js';
import FilterModel from './model/filter.js';

const films = generateFilmCards();

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView());

new AppPresenter(siteMainElement, filterModel, filmsModel).init();

render(siteFooterElement, new FooterStatisticsView(filmsModel.getFilms().length));
