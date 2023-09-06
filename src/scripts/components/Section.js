export default class Section {
  constructor({items, renderer}, selector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._initialArray.forEach(this._renderer);
  }

  addItem(item, method) {
    this._container[method](item)
  }
}
