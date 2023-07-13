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

  const item = renderElements();
  item.querySelector('.element__image').src = addUrlInput.value;
  item.querySelector('.element__image').alt = addTitleInput.value;
  item.querySelector('.element__title').textContent = addTitleInput.value;

  containerElement.prepend(item);
  closePopup(addPopup);
  addFormElement.reset();
}

function renderElements() {
  const article = templateElement.querySelector('.element').cloneNode(true);
  const image = article.querySelector('.element__image');
  openImg(image);
  toggleLike(article);
  deleteElement(article);

  return article
}

initialCards.forEach((card) => {
  const item = renderElements();
  item.querySelector('.element__image').src = card.link;
  item.querySelector('.element__image').alt = card.name;
  item.querySelector('.element__title').textContent = card.name;
  containerElement.append(item);
});

elementAddButton.addEventListener('click', () => openPopup(addPopup));
buttonCloseAddPopup.addEventListener('click', () => closePopup(addPopup));
buttonCloseEditPopup.addEventListener('click', () => closePopup(editPopup));
buttonCloseImgPopup.addEventListener('click', () => closePopup(imgPopup));
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
profileEditButton.addEventListener('click', () => {
  editTitleInput.value = profileTitle.textContent;
  editSubtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup)
});



