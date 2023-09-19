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
  editTitleInput,
  editSubtitleInput,
  sectionSelector,
  templateSelector,
  optionsApi
} from "../scripts/utils/constants.js";

const api = new Api(optionsApi);

const createCardInstance = ({link, name, owner, likes, _id}, id) => {
  const CardInstance = new Card({
    data: {link, name, owner, likes, _id},
    handleCardClick: (image) => {
      imgPopupInstance.open(image)
      },
    handleCardDelete: (id) => {
      confirmPopupInstance.open();
      confirmPopupInstance.addConfirmHendler(() => {
        api.deleteCard(id)
        .then(() => {
          CardInstance.deleteElement();
        })
        .catch(error => {
          console.log('При удаление карточки произошла ошибка ' + error);
        })
      })
    },
    handleLikeCard: (id) => {
      api.likeCard(id)
      .then (res => {
        CardInstance.updateLikeState(res.likes)
      })
      .catch(error => {
        console.log('При лайке карточки произошла ошибка ' + error);
      })
    },
    handleRemoveLikeFromCard: (id) => {
      api.removeLikeFromCard(id)
      .then (res => {
        CardInstance.updateLikeState(res.likes)
      })
      .catch(error => {
        console.log('При удаление лайка с карточки произошла ошибка ' + error);
      })
    }
    }, id, templateSelector);

    return CardInstance.createElement()
}

const confirmPopupInstance = new PopupWithConfirmation('.popup_type_confirm')
confirmPopupInstance.setEventListeners();

const userInfoInstance = new UserInfo({
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

let userId = await api.getUserInfo()
.then( userInfo => {
  userInfoInstance.setUserInfo(userInfo);
  return userInfo._id;
})


const cardList = new Section({
  items: await api.getAllCards(),
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
    .then(userData => {
      userInfoInstance.setUserInfo(userData);
    })
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
    .then(cardData => {
      cardList.addItem(createCardInstance(cardData, userId), 'prepend');
    })
    .catch(error => alert('При добавление карточки произошла ошибка'))
    .finally(() => addPopupInstance.renderLoading(false))
  }
});
addPopupInstance.setEventListeners();

const changeAvatarPopupInstance = new PopupWithForm({
  popupSelector: '.popup_type_avatar-change',
  handleFormSubmit: (inputValues) => {
    api.changeAvatar(inputValues['avatar-url-input'])
    .then(userData => {
      userInfoInstance.setUserInfo(userData);
    })
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
  const {title, subtitle} = userInfoInstance.getUserInfo();
  editTitleInput.value = title;
  editSubtitleInput.value = subtitle;
  editPopupInstance.open();
});








