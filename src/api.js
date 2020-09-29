import moment from "moment";
import {formateCommentDate} from "./utils/film";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(Api.toJSON);
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then(Api.toJSON);
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }

  addComment(movieId, comment) {
    const adaptedComment = Api.adaptToServer(comment);
    return this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(adaptedComment),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          movieTitle: film.film_info.title,
          originalMovieTitle: film.film_info.alternative_title,
          director: film.film_info.director,
          screenWriters: film.film_info.writers,
          cast: film.film_info.actors,
          poster: film.film_info.poster,
          rating: film.film_info.total_rating,
          year: moment(film.film_info.release.date).format(`YYYY`),
          dateOfRelease: moment(film.film_info.release.date).format(`DD MMMM YYYY`),
          duration: film.film_info.runtime,
          country: film.film_info.release.release_country,
          filmGenres: film.film_info.genre,
          description: film.film_info.description,
          shortDescription: film.film_info.title,
          ageRating: film.film_info.age_rating,

          comments: Object.assign(
              {},
              {
                newComment: {
                  comment: ``,
                  date: formateCommentDate(new Date()),
                  emotion: ``,
                }},
              {previousComments: {}}
          ),

          commentCount: film.comments.length,
          isInTheWatchlist: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          watchingDate: film.watching_date,
          isFavorite: film.user_details.favorite,
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          date: new Date().toISOString()
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedComment.dueDate;
    delete adaptedComment.isArchive;
    delete adaptedComment.isFavorite;
    delete adaptedComment.repeating;
    return adaptedComment;
  }
}
