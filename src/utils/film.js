import {months} from "../constants";

const sortDateDown = (filmA, filmB) => {
  const filmAseparatedDate = filmA.dateOfRelease.split(` `);
  const filmBseparatedDate = filmB.dateOfRelease.split(` `);

  if (filmBseparatedDate[2] !== filmAseparatedDate[2]) {
    return filmBseparatedDate[2] - filmAseparatedDate[2];
  } if (filmBseparatedDate[1] !== filmAseparatedDate[1]) {
    return months.indexOf(filmBseparatedDate[1]) - months.indexOf(filmAseparatedDate[1]);
  } if (filmBseparatedDate[0] !== filmAseparatedDate[0]) {
    return filmBseparatedDate[0] - filmAseparatedDate[0];
  } else {
    return 0;
  }
};

const sortRatingDown = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export {sortDateDown, sortRatingDown};
