import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupConfirmButton = this._popup.querySelector('.popup__button_type_confirm');
  }

  addConfirmHendler(hendler) {
    this._confirmHendler = hendler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupConfirmButton.addEventListener('click', () => {
      this._confirmHendler();
      this.close();
    })
  }
}
