import '../pages/index.css'
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {enableValidation, validators} from "./validate.js";
import {
  initialCards,
  profileEditButton,
  elementAddButton,
  addFormElement,
  editFormElement,
  editTitleInput,
  editSubtitleInput,
  sectionSelector,
  templateSelector
} from "./constants.js";

const createCardInstance = ({link, name}) => {
  return new Card({
    data: {link, name},
    handleCardClick: (image) => {
      imgPopupInstance.open(image)
      }
    }, templateSelector);
}

const userInfoInstance = new UserInfo({
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__subtitle'
});

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
    userInfoInstance.setUserInfo(
      inputValue['edit-title-input'],
      inputValue['edit-subtitle-input']
    );
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
  const {title, subtitle} = userInfoInstance.getUserInfo();
  editTitleInput.value = title;
  editSubtitleInput.value = subtitle;
  editPopupInstance.open();
});









