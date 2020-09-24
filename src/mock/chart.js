import {genres} from "../constants";
import {getRandomInteger} from "../utils/common";


const getOneChartRandomData = () => {
  let oneChartData = {};
  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i];
    oneChartData[genre] = getRandomInteger(0, 3);
  }
  return oneChartData;
};

const getOneStatisticData = (arr) =>{
  let stat = {};
  stat.youWatched = Object.values(arr).reduce((sum, value) => sum + value, 0);
  stat.totalDuration = getRandomInteger(15, 24 * 60);
  stat.topGenre = Object.entries(arr).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr)[0];
  return stat;
};


const increase = (someData) => {
  let newData = Object.assign({}, someData);
  for (let i = 0; i < Object.keys(someData).length; i++) {
    newData[Object.keys(newData)[i]] = Math.floor(Object.values(newData)[i] * (Math.random() + 1) * 2) + 1;
  }
  return newData;
};

const today = getOneChartRandomData();
const statToday = getOneStatisticData(today);
const week = increase(today);
const statWeek = getOneStatisticData(week);
const month = increase(week);
const statMonth = getOneStatisticData(month);
const year = increase(month);
const statYear = getOneStatisticData(year);
const allTime = increase(year);
const statAllTime = getOneStatisticData(allTime);


const getChartRandomData = () => {
  return {
    today,
    week,
    month,
    year,
    allTime,
  };
};

const getStatRandomData = () => {
  return {
    today: statToday,
    week: statWeek,
    month: statMonth,
    year: statYear,
    allTime: statAllTime,
  };
};

export {getChartRandomData, getStatRandomData};
