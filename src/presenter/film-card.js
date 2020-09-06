import FilmCardView from "../view/film-card";
import FilmCardPopupView from "../view/film-card-popup";
import {render, remove, replace} from "../utils/render";
import {keyboardKey} from "../constants";

export default class FilmCardPresenter {
  constructor() {
    this._filmCard = null;
    this._filmPopup = null;

    this._posterAndCommentsClickHandler = this._posterAndCommentsClickHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  init(container, film) {
    this._film = film;
    this._container = container;

    const previousFilmCard = this._filmCard;
    const previousFilmPopup = this._filmPopup;

    this._filmCard = new FilmCardView(this._film);
    this._filmPopup = new FilmCardPopupView(this._film);

    this._filmCard.setPosterAndCommentsClickHandler(this._posterAndCommentsClickHandler);
    this._filmCard.setWatchlistClickHandler(this._watchlistClickHandler);
    this._filmCard.setWatchedClickHandler(this._watchedClickHandler);
    this._filmCard.setFavoritesClickHandler(this._favoritesClickHandler);

    if (!previousFilmCard || !previousFilmPopup) {
      render(this._container, this._filmCard);
      return;
    }

    if (this._container.getElement().contains(previousFilmCard.getElement())) {
      replace(this._filmCard, previousFilmCard);
    }

    if (this._container.getElement().contains(previousFilmPopup.getElement())) {
      replace(this._filmPopup, previousFilmPopup);
    }

    remove(previousFilmCard);
    remove(previousFilmPopup);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmPopup);
  }

  _showPopup() {
    render(document.body, this._filmPopup);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._filmPopup.setCloseButtonHandler(this._closeButtonClickHandler);
    this._filmCard.removeFilmCardClickHandlers();
  }

  _closePopup() {
    remove(this._filmPopup);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._filmPopup.removeCloseButtonHandler(this._closeButtonClickHandler);
    this._filmCard.setPosterAndCommentsClickHandler(this._posterAndCommentsClickHandler);
    this._filmCard.setWatchlistClickHandler(this._watchlistClickHandler);
    this._filmCard.setWatchedClickHandler(this._watchedClickHandler);
    this._filmCard.setFavoritesClickHandler(this._favoritesClickHandler);
  }

  _onEscKeyDown(evt) {
    if (evt.key === keyboardKey.ESCAPE || evt.key === keyboardKey.ESC) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _posterAndCommentsClickHandler() {
    this._showPopup();
  }

  _closeButtonClickHandler() {
    this._closePopup();
  }

  _escKeyDownHandler(evt) {
    this._onEscKeyDown(evt);
  }

  _watchlistClickHandler() {
    console.log(`hi man!`);
  }

  _watchedClickHandler() {

  }

  _favoritesClickHandler() {

  }
}
