import FooterStatisticsView from './view/footer-statistic.js';
import HeaderProfileView from './view/header-profile.js';
import FilterView from './view/filter.js';
import {generateFilmCards} from './mock/film-card.js';
import {getFilterElementCount} from './mock/filter.js';
import {render} from './utils/render';
import FilmsListPresenter from './presenter/films-list';
import FilmsModel from './model/movies.js';
import FilmsListExtraPresenter from './presenter/films-list-extra.js';
import {extraContainersName} from './constants.js';


const films = generateFilmCards();

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const filteredElementCount = getFilterElementCount(filmsModel.getFilms());

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView());
render(siteMainElement, new FilterView(filteredElementCount));

new FilmsListPresenter(filmsModel).init();
new FilmsListExtraPresenter(filmsModel, extraContainersName.TOP_RATED).init();
new FilmsListExtraPresenter(filmsModel, extraContainersName.MOST_COMMENTED).init();

render(siteFooterElement, new FooterStatisticsView(filmsModel.getFilms().length));
