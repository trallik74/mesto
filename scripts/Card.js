import {openPopup} from "./utils.js";

class Card {
  constructor(data, templateSelector){
    this._templateSelector = templateSelector;
    this._link = data.link;
    this._name = data.name;
    this._imgPopup = document.querySelector('.popup_type_image');
    this._popupImage = this._imgPopup.querySelector('.popup__image');
    this._popupImageCaption = this._imgPopup.querySelector('.popup__image-caption');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _initToggleLike(evt) {
     evt.target.classList.toggle('element__like-button_active');
  }

  _initOpenImage() {
    this._popupImage.src = this._image.src;
    this._popupImage.alt = this._image.alt;
    this._popupImageCaption.textContent = this._image.alt;
    openPopup(this._imgPopup);
  }

  _initDeleteElement() {
    this._article.remove();
    this._article = null;
  }

  _setEventListeners() {
    this._article.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like-button')) {
         this._initToggleLike(evt);
      }

      if (evt.target.classList.contains('element__image')) {
        this._initOpenImage();
      }

      if (evt.target.classList.contains('element__delete-button')) {
        this._initDeleteElement();
      }
    });
  }

  createElement() {
    this._article = this._getTemplate();

    this._image = this._article.querySelector('.element__image');
    this._title = this._article.querySelector('.element__title');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._article
  }
}

export default Card;
