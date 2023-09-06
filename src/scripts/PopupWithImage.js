import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(image) {
    this._popupImage.src = image.src
    this._popupImage.alt = image.alt;
    this._popupImageCaption.textContent = image.alt;
    super.open();
  }
}
