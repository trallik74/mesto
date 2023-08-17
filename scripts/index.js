import {closePopup, openPopup} from "./utils.js";
import Card from "./Card.js";
import {enableValidation, validators} from "./validate.js";
import {initialCards} from "./constants.js";


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

enableValidation();

function handleEditFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent =  editTitleInput.value;
  profileSubtitle.textContent = editSubtitleInput.value;

  closePopup(editPopup);
}

function getInstanceCard (data, templateSelector) {
  const element = new Card(data, templateSelector);
  return element
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  containerElement.prepend(getInstanceCard({link:addUrlInput.value, name:addTitleInput.value}, '#element-item-template').createElement());
  closePopup(addPopup);
}

initialCards.forEach((card) => {
  containerElement.append(getInstanceCard(card, '#element-item-template').createElement());
});

elementAddButton.addEventListener('click', () => {
  validators[addFormElement.getAttribute('name')].disableForm();
  addFormElement.reset();
  openPopup(addPopup);
});
profileEditButton.addEventListener('click', () => {
  validators[editFormElement.getAttribute('name')].disableForm();
  editTitleInput.value = profileTitle.textContent;
  editSubtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup);
});
buttonCloseAddPopup.addEventListener('click', () => closePopup(addPopup));
buttonCloseEditPopup.addEventListener('click', () => closePopup(editPopup));
buttonCloseImgPopup.addEventListener('click', () => closePopup(imgPopup));
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

popupsList.forEach( popup => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) closePopup(evt.target)
  })
})





