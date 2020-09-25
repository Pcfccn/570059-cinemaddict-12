import {updateTypes, userActions} from "../constants";
import FilmCardPresenter from "./film-card";

export default class AbstractFilmListPresenter {
  constructor(siteMainElement, filmsModel) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._filmPresenter = {};

    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._мodelEventHandler = this._мodelEventHandler.bind(this);
    this._viewActionHandler = this._viewActionHandler.bind(this);


    this._filmsModel.addObserver(this._мodelEventHandler);
  }

  init() {
    this._renderBoard();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _modeChangeHandler() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _мodelEventHandler(updateType, updatedFilm) {
    switch (updateType) {
      case updateTypes.PATCH:
        if (!this._filmPresenter[updatedFilm.id]) {
          return;
        }
        this._filmPresenter[updatedFilm.id].init(this._siteMainFilmsListContainer, updatedFilm);
        break;
      case updateTypes.MINOR:
        this.clearBoard();
        this._renderBoard();
        break;
      case updateTypes.MAJOR:
        this.clearBoard(true, true);
        this._renderBoard();
        break;
    }
  }

  clearBoard() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
  }

  _renderFilm(container, film) {
    const filmCardPresenter = new FilmCardPresenter(this._viewActionHandler, this._modeChangeHandler);
    filmCardPresenter.init(container, film);
    this._filmPresenter[film.id] = filmCardPresenter;
  }

  _renderFilms(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _viewActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case userActions.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case userActions.SUBMIT_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
    }
  }
}
