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
const popupImage = imgPopup.querySelector('.popup__image');
const popupImageCaption = imgPopup.querySelector('.popup__image-caption');
const containerElement = document.querySelector('.elements');
const templateElement = document.querySelector('#element-item-template').content;
const popupsList = document.querySelectorAll('.popup')

function setEscapeListener (evt) {
  const popup = document.querySelector('.popup_opened');
  if(evt.key === "Escape") closePopup(popup, valdationConfig);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEscapeListener);
  enableValidation(valdationConfig);
}

function closePopup(popup, config) {
  const openedPopup = document.querySelector('.popup_opened');
  const form = openedPopup.querySelector(valdationConfig.formSelector);

  if (form !== null) {
    const inputs = Array.from(form?.querySelectorAll(config.inputSelector));
    inputs.forEach(input => hideInputError(config, form, input));
    form.reset();
  }

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscapeListener);

}

function handleEditFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent =  editTitleInput.value;
  profileSubtitle.textContent = editSubtitleInput.value;

  closePopup(editPopup, valdationConfig);
}

function toggleLike (container) {
  container.querySelector('.element__like-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like-button_active');
  });
}

function openImg(image) {
  image.addEventListener('click', () => {
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupImageCaption.textContent = image.alt;
    openPopup(imgPopup);
  })
}

function deleteElement (container) {
  container.querySelector('.element__delete-button').addEventListener('click', () => {
    container.remove();
  })
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();

  const element = renderElements(addUrlInput.value, addTitleInput.value);
  containerElement.prepend(element);
  closePopup(addPopup, valdationConfig);
  addFormElement.reset();
}

function renderElements(link, name) {
  const article = templateElement.querySelector('.element').cloneNode(true);
  const image = article.querySelector('.element__image');
  const title = article.querySelector('.element__title');
  image.src = link;
  image.alt = name;
  title.textContent = name;
  openImg(image);
  toggleLike(article);
  deleteElement(article);

  return article
}

initialCards.forEach((card) => {
  const element = renderElements(card.link, card.name);
  containerElement.append(element);
});

elementAddButton.addEventListener('click', () => openPopup(addPopup));
buttonCloseAddPopup.addEventListener('click', () => closePopup(addPopup, valdationConfig));
buttonCloseEditPopup.addEventListener('click', () => closePopup(editPopup, valdationConfig));
buttonCloseImgPopup.addEventListener('click', () => closePopup(imgPopup, valdationConfig));
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
profileEditButton.addEventListener('click', () => {
  editTitleInput.value = profileTitle.textContent;
  editSubtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup)
});

popupsList.forEach( popup => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) closePopup(evt.target, valdationConfig)
  })
  })



