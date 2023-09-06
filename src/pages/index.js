import './index.css';
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {enableValidation, validators} from "../scripts/utils/validate.js";
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
} from "../scripts/utils/constants.js";

const createCardInstance = ({link, name}) => {
  return new Card({
    data: {link, name},
    handleCardClick: (image) => {
      imgPopupInstance.open(image)
      }
    }, templateSelector).createElement();
}

const userInfoInstance = new UserInfo({
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__subtitle'
});

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCardInstance(item), 'append');
    }
  }, sectionSelector);
cardList.renderItems();
enableValidation();

const imgPopupInstance = new PopupWithImage ('.popup_type_image');
imgPopupInstance.setEventListeners();

const editPopupInstance = new PopupWithForm ({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputValues) => {
    userInfoInstance.setUserInfo(
      inputValues['edit-title-input'],
      inputValues['edit-subtitle-input']
    );
  }
});
editPopupInstance.setEventListeners();

const addPopupInstance = new PopupWithForm ({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (inputValues) => {
    cardList.addItem(createCardInstance({
      link: inputValues['add-url-input'],
      name: inputValues['add-title-input']
    }), 'prepend');
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









