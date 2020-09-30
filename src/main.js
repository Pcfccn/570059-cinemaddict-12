import FooterStatisticsView from './view/footer-statistic.js';
import HeaderProfileView from './view/header-profile.js';
import {render, remove} from './utils/render';
import FilmsModel from './model/movies.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterModel from './model/filter.js';
import Api from './api.js';
import {AUTHORIZATION, END_POINT} from './constants.js';
import LoadingView from './view/loading.js';

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView());

const loadingComponent = new LoadingView();
const mainPresenter = new MainPresenter(siteMainElement, filterModel, filmsModel, api);
let footerComponent = new FooterStatisticsView(filmsModel.getFilms().length);

mainPresenter.init();
render(siteMainElement, loadingComponent);
render(siteFooterElement, footerComponent);

api.getFilms()
.then((movies) => {
  filmsModel.setFilms(movies.map((movie) => Api.adaptToClient(movie)));

  remove(loadingComponent);
  mainPresenter.destroyMainPresener();
  remove(footerComponent);

  footerComponent = new FooterStatisticsView(filmsModel.getFilms().length);
  mainPresenter.init();
  render(siteFooterElement, footerComponent);
});
