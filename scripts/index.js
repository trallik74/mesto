let profileEditButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
/* let elementLikeButton = document.querySelectorAll('.element__like-button'); */
let editPopup = document.querySelector('.popup_type_edit');
let buttonCloseEditPopup = editPopup.querySelector('.popup__button_type_close');
let formElement = editPopup.querySelector('.popup__form');
let titleInput = formElement.querySelector('.popup__input_type_title');
let subtitleInput = formElement.querySelector('.popup__input_type_subtitle');


function openEditPopup() {
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
  editPopup.classList.add('popup_opened');
}

function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent =  titleInput.value;
  profileSubtitle.textContent = subtitleInput.value;

  closeEditPopup();
}


/* elementLikeButton.forEach((item,index) => item
.addEventListener('click',() => elementLikeButton[index].classList.toggle('element__like-button_active'))); */

profileEditButton.addEventListener('click', openEditPopup);
buttonCloseEditPopup.addEventListener('click', closeEditPopup);
formElement.addEventListener('submit', handleFormSubmit);

