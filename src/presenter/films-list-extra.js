import {EXSTRA_MOVIES_COUNT} from "../constants";
import {render} from "../utils/render";
import AbstractFilmListPresenter from "./abstract-list";
import FilmCardPresenter from "./film-card";

export default class FilmsListExtraPresenter extends AbstractFilmListPresenter {
  constructor(siteMainElement, filmsModel, api, extraMovies, filmListSection, filmsListContainer) {
    super(siteMainElement, filmsModel, api);
    this._extraMovies = extraMovies;
    this._filmListSection = filmListSection;
    this._filmsListContainer = filmsListContainer;
  }

  init() {
    this._siteMainFilms = this._siteMainElement.querySelector(`.films`);
    this._renderBoard();
  }

  _renderFilm(container, film) {
    const filmCardPresenter = new FilmCardPresenter(this._viewActionHandler, this._modeChangeHandler, this._api);
    filmCardPresenter.init(container, film);
    this._filmPresenter[film.id] = filmCardPresenter;
  }

  _renderExtraFilms() {
    for (let i = 0; i < EXSTRA_MOVIES_COUNT; i++) {
      this._renderFilm(this._filmsListContainer, this._extraMovies[i]);
    }
    render(this._siteMainFilms, this._filmListSection);
  }

  _renderBoard() {
    if (!this._getFilms().length) {
      return;
    }
    this._renderExtraFilms();
  }
}
