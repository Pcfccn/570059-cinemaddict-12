import {createElement} from "../utils";

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

export default class FilmCardView {
  constructor(filmCard) {
    this._element = null;
    this._filmcard = filmCard;
  }

  getTemlate() {
    return createFilmCardTemplate(this._filmcard);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemlate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
