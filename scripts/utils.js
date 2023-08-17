 function setEscapeListener (evt) {
  if(evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup, validationConfig);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEscapeListener);
}

export function closePopup(popup, validators) {
  const form = popup.querySelector('.popup__form');

  if (form) {
    validators[form.getAttribute('name')].disableForm();
  }

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscapeListener);
}
