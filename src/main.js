import FilmCardView from './view/film-card';
import FilmsListContainerView from './view/films-list-container.js';
import FilmsListExtraContainerView from './view/films-list-extra-container.js';
import FooterStatisticsnView from './view/footer-statistic.js';
import HeaderProfileView from './view/header-profile.js';
import LoadMoreButonView from './view/load-more-button.js';
import FilterView from './view/filter.js';
import SortView from './view/main-sort.js';
import {generateFilmCards} from './mock/film-card.js';
import {getFilterElementCount, getTopRatedMovies, getTopCommentedMovies} from './mock/filter.js';
import {FILM_COUNT_PER_STEP, extraContainersName, EXSTRA_MOVIES_COUNT} from './constants';
import {renderElement} from './utils.js';
import FilmCardPopupView from './view/film-card-popup.js';


const films = generateFilmCards();
const filteredElementCount = getFilterElementCount(films);
const topRatedMovies = getTopRatedMovies(films);
const topCommentedMovies = getTopCommentedMovies(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

renderElement(siteHeaderElement, new HeaderProfileView().getElement());
renderElement(siteMainElement, new FilterView(filteredElementCount).getElement());
renderElement(siteMainElement, new SortView().getElement());
renderElement(siteMainElement, new FilmsListContainerView().getElement());

const siteMainFilmsListContainer = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderElement(siteMainFilmsListContainer, new FilmCardView(films[i]).getElement());
}

const siteMainFilmsList = siteMainElement.querySelector(`.films-list`);


if (films.length > FILM_COUNT_PER_STEP) {
  renderElement(siteMainFilmsList, new LoadMoreButonView().getElement());
  const loadMoreButton = siteMainFilmsList.querySelector(`.films-list__show-more`);

  let renderedFilmCount = FILM_COUNT_PER_STEP;

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
    .forEach((film) => renderElement(siteMainFilmsListContainer, new FilmCardView(film).getElement()));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount > films.length) {
      loadMoreButton.remove();
    }
  });
}


const siteMainFilms = siteMainElement.querySelector(`.films`);


const filmsListTopRatedSection = new FilmsListExtraContainerView(extraContainersName.TOP_RATED).getElement();
const filmsListTopRatedContainer = filmsListTopRatedSection.querySelector(`.films-list__container`);
for (let i = 0; i < EXSTRA_MOVIES_COUNT; i++) {
  renderElement(filmsListTopRatedContainer, new FilmCardView(topRatedMovies[i]).getElement());
}
renderElement(siteMainFilms, filmsListTopRatedSection);


const filmsListTopCommentedSection = new FilmsListExtraContainerView(extraContainersName.MOST_COMMENTED).getElement();
const filmsListTopCommentedContainer = filmsListTopCommentedSection.querySelector(`.films-list__container`);
for (let i = 0; i < EXSTRA_MOVIES_COUNT; i++) {
  renderElement(filmsListTopCommentedContainer, new FilmCardView(topCommentedMovies[i]).getElement());
}
renderElement(siteMainFilms, filmsListTopCommentedSection);


renderElement(siteFooterElement, new FooterStatisticsnView().getElement());


renderElement(document.body, new FilmCardPopupView(films[0]).getElement());
