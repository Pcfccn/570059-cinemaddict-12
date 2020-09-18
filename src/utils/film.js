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

const formateCommentDate = (date) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  if ((date - new Date()) < msPerDay && date.getDay() === new Date().getDay()) {
    return `today`;
  } else if ((date - new Date()) < msPerDay * 2 && date.getDay() === new Date().getDay() - 1) {
    return `1 day ago`;
  } else if ((date - new Date()) < msPerDay * 3 && date.getDay() === new Date().getDay() - 2) {
    return `2 days ago`;
  } else {
    return `${date.getFullYear()}/${date.getMonth() > 8
      ? date.getMonth() + 1
      : `0` + (date.getMonth() + 1)}/${date.getDate() > 9
      ? date.getDate()
      : `0` + date.getDate()} ${date.getHours() > 9
      ? date.getHours()
      : `0` + date.getHours()}:${date.getMinutes() > 9
      ? date.getMinutes()
      : `0` + date.getMinutes()}`;
  }
};

export {sortDateDown, sortRatingDown, formateCommentDate};
