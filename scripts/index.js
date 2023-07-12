const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup_type_edit');
const buttonCloseEditPopup = editPopup.querySelector('.popup__button_type_close');
const formElement = editPopup.querySelector('.popup__form');
const titleInput = formElement.querySelector('.popup__input_type_title');
const subtitleInput = formElement.querySelector('.popup__input_type_subtitle');
const containerElement = document.querySelector('.elements');
const templateElement = document.querySelector('#element-item-template').content;


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

function renderElements(card) {
  const article = templateElement.querySelector('.element').cloneNode(true);
  const image = article.querySelector('.element__image');
  const title = article.querySelector('.element__title');

  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;
  containerElement.append(article);
}

initialCards.forEach((card) => {
  renderElements(card)
})




profileEditButton.addEventListener('click', openEditPopup);
buttonCloseEditPopup.addEventListener('click', closeEditPopup);
formElement.addEventListener('submit', handleFormSubmit);

