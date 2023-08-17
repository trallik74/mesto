 import { validators } from "./validate.js";

 function setEscapeListener (evt) {
  if(evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup, validators);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEscapeListener);
}

export function closePopup(popup) {
  const form = popup.querySelector('.popup__form');

  if (form) {
    validators[form.getAttribute('name')].disableForm();
  }

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscapeListener);
}
