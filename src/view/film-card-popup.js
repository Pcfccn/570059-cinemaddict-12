import AbstractView from "./abstract";
import {formateCommentDate} from "../utils/film";

const getInputState = (value) => value ? ` checked` : ``;

const createComments = (comments, commentCount) => {
  const commentsTemplate = comments.map((currentComment) => {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${currentComment.emogi}.png" width="55" height="55" alt="emoji-${currentComment.emogi}">
        </span>
        <div>
          <p class="film-details__comment-text">${currentComment.message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${currentComment.autor}</span>
            <span class="film-details__comment-day">${currentComment.date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`);
  }).join(` `);
  return (
    `<ul class="film-details__comments-list">
      ${commentCount ? commentsTemplate : ``}
    </ul>`
  );
};

const createFilmCardPopupTemplate = (data) => {

  const {movieTitle, originalMovieTitle, director, poster, rating, dateOfRelease, duration,
    country, description, ageRating, commentCount, writers, actors, genres,
    isInTheWatchlistInputState, isWatchedInputState, isFavoriteInputState, filmComments} = data;
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${movieTitle}</h3>
                  <p class="film-details__title-original">Original: ${originalMovieTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dateOfRelease}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genres}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${isInTheWatchlistInputState}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${isWatchedInputState}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${isFavoriteInputState}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

              ${filmComments}

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmCardPopupView extends AbstractView {
  constructor(filmCard) {
    super();
    this._data = FilmCardPopupView.parseFilmToData(filmCard);
    this._callback = {};

    this._closeButtonHandler = this._closeButtonHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardPopupTemplate(this._data);
  }

  _closeButtonHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonHandler();
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

  setCloseButtonHandler(callback) {
    this._callback.closeButtonHandler = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClickHandler = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClickHandler = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClickHandler = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoritesClickHandler);
  }

  removeFilmPopupHandlers() {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._closeButtonHandler);
    this.getElement().querySelector(`.film-details__control-label--watchlist`).removeEventListener(`click`, this._watchlistClickHandler);
    this.getElement().querySelector(`.film-details__control-label--watched`).removeEventListener(`click`, this._watchedClickHandler);
    this.getElement().querySelector(`.film-details__control-label--favorite`).removeEventListener(`click`, this._favoritesClickHandler);
  }

  static parseFilmToData(filmCard) {
    return Object.assign({}, filmCard, {
      writers: filmCard.screenWriters.join(`, `),
      actors: filmCard.cast.join(`, `),
      genres: filmCard.filmGenres.map((it) => `<span class="film-details__genre">${it}</span>`).join(` `),
      isInTheWatchlistInputState: getInputState(filmCard.isInTheWatchlist),
      isWatchedInputState: getInputState(filmCard.isWatched),
      isFavoriteInputState: getInputState(filmCard.isFavorite),
      filmComments: createComments(filmCard.comments, filmCard.commentCount),
      newComment: {
        comment: ``,
        date: formateCommentDate(new Date()),
        emotion: `smile`,
        autor: `You`,
      }
    });
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);
    if (data.newComment.comment !== ``) {
      data = Object.assign(data, {comments: data.newComment});
    }

    delete data.writers;
    delete data.actors;
    delete data.genres;
    delete data.isInTheWatchlistInputState;
    delete data.isWatchedInputState;
    delete data.isFavoriteInputState;
    delete data.newComment;

    return data;
  }
}
