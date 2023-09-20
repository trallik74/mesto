import './index.css';
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithConfirmation from '../scripts/components/PopupWithConfirm';
import Api from '../scripts/components/Api';
import {enableValidation, validators} from "../scripts/utils/validate.js";
import {
  profileEditButton,
  elementAddButton,
  pofileChangeAvatar,
  addFormElement,
  editFormElement,
  avatarFormElement,
  sectionSelector,
  templateSelector,
  optionsApi
} from "../scripts/utils/constants.js";

let userId;
let cardsArray;

const api = new Api(optionsApi);

const createCardInstance = ({link, name, owner, likes, _id}, id) => {
  const cardInstance = new Card({
    data: {link, name, owner, likes, _id},
    handleCardClick: (image) => {
      imgPopupInstance.open(image)
      },
    handleCardDelete: (id) => {
      confirmPopupInstance.open();
      confirmPopupInstance.addConfirmHendler(() => {
        api.deleteCard(id)
        .catch(error => {
          console.log('При удаление карточки произошла ошибка ' + error);
        })
        .then((res) => {
          console.log(res);
          if (res) {
            cardInstance.deleteElement();
            confirmPopupInstance.close();
          } else {
            throw new Error()
          }
        })
        .catch(error => {
          alert('При удаление карточки произошла ошибка');
        })
        .finally(() => confirmPopupInstance.renderLoading(false))
      })
    },
    handleLikeCard: (id) => {
      api.likeCard(id)
      .then (res => {
        cardInstance.updateLikeState(res.likes)
      })
      .catch(error => {
        console.log('При лайке карточки произошла ошибка ' + error);
      })
    },
    handleRemoveLikeFromCard: (id) => {
      api.removeLikeFromCard(id)
      .then (res => {
        cardInstance.updateLikeState(res.likes)
      })
      .catch(error => {
        console.log('При удаление лайка с карточки произошла ошибка ' + error);
      })
    }
    }, id, templateSelector);

    return cardInstance.createElement()
}

const confirmPopupInstance = new PopupWithConfirmation('.popup_type_confirm')
confirmPopupInstance.setEventListeners();

const userInfoInstance = new UserInfo({
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

try {
  userId = await api.getUserInfo()
  .then( userInfo => {
   userInfoInstance.setUserInfo(userInfo);
   return userInfo._id;
 })
} catch(error) {
  userId = null;
  console.log('При загрузке пользоваетля произошла ошибка ' + error)

  userInfoInstance.setUserInfo({
    name: 'unknown',
    about: 'unknown',
    avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
    _id: null
  })
}

try {
  cardsArray = await api.getAllCards()
} catch (error) {
  console.log('При загрузке карточек произошла ошибка ' + error);
  cardsArray = []
}

const cardList = new Section({
  items: cardsArray,
  renderer: (item) => {
    cardList.addItem(createCardInstance(item, userId), 'append');
    }
  }, sectionSelector);
cardList.renderItems();
enableValidation();

const imgPopupInstance = new PopupWithImage ('.popup_type_image');
imgPopupInstance.setEventListeners();

const editPopupInstance = new PopupWithForm ({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputValues) => {
    api.updateUserInfo({
      name: inputValues['edit-title-input'],
      about: inputValues['edit-subtitle-input']
    })
    .catch(error => {
      console.log('При обновление информации о пользователе произошла ошибка ' + error);
    })
    .then(userData => {
      userInfoInstance.setUserInfo(userData);
    })
    .then(() => editPopupInstance.close())
    .catch(error => alert('При обновление информации о пользователе произошла ошибка'))
    .finally(() => editPopupInstance.renderLoading(false))
  }
});
editPopupInstance.setEventListeners();

const addPopupInstance = new PopupWithForm ({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (inputValues) => {
    api.createCard({
      link: inputValues['add-url-input'],
      name: inputValues['add-title-input']
    })
    .catch(error => {
      console.log('При добавление карточки произошла ошибка ' + error);
    })
    .then(cardData => {
      cardList.addItem(createCardInstance(cardData, userId), 'prepend');
    })
    .then(() => addPopupInstance.close())
    .catch(error => alert('При добавление карточки произошла ошибка'))
    .finally(() => addPopupInstance.renderLoading(false))
  }
});
addPopupInstance.setEventListeners();

const changeAvatarPopupInstance = new PopupWithForm({
  popupSelector: '.popup_type_avatar-change',
  handleFormSubmit: (inputValues) => {
    api.changeAvatar(inputValues['avatar-url-input'])
    .catch(error => {
      console.log('При обновление аватара произошла ошибка ' + error);
    })
    .then(userData => {
      userInfoInstance.setUserInfo(userData);
    })
    .then(() => changeAvatarPopupInstance.close())
    .catch(error => alert('При обновление аватара произошла ошибка'))
    .finally(() => changeAvatarPopupInstance.renderLoading(false))
  }
});
changeAvatarPopupInstance.setEventListeners();

pofileChangeAvatar.addEventListener('click', () => {
  validators[avatarFormElement.getAttribute('name')].disableForm();
  changeAvatarPopupInstance.open();
});

elementAddButton.addEventListener('click', () => {
  validators[addFormElement.getAttribute('name')].disableForm();
  addPopupInstance.open();
});

profileEditButton.addEventListener('click', () => {
  validators[editFormElement.getAttribute('name')].disableForm();
  editPopupInstance.setInputValues(userInfoInstance.getUserInfo())
  editPopupInstance.open();
});








