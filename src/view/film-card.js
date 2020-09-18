import AbstractView from "./abstract";

const createFilmCardTemplate = (filmCard) => {

  const {movieTitle, poster, rating, year, duration, genre, shortDescription, commentCount, isInTheWatchlist, isWatched, isFavorite} = filmCard;

  const commentCountSrting = commentCount === 1 ? commentCount + ` comment` : commentCount + ` comments`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${movieTitle}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentCountSrting}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isInTheWatchlist
      ? ` film-card__controls-item--active`
      : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isWatched
      ? ` film-card__controls-item--active`
      : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorite
      ? ` film-card__controls-item--active`
      : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmcard = filmCard;
    this._callback = {};
    this._posterAndCommentsClickHandler = this._posterAndCommentsClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmcard);
  }

  _posterAndCommentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterAndCommentsClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClickHandler();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClickHandler();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClickHandler();
  }

  setPosterAndCommentsClickHandler(callback) {
    this._callback.posterAndCommentsClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._posterAndCommentsClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._posterAndCommentsClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClickHandler = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClickHandler = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClickHandler = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoritesClickHandler);
  }

  removeFilmCardClickHandlers() {
    this.getElement().querySelector(`.film-card__poster`).removeEventListener(`click`, this._posterAndCommentsClickHandler);
    this.getElement().querySelector(`.film-card__comments`).removeEventListener(`click`, this._posterAndCommentsClickHandler);
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._watchlistClickHandler);
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._watchedClickHandler);
    this.getElement().querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._favoritesClickHandler);
  }
}
