import {EXSTRA_MOVIES_COUNT, extraContainersName} from "../constants";
import {getTopCommentedMovies, getTopRatedMovies} from "../mock/filter";
import {render} from "../utils/render";
import FilmsListExtraContainerView from "../view/films-list-extra-container";
import AbstractFilmListPresenter from "./abstract-list";
import FilmCardPresenter from "./film-card";

export default class FilmsListExtraPresenter extends AbstractFilmListPresenter {
  constructor(filmsModel, extraType) {
    super(filmsModel);
    this._extraType = extraType;
    this._filmListSection = new FilmsListExtraContainerView(this._extraType);
    this._filmsListContainer = this._filmListSection.getElement().querySelector(`.films-list__container`);
  }

  init() {
    this._renderBoard();
  }

  _renderFilm(container, film) {
    const filmCardPresenter = new FilmCardPresenter(this._viewActionHandler, this._modeChangeHandler);
    filmCardPresenter.init(container, film);
    this._filmPresenter[film.id] = filmCardPresenter;
  }

  _renderExtraFilms() {
    let extraMovies = [];
    if (this._extraType === extraContainersName.TOP_RATED) {
      extraMovies = getTopRatedMovies(this._getFilms());
    }

    if (this._extraType === extraContainersName.MOST_COMMENTED) {
      extraMovies = getTopCommentedMovies(this._getFilms());
    }

    for (let i = 0; i < EXSTRA_MOVIES_COUNT; i++) {
      this._renderFilm(this._filmsListContainer, extraMovies[i]);
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
