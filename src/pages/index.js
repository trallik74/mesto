import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {enableValidation, validators} from "../components/validate.js";
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
} from "../components/constants.js";

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









