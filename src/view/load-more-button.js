import AbstractView from "./abstract";

const createLoadMoreButonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMoreButonView extends AbstractView {
  getTemplate() {
    return createLoadMoreButonTemplate();
  }
}
