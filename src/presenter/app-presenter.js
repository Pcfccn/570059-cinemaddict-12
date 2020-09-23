import {extraContainersName} from "../constants";
import FilmsListPresenter from "./films-list";
import FilmsListExtraPresenter from "./films-list-extra";

export default class AppPresenter {
  constructor(model) {
    this._model = model;
  }
  init() {
    new FilmsListPresenter(this._model).init();
    new FilmsListExtraPresenter(this._model, extraContainersName.TOP_RATED).init();
    new FilmsListExtraPresenter(this._model, extraContainersName.MOST_COMMENTED).init();
  }
}
