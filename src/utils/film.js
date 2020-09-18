import moment from "moment";
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
  const daysFromNow = Math.floor(new Date() / msPerDay) - Math.floor(date / msPerDay);
  switch (daysFromNow) {
    case 0:
      return `today`;
    case 1:
    case 2:
      return `${daysFromNow} days ago`;
    default:
      return moment(date).format(`YYYY/MM/DD HH:MM`);
  }
};

export {sortDateDown, sortRatingDown, formateCommentDate};
