import {filterTypes, updateTypes} from "../constants";
import {getFilterElementCount} from "../utils/filter";
import {remove, render, replace} from "../utils/render";
import FilterView from "../view/filter";

export default class FilterPresenter {
  constructor(filterContainer, filterModel, filmsModel, routeChancgeHandler) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._routeChancgeHandler = routeChancgeHandler;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._routeChancgeHandler = this._routeChancgeHandler.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange, this._routeChancgeHandler);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy() {
    remove(this._filterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    if (filterType === filterTypes.STATISTIC) {
      this._filterModel.setFilter(updateTypes.SHOW_STATS, filterType);
      return;
    }

    this._filterModel.setFilter(updateTypes.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();
    return getFilterElementCount(films);
  }
}
