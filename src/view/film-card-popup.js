import {emojyes} from "../constants";
import SmartView from "./smart";
import he from "he";

const getInputState = (value) => value ? ` checked` : ``;

const createComments = (comments, commentCount) => {
  const commentsTemplate = comments.previousComments.map((currentComment) => {
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
            <button class="film-details__comment-delete" value="${currentComment.id}">Delete</button>
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
    isInTheWatchlistInputState, isWatchedInputState, isFavoriteInputState, filmComments, newComment, newCommentEmoji} = data;
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
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${newCommentEmoji}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(newComment.comment)}</textarea>
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

export default class FilmCardPopupView extends SmartView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;

    this._data = FilmCardPopupView.parseFilmToData(filmCard);
    this._callback = {};

    this._closeButtonHandler = this._closeButtonHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._commentTextInputHandler = this._commentTextInputHandler.bind(this);
    this._setCommentFormSubmitHandler = this._setCommentFormSubmitHandler.bind(this);
    this._emojiListHandler = this._emojiListHandler.bind(this);

    this.setInnerHandlers();
  }

  getTemplate() {
    return createFilmCardPopupTemplate(this._data);
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

  restoreHandlers() {
    this.setInnerHandlers();
    this.setWatchlistClickHandler(this._callback.watchlistClickHandler);
    this.setWatchedClickHandler(this._callback.watchedClickHandler);
    this.setFavoritesClickHandler(this._callback.favoritesClickHandler);
  }

  setInnerHandlers() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentTextInputHandler);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiListHandler);
    this._setCommentFormSubmitHandler();
  }

  reset(film) {
    this.updateData(
        FilmCardPopupView.parseFilmToData(film)
    );
  }

  setSubmitPopupHandler(callback) {
    this._callback.submitPopupHandler = callback;
  }

  _commentTextInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newComment: {comment: evt.target.value}
    }, true);
  }

  _emojiListHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newCommentEmoji: emojyes.includes(evt.target.value)
        ? `<img src="./images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji"></img>`
        : ``,
      emoji: evt.target.value
    });
  }

  _setCommentFormSubmitHandler() {
    let pressed = new Set();
    const checkKeys = (evt) => {
      pressed.add(evt.key);
      for (let key of [`Enter`, `Control`]) {
        if (!pressed.has(key)) {
          return;
        }
      }
      pressed.clear();
      // this.getElement().querySelector(`.film-details__inner`).submit();
      FilmCardPopupView.parseDataToFilm(this._data);
      this._callback.submitPopupHandler();
    };
    this.getElement().querySelector(`.film-details__inner`).addEventListener(`keydown`, checkKeys);
    this.getElement().querySelector(`.film-details__inner`).addEventListener(`keyup`, function (evt) {
      pressed.delete(evt.key);
    });
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

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentDeleteClickHandler(evt);
  }

  setCommentDeleteClickHandler(callback) {
    this._callback.commentDeleteClickHandler = callback;
    this.getElement().querySelector(`.film-details__comments-list`).addEventListener(`click`, this._commentDeleteClickHandler);
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
      newComment: filmCard.comments.newComment,
      emoji: filmCard.comments.newComment.emotion,
      newCommentEmoji: emojyes.includes(filmCard.comments.newComment.emotion)
        ? `<img src="./images/emoji/${filmCard.comments.newComment.emotion}.png" width="55" height="55" alt="emoji"></img>`
        : ``,
    });
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);
    data.comments.newComment.comment = data.newComment.comment !== `` ? data.newComment.comment : ``;
    delete data.newComment;
    data.comments.newComment.emotion = data.emoji ? data.emoji : ``;
    delete data.emoji;

    delete data.writers;
    delete data.actors;
    delete data.genres;
    delete data.isInTheWatchlistInputState;
    delete data.isWatchedInputState;
    delete data.isFavoriteInputState;
    delete data.filmComments;
    delete data.newCommentEmoji;
    return data;
  }
}
