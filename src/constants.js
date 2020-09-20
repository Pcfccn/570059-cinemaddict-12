const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;
const EXSTRA_MOVIES_COUNT = 2;

const films = [
  {title: `Made for each other`, poster: `made-for-each-other.png`},
  {title: `Popeye meets sinbad`, poster: `popeye-meets-sinbad.png`},
  {title: `Sagebrush trail`, poster: `sagebrush-trail.jpg`},
  {title: `Santa claus conquers the martians`, poster: `santa-claus-conquers-the-martians.jpg`},
  {title: `The dance of life`, poster: `the-dance-of-life.jpg`},
  {title: `The great flamarion`, poster: `the-great-flamarion.jpg`},
  {title: `The man with the golden arm`, poster: `the-man-with-the-golden-arm.jpg`},
];


const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra.
Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis.
Aliquam erat volutpat.
Nunc fermentum tortor ac porta dapibus.
In rutrum ac purus sit amet tempus`;

const genres = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`];

const months = [`January`, `February`, `March`,	`April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const actors = [`Leonardo DiCaprio`, `Chris Hemsworth`, `Bradley Cooper`, `Tom Cruise`,
  `Robert Downey Jr.`, `Jerome Allen`, `Adam Sandler`, `Vin diesel`, `Thomas Jeffrey Hanks`, `Dwayne Johnson`];

const countries = [
  `Afghanistan`,
  `Åland Islands`,
  `Albania`,
  `Algeria`,
  `American Samoa`,
  `AndorrA`,
  `Angola`,
  `Anguilla`,
  `Antarctica`,
  `Antigua and Barbuda`,
  `Argentina`,
  `Armenia`,
  `Aruba`,
  `Australia`,
  `Austria`,
  `Azerbaijan`,
  `Bahamas`,
  `Bahrain`,
  `Bangladesh`,
];

const ageRatings = [`0+`, `3+`, `7+`, `14+`, `16+`, `18+`, `21+`];

const emojyes = [`smile`, `sleeping`, `puke`, `angry`];

const renderPosition = {
  AFTER_BEGIN: `afterBegin`,
  BEFORE_END: `beforeEnd`,
};

const extraContainersName = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const sortTypes = {
  DEFAULT: `default`,
  BY_DATE: `byDate`,
  BY_RATING: `byRating`
};

const HTMLTagName = {
  a: `A`
};

const keyboardKey = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

const mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

const userActions = {
  UPDATE_FILM: `UPDATE_FILM`,
  SUBMIT_COMMENT: `SUBMIT_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

const updateTypes = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export {FILM_COUNT, FILM_COUNT_PER_STEP, films, descriptionText, genres, months, actors, countries,
  ageRatings, emojyes, renderPosition, extraContainersName, EXSTRA_MOVIES_COUNT, sortTypes, HTMLTagName,
  keyboardKey, mode, userActions, updateTypes};
