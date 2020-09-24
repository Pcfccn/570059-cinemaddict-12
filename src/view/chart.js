import AbstractView from "./abstract";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const createChartTemplate = (container) => {
  const BAR_HEIGHT = 50;
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  container.height = BAR_HEIGHT * 5;

  const myChart = new Chart(container, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
      datasets: [{
        data: [11, 8, 7, 4, 3],
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

  return myChart;
};

export default class ChartView extends AbstractView {
  constructor(container) {
    super();
    this._container = container;
    this._callback = {};
    // this._watchedClickHandler = this._watchedClickHandler.bind(this);
  }

  getTemplate() {
    return createChartTemplate(this._container);
  }

  // _watchedClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.watchedClickHandler();
  // }

  // setWatchlistClickHandler(callback) {
  //   this._callback.watchlistClickHandler = callback;
  //   this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  // }
}
