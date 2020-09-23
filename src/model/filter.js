import {filterTypes} from "../constants";
import Observer from "../utils/observer";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = filterTypes.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
