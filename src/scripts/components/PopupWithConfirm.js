import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupConfirmButton = this._popup.querySelector('.popup__button_type_confirm');
    this._popupConfirmButtonDefaultValue = this._popupConfirmButton.textContent;

  }

  addConfirmHendler(hendler) {
    this._confirmHendler = hendler;
  }

  renderLoading (isLoading) {
    if(isLoading) {
      this._popupConfirmButton.textContent = 'Удаление...'
    } else {
      this._popupConfirmButton.textContent = this._popupConfirmButtonDefaultValue;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupConfirmButton.addEventListener('click', () => {
      this.renderLoading(true);
      this._confirmHendler();
    })
  }
}
