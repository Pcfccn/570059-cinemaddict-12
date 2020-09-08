import {films, descriptionText, genres, months, actors, countries, ageRatings, emojyes, FILM_COUNT} from '../constants.js';
import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {formateCommentDate} from '../utils/film';


const generateDescription = () => {
  const descriptionSentenсes = descriptionText.replace(/\r?\n/g, ``).split(`.`);
  const countDescriptionSentences = getRandomInteger(1, 5);
  const descriptionSet = new Set();
  for (let i = 0; i < countDescriptionSentences; i++) {
    descriptionSet.add(getRandomArrayElement(descriptionSentenсes));
  }

  return Array.from(descriptionSet).join(`. `);
};

const generateDuration = () => {
  let duration = ``;
  const durationMinute = getRandomInteger(15, 240);
  if (durationMinute % 60 === 0) {
    duration = `${durationMinute / 60}h`;
  } else if (durationMinute / 60 < 1) {
    duration = `${durationMinute}m`;
  } else {
    duration = `${Math.floor(durationMinute / 60)}h ${durationMinute % 60}m`;
  }
  return duration;
};

const generateRandomDate = (start = new Date(1900, 0, 0), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const formateDate = (date) => {
  return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};


const createCommentDate = () => {
  const commentDate = generateRandomDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7));
  return formateCommentDate(commentDate);
};


const generateComment = () => {
  return {
    emogi: getRandomArrayElement(emojyes),
    date: createCommentDate(),
    autor: getRandomArrayElement(actors),
    message: getRandomArrayElement(descriptionText.replace(/\r?\n/g, ``).split(`.`))
  };
};

const generateFakeId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateFilmCard = () => {

  const muvieNumber = getRandomInteger(0, films.length - 1);
  const description = generateDescription();
  const shortDescription = description.length > 140
    ? description.slice(0, 138) + `...`
    : description;

  const randomDate = generateRandomDate();
  const year = randomDate.getFullYear();
  const dateOfRelease = formateDate(randomDate);
  const comments = new Array(getRandomInteger(0, 5)).fill().map(generateComment);
  const filmGenres = new Array(getRandomInteger(1, 5)).fill().map(() => getRandomArrayElement(genres));
  const screenWriters = new Array(getRandomInteger(1, 5)).fill().map(() => getRandomArrayElement(actors));
  const cast = new Array(getRandomInteger(1, 5)).fill().map(() => getRandomArrayElement(actors));

  return {
    id: generateFakeId(),
    movieTitle: films[muvieNumber].title,
    originalMovieTitle: films[muvieNumber].title,
    director: getRandomArrayElement(actors),
    screenWriters,
    cast,
    poster: films[muvieNumber].poster,
    rating: `${getRandomInteger(2, 9)}.${getRandomInteger(0, 9)}`,
    year,
    dateOfRelease,
    duration: generateDuration(),
    country: getRandomArrayElement(countries),
    filmGenres,
    description,
    shortDescription,
    ageRating: getRandomArrayElement(ageRatings),
    comments,
    commentCount: comments.length,
    isInTheWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

const generateFilmCards = () => new Array(FILM_COUNT).fill().map(generateFilmCard);

export {generateFilmCards};
