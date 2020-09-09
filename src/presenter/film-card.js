import FilmCardView from "../view/film-card";
import FilmCardPopupView from "../view/film-card-popup";
import {render, remove, replace} from "../utils/render";
import {keyboardKey, mode} from "../constants";

export default class FilmCardPresenter {
  constructor(changeData, changeMode) {
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmCard = null;
    this._filmPopup = null;
    this._mode = mode.DEFAULT;

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
    this._filmPopup.setWatchlistClickHandler(this._watchlistClickHandler);
    this._filmPopup.setWatchedClickHandler(this._watchedClickHandler);
    this._filmPopup.setFavoritesClickHandler(this._favoritesClickHandler);
    this._filmPopup.setCloseButtonHandler(this._closeButtonClickHandler);

    if (!previousFilmCard || !previousFilmPopup) {
      render(this._container, this._filmCard);
      return;
    }

    if (this.mode === mode.DEFAULT) {
      replace(this._filmCard, previousFilmCard);
    }

    if (this.mode === mode.POPUP) {
      replace(this._filmPopup, previousFilmPopup);
    }

    remove(previousFilmCard);
    remove(previousFilmPopup);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmPopup);
  }

  resetView() {
    if (this._mode !== mode.DEFAULT) {
      this._closePopup();
    }
  }

  _showPopup() {
    render(document.body, this._filmPopup);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._filmPopup.setCloseButtonHandler(this._closeButtonClickHandler);
    this._filmPopup.setWatchlistClickHandler(this._watchlistClickHandler);
    this._filmPopup.setWatchedClickHandler(this._watchedClickHandler);
    this._filmPopup.setFavoritesClickHandler(this._favoritesClickHandler);
    this._filmPopup.setInnerHandlers();

    this._changeMode();
    this._mode = mode.POPUP;
  }

  _closePopup() {
    this._filmPopup.reset(this._film);
    remove(this._filmPopup);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._filmCard.setPosterAndCommentsClickHandler(this._posterAndCommentsClickHandler);
    this._filmCard.setWatchlistClickHandler(this._watchlistClickHandler);
    this._filmCard.setWatchedClickHandler(this._watchedClickHandler);
    this._filmCard.setFavoritesClickHandler(this._favoritesClickHandler);

    this._mode = mode.DEFAULT;
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
    this._changeData(Object.assign({}, this._film, {isInTheWatchlist: !this._film.isInTheWatchlist}));
  }

  _watchedClickHandler() {
    this._changeData(Object.assign({}, this._film, {isWatched: !this._film.isWatched}));
  }

  _favoritesClickHandler() {
    this._changeData(Object.assign({}, this._film, {isFavorite: !this._film.isFavorite}));
  }
}
