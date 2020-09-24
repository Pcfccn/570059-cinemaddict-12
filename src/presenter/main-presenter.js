import {extraContainersName, filterTypes} from "../constants";
import {getTopCommentedMovies, getTopRatedMovies} from "../utils/filter";
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
  }
  init() {
    new FilterPresenter(this._siteMainElement, this._filterModel, this._filmsModel).init();

    if (this._filterModel.getFilter() === filterTypes.STATISTIC) {
      new StatisticPresenter(this._siteMainElement, this._filmsModel).init();
      return;
    }

    new FilmsListPresenter(this._siteMainElement, this._filmsModel, this._filterModel).init();

    const films = this._filmsModel.getFilms();

    const topRatedMovies = getTopRatedMovies(films);
    this._topRatedMoviesSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED);
    this._topRatedMoviesContainer = this._topRatedMoviesSection.getElement().querySelector(`.films-list__container`);
    new FilmsListExtraPresenter(this._siteMainElement, this._filmsModel, topRatedMovies,
        this._topRatedMoviesSection, this._topRatedMoviesContainer).init();

    const topCommentedMovies = getTopCommentedMovies(films);
    this._topCommentedMoviesSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED);
    this._topCommentedMoviesContainer = this._topCommentedMoviesSection.getElement().querySelector(`.films-list__container`);
    new FilmsListExtraPresenter(this._siteMainElement, this._filmsModel, topCommentedMovies,
        this._topCommentedMoviesSection, this._topCommentedMoviesContainer).init();
  }
}
