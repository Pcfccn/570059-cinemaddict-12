import {filterTypes} from "../constants";

const getFilterElementCount = (films) => {
  return {
    watchlist: films.filter((film) => film.isInTheWatchlist).length,
    history: films.filter((film) => film.isWatched).length,
    favorite: films.filter((film) => film.isFavorite).length,
  };
};

const filterFilms = (films, filterType) => {
  switch (filterType) {
    case filterTypes.ALL:
      return films;
    case filterTypes.FAVORITES:
      return films.filter((film) => film.isFavorite);
    case filterTypes.HISTORY:
      return films.filter((film) => film.isWatched);
    case filterTypes.WATCHLIST:
      return films.filter((film) => film.isInTheWatchlist);
  }
  return films;
};

const getTopRatedMovies = (films) => films.slice().sort((a, b) => a.rating < b.rating ? 1 : -1);

const getTopCommentedMovies = (films) => films.slice().sort((a, b) => a.commentCount < b.commentCount ? 1 : -1);

export {getFilterElementCount, getTopRatedMovies, getTopCommentedMovies, filterFilms};
