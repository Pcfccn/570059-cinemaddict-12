import {filterTypes, updateTypes} from "../constants";
import {getFilterElementCount} from "../utils/filter";
import {remove, render, replace} from "../utils/render";
import FilterView from "../view/filter";
import StatisticView from "../view/statistic";

export default class FilterPresenter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
debugger
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    // if (filterType === filterTypes.STATISTIC) {
    //   const a = new StatisticView();
    //   render(this._filterContainer, a);
    //   return;
    // }

    this._filterModel.setFilter(updateTypes.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();
    return getFilterElementCount(films);
  }
}
