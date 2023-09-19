export default class Card {
  constructor({
    data,
    handleCardClick,
    handleCardDelete,
    handleLikeCard,
    handleRemoveLikeFromCard
  }, id, templateSelector){

    this._templateSelector = templateSelector;
    this._link = data.link;
    this._name = data.name;
    this._ownerId = data.owner._id;
    this._userId = id;
    this._likesArray = data.likes;
    this._cardId = data._id;
    this._imgPopup = document.querySelector('.popup_type_image');
    this._popupImage = this._imgPopup.querySelector('.popup__image');
    this._popupImageCaption = this._imgPopup.querySelector('.popup__image-caption');
    this._article = this._getTemplate();
    this._likeCounter = this._article.querySelector('.element__like-counter');
    this._buttonLike = this._article.querySelector('.element__like-button');
    this._buttonRemoveCard = this._article.querySelector('.element__delete-button');
    this._image = this._article.querySelector('.element__image');
    this._title = this._article.querySelector('.element__title');

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
    this._handleRemoveLikeFromCard = handleRemoveLikeFromCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _isItLiked() {
    return !!this._likesArray.find(item =>  item._id === this._userId)
  }

  _toggleLike() {
    if (this._isItLiked()) {
      this._handleRemoveLikeFromCard(this._cardId);
    } else {
      this._handleLikeCard(this._cardId);
    }
  }

  _checkLikeState() {
    if (this._isItLiked()) {
      this._buttonLike.classList.add('element__like-button_active');
    } else {
      this._buttonLike.classList.remove('element__like-button_active');
    }

    this._getLikeCount()
  }

  _checkСardOwner() {
    if (this._ownerId !== this._userId) {
      this._removeDeleteButton();
    }
  }

  _removeDeleteButton() {
    this._buttonRemoveCard.remove();
    this._buttonRemoveCard = null;
  }

  _deleteElementOnClick() {
    this._handleCardDelete(this._cardId);
  }

  _setEventListeners() {
    this._article.addEventListener('click', (evt) => {
      if (evt.target === this._buttonLike) {
        this._toggleLike();
      }

      if (evt.target === this._image) {
        this._handleCardClick(this._image)
      }

      if (evt.target === this._buttonRemoveCard) {
        this._deleteElementOnClick();
      }
    });
  }

  _getLikeCount () {
    this._likeCounter.textContent = this._likesArray.length;
  }

  updateLikeState(arr) {
    this._likesArray = arr;
    this._checkLikeState();
  }

  deleteElement() {
    this._article.remove();
    this._article, this._buttonLike, this._buttonRemoveCard, this._image, this._title  = null;
  }

  createElement() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._checkLikeState();
    this._checkСardOwner();
    this._setEventListeners();

    return this._article
  }
}

