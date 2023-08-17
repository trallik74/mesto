import {closePopup, openPopup} from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {validationConfig, initialCards} from "./constants.js";


const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imgPopup = document.querySelector('.popup_type_image');
const buttonCloseImgPopup = imgPopup.querySelector('.popup__button_type_close');
const buttonCloseAddPopup = addPopup.querySelector('.popup__button_type_close');
const buttonCloseEditPopup = editPopup.querySelector('.popup__button_type_close');
const addFormElement = addPopup.querySelector('.popup__form');
const addTitleInput = addFormElement.querySelector('.popup__input_type_title');
const addUrlInput = addFormElement.querySelector('.popup__input_type_url');
const editFormElement = editPopup.querySelector('.popup__form');
const editTitleInput = editFormElement.querySelector('.popup__input_type_title');
const editSubtitleInput = editFormElement.querySelector('.popup__input_type_subtitle');
const containerElement = document.querySelector('.elements');
const popupsList = document.querySelectorAll('.popup');
const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
const validators = {};

formsList.forEach(form => {
  validators[form.getAttribute('name')] = new FormValidator(validationConfig, form);
  validators[form.getAttribute('name')].enableValidation();
});

function handleEditFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent =  editTitleInput.value;
  profileSubtitle.textContent = editSubtitleInput.value;

  closePopup(editPopup, validators);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();

  const element = new Card({link:addUrlInput.value, name:addTitleInput.value}, '#element-item-template');
  containerElement.prepend(element.createElement());
  closePopup(addPopup, validators);
}

initialCards.forEach((card) => {
  const element = new Card(card, '#element-item-template');
  containerElement.append(element.createElement());
});

elementAddButton.addEventListener('click', () => openPopup(addPopup));
buttonCloseAddPopup.addEventListener('click', () => closePopup(addPopup, validators));
buttonCloseEditPopup.addEventListener('click', () => closePopup(editPopup, validators));
buttonCloseImgPopup.addEventListener('click', () => closePopup(imgPopup, validators));
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
profileEditButton.addEventListener('click', () => {
  editTitleInput.value = profileTitle.textContent;
  editSubtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup)
});

popupsList.forEach( popup => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) closePopup(evt.target, validators)
  })
})





