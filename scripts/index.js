import Card from "./Card.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import {enableValidation, validators} from "./validate.js";
import {initialCards} from "./constants.js";

/* const buttonCloseImgPopup = imgPopup.querySelector('.popup__button_type_close');
const buttonCloseAddPopup = addPopup.querySelector('.popup__button_type_close');
const buttonCloseEditPopup = editPopup.querySelector('.popup__button_type_close');
const popupsList = document.querySelectorAll('.popup');
const imgPopup = document.querySelector('.popup_type_image');
*/

const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const addFormElement = addPopup.querySelector('.popup__form');
const addTitleInput = addFormElement.querySelector('.popup__input_type_title');
const addUrlInput = addFormElement.querySelector('.popup__input_type_url');
const editFormElement = editPopup.querySelector('.popup__form');
const editTitleInput = editFormElement.querySelector('.popup__input_type_title');
const editSubtitleInput = editFormElement.querySelector('.popup__input_type_subtitle');
const containerElement = document.querySelector('.elements');
const sectionSelector = '.elements';
const templateSelector = '#element-item-template';


enableValidation();
const editPopupInstance = new Popup ('.popup_type_edit');
const addPopupInstance = new Popup ('.popup_type_add');
const imgPopupInstance = new PopupWithImage ('.popup_type_image');

editPopupInstance.setEventListeners();
addPopupInstance.setEventListeners();
imgPopupInstance.setEventListeners();

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent =  editTitleInput.value;
  profileSubtitle.textContent = editSubtitleInput.value;
  editPopupInstance.close();
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  containerElement.prepend(new Card({link:addUrlInput.value, name:addTitleInput.value},
    templateSelector,
    (image) => {
      imgPopupInstance.open(image)
    })
    .createElement());
  addPopupInstance.close();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item,
      templateSelector,
      (image) => {
        imgPopupInstance.open(image)
      });
    const cardElement = card.createElement();
    cardList.addItem(cardElement, 'append');
  }
}, sectionSelector);

cardList.renderItems();

elementAddButton.addEventListener('click', () => {
  validators[addFormElement.getAttribute('name')].disableForm();
  addFormElement.reset();
  addPopupInstance.open();
});
profileEditButton.addEventListener('click', () => {
  validators[editFormElement.getAttribute('name')].disableForm();
  editTitleInput.value = profileTitle.textContent;
  editSubtitleInput.value = profileSubtitle.textContent;
  editPopupInstance.open();
});

editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);







