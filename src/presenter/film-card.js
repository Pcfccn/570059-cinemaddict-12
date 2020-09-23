import FilmCardView from "../view/film-card";
import FilmCardPopupView from "../view/film-card-popup";
import {render, remove, replace} from "../utils/render";
import {HTMLTagName, keyboardKey, mode, updateTypes, userActions} from "../constants";

export default class FilmCardPresenter {
  constructor(changeData, changeMode) {
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmCard = null;
    this._filmPopup = null;
    this._mode = mode.DEFAULT;

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._posterAndCommentsClickHandler = this._posterAndCommentsClickHandler.bind(this);
    this._submitPopup = this._submitPopup.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
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
    this._filmPopup.setSubmitPopupHandler(this._submitPopup);
    this._filmPopup.setCommentDeleteClickHandler(this._commentDeleteClickHandler);

    if (!previousFilmCard || !previousFilmPopup) {
      render(this._container, this._filmCard);
      return;
    }

    if (this._mode === mode.DEFAULT) {
      replace(this._filmCard, previousFilmCard);
    }

    if (this._mode === mode.POPUP) {
      replace(this._filmPopup, previousFilmPopup);
      replace(this._filmCard, previousFilmCard);
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
    this._filmPopup.setSubmitPopupHandler(this._submitPopup);
    this._filmPopup.setCommentDeleteClickHandler(this._commentDeleteClickHandler);

    this._changeMode();
    this._mode = mode.POPUP;
  }

  _closePopup() {
    this._filmPopup.reset(this._film);
    remove(this._filmPopup);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);

    this._mode = mode.DEFAULT;
  }

  _commentDeleteClickHandler(evt) {
    if (evt.target.tagName !== HTMLTagName.BUTTON) {
      return;
    }
    this._changeData(
        userActions.UPDATE_FILM,
        updateTypes.PATCH,
        Object.assign(
            {},
            this._film,
            {commentCount: this._film.commentCount - 1},
            {comments: Object.assign(
                {},
                this._film.comments,
                {previousComments: this._film.comments.previousComments.slice().filter((comment) => comment.id !== +evt.target.value)}
            )}
        )
    );
  }

  _submitPopup() {
    remove(this._filmPopup);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);

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
    this._changeData(
        userActions.UPDATE_FILM,
        updateTypes.MINOR,
        Object.assign({}, this._film, {isInTheWatchlist: !this._film.isInTheWatchlist}));
  }

  _watchedClickHandler() {
    this._changeData(
        userActions.UPDATE_FILM,
        updateTypes.MINOR,
        Object.assign({}, this._film, {isWatched: !this._film.isWatched}));
  }

  _favoritesClickHandler() {
    this._changeData(
        userActions.UPDATE_FILM,
        updateTypes.MINOR,
        Object.assign({}, this._film, {isFavorite: !this._film.isFavorite}));
  }
}
