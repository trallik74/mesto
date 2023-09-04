import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import {enableValidation, validators} from "./validate.js";
import {initialCards} from "./constants.js";

/* const buttonCloseImgPopup = imgPopup.querySelector('.popup__button_type_close');
const buttonCloseAddPopup = addPopup.querySelector('.popup__button_type_close');
const buttonCloseEditPopup = editPopup.querySelector('.popup__button_type_close');
const popupsList = document.querySelectorAll('.popup');
const imgPopup = document.querySelector('.popup_type_image');
const addTitleInput = addFormElement.querySelector('.popup__input_type_title');
const addUrlInput = addFormElement.querySelector('.popup__input_type_url');
const containerElement = document.querySelector('.elements');
*/

const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const addFormElement = addPopup.querySelector('.popup__form');
const editFormElement = editPopup.querySelector('.popup__form');
const editTitleInput = editFormElement.querySelector('.popup__input_type_title');
const editSubtitleInput = editFormElement.querySelector('.popup__input_type_subtitle');
const sectionSelector = '.elements';
const templateSelector = '#element-item-template';

const createCardInstance = ({link, name}) => {
  return new Card({
    data: {link, name},
    handleCardClick: (image) => {
      imgPopupInstance.open(image)
      }
    }, templateSelector);
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCardInstance(item)
    const cardElement = card.createElement();
    cardList.addItem(cardElement, 'append');
    }
  }, sectionSelector);
cardList.renderItems();
enableValidation();

const imgPopupInstance = new PopupWithImage ('.popup_type_image');
imgPopupInstance.setEventListeners();

const editPopupInstance = new PopupWithForm ({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputValue) => {
    profileTitle.textContent =  inputValue['edit-title-input'];
    profileSubtitle.textContent = inputValue['edit-subtitle-input'];
  }
});
editPopupInstance.setEventListeners();

const addPopupInstance = new PopupWithForm ({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (inputValue) => {
    const card = createCardInstance({
      link: inputValue['add-url-input'],
      name: inputValue['add-title-input']
    });
    const cardElement = card.createElement();
    cardList.addItem(cardElement, 'prepend');
  }
});
addPopupInstance.setEventListeners();


elementAddButton.addEventListener('click', () => {
  validators[addFormElement.getAttribute('name')].disableForm();
  addPopupInstance.open();
});
profileEditButton.addEventListener('click', () => {
  validators[editFormElement.getAttribute('name')].disableForm();
  editTitleInput.value = profileTitle.textContent;
  editSubtitleInput.value = profileSubtitle.textContent;
  editPopupInstance.open();
});









