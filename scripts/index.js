const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const buttonCloseAddPopup = addPopup.querySelector('.popup__button_type_close');
const buttonCloseEditPopup = editPopup.querySelector('.popup__button_type_close');
const addFormElement = addPopup.querySelector('.popup__form');
const addTitleInput = addFormElement.querySelector('.popup__input_type_title');
const addUrlInput = addFormElement.querySelector('.popup__input_type_url');
const editFormElement = editPopup.querySelector('.popup__form');
const editTitleInput = editFormElement.querySelector('.popup__input_type_title');
const editSubtitleInput = editFormElement.querySelector('.popup__input_type_subtitle');
const containerElement = document.querySelector('.elements');
const templateElement = document.querySelector('#element-item-template').content;


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent =  editTitleInput.value;
  profileSubtitle.textContent = editSubtitleInput.value;

  closePopup(editPopup);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();

  const article = templateElement.querySelector('.element').cloneNode(true);
  const image = article.querySelector('.element__image');
  const title = article.querySelector('.element__title');

  image.src = addUrlInput.value;
  image.alt = addTitleInput.value;
  title.textContent = addTitleInput.value;
  containerElement.prepend(article);

  closePopup(addPopup);
  addUrlInput.value = null;
  addTitleInput.value = null;
}

function renderElements(card) {
  const article = templateElement.querySelector('.element').cloneNode(true);
  const image = article.querySelector('.element__image');
  const title = article.querySelector('.element__title');

  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;
  containerElement.append(article);
}

initialCards.forEach((card) => renderElements(card));

elementAddButton.addEventListener('click', () => openPopup(addPopup));
buttonCloseAddPopup.addEventListener('click', () => closePopup(addPopup));
buttonCloseEditPopup.addEventListener('click', () => closePopup(editPopup));
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
profileEditButton.addEventListener('click', () => {
  editTitleInput.value = profileTitle.textContent;
  editSubtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup)
});

