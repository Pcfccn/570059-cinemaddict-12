import {months} from "../constants";

const sortDateDown = (filmA, filmB) => {
  const [dayA, monthA, yearA] = filmA.dateOfRelease.split(` `);
  const [dayB, monthB, yearB] = filmB.dateOfRelease.split(` `);

  if (yearB !== yearA) {
    return yearB - yearA;
  } else if (monthB !== monthA) {
    return months.indexOf(monthA) - months.indexOf(monthA);
  } else if (dayB !== dayA) {
    return dayB - dayA;
  } else {
    return 0;
  }
};

const sortRatingDown = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export {sortDateDown, sortRatingDown};
