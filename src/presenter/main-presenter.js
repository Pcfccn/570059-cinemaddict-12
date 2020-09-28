import {extraContainersName, routes} from "../constants";
import {getTopCommentedMovies, getTopRatedMovies} from "../utils/filter";
import {remove} from "../utils/render";
import FilmsListExtraContainerView from "../view/films-list-extra-container";
import FilmsListPresenter from "./films-list";
import FilmsListExtraPresenter from "./films-list-extra";
import FilterPresenter from "./filter";
import StatisticPresenter from "./statistic";

export default class MainPresenter {
  constructor(siteMainElement, filterModel, filmsModel) {
    this._siteMainElement = siteMainElement;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._route = routes.MAIN;

    this._routeChancgeHandler = this._routeChancgeHandler.bind(this);
  }
  init() {
    this._filterPresenter = new FilterPresenter(this._siteMainElement, this._filterModel, this._filmsModel, this._routeChancgeHandler);
    this._filterPresenter.init();

    if (this._route === routes.STATISTIC) {
      this._statisticPresenter = new StatisticPresenter(this._siteMainElement, this._filmsModel);
      this._statisticPresenter.init();
      return;
    }

    this._filmsListPresenter = new FilmsListPresenter(this._siteMainElement, this._filmsModel, this._filterModel);
    this._filmsListPresenter.init();

    const films = this._filmsModel.getFilms();

    const topRatedMovies = getTopRatedMovies(films);
    this._topRatedMoviesSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED);
    this._topRatedMoviesContainer = this._topRatedMoviesSection.getElement().querySelector(`.films-list__container`);
    this._filmsListRatedExtraPresenter = new FilmsListExtraPresenter(this._siteMainElement, this._filmsModel, topRatedMovies,
        this._topRatedMoviesSection, this._topRatedMoviesContainer);
    this._filmsListRatedExtraPresenter.init();

    const topCommentedMovies = getTopCommentedMovies(films);
    this._topCommentedMoviesSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED);
    this._topCommentedMoviesContainer = this._topCommentedMoviesSection.getElement().querySelector(`.films-list__container`);
    this._filmsListCommentedExtraPresenter = new FilmsListExtraPresenter(this._siteMainElement, this._filmsModel, topCommentedMovies,
        this._topCommentedMoviesSection, this._topCommentedMoviesContainer);
    this._filmsListCommentedExtraPresenter.init();
  }

  destroyMainPresener() {
    this._filterPresenter.destroy();
    if (this._statisticPresenter) {
      this._statisticPresenter.destroy();
    }
    this._filmsListPresenter.deepClearBoard();
    this._filmsListRatedExtraPresenter.clearBoard();
    this._filmsListCommentedExtraPresenter.clearBoard();

    remove(this._topRatedMoviesSection);
    remove(this._topCommentedMoviesSection);
  }

  _routeChancgeHandler(route) {
    let newRoute;
    if (route === routes.STATISTIC) {
      newRoute = routes.STATISTIC;
    } else {
      newRoute = routes.MAIN;
    }
    if (this._route !== newRoute) {
      this._route = newRoute;
      this.destroyMainPresener();
      this.init();
    }
  }
}
