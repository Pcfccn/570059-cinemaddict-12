import {extraContainersName} from "../constants";
import FilmsListPresenter from "./films-list";
import FilmsListExtraPresenter from "./films-list-extra";
import FilterPresenter from "./filter";

export default class AppPresenter {
  constructor(siteMainElement, filterModel, filmsModel) {
    this._siteMainElement = siteMainElement;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
  }
  init() {
    new FilterPresenter(this._siteMainElement, this._filterModel, this._filmsModel).init();
    new FilmsListPresenter(this._filmsModel, this._filterModel).init();
    new FilmsListExtraPresenter(this._filmsModel, extraContainersName.TOP_RATED).init();
    new FilmsListExtraPresenter(this._filmsModel, extraContainersName.MOST_COMMENTED).init();
  }
}
