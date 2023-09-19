export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const editAvatarPopup = document.querySelector('.popup_type_avatar-change');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const elementAddButton = document.querySelector('.profile__add-button');
export const pofileChangeAvatar = document.querySelector('.profile__edit-avatar');
export const addFormElement = addPopup.querySelector('.popup__form');
export const editFormElement = editPopup.querySelector('.popup__form');
export const avatarFormElement = editAvatarPopup.querySelector('.popup__form');
export const editTitleInput = editFormElement.querySelector('.popup__input_type_title');
export const editSubtitleInput = editFormElement.querySelector('.popup__input_type_subtitle');
export const sectionSelector = '.elements';
export const templateSelector = '#element-item-template';

export const optionsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  header: {
    'Content-Type': 'application/json',
    authorization: '812a01a3-2950-48a6-a5f0-d81cd717d41e'
  }
}
