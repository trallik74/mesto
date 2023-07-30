const valdationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach(form => {
    setEventListeners(config, form);
  })
}

const showInputError = (config, form, input) => {
  input.classList.add(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = input.validationMessage;
  span.classList.add(config.errorClass);
}

const hideInputError = (config, form, input) => {
  input.classList.remove(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = '';
  span.classList.remove(config.errorClass);
}

const isValid = (config, form, input) => {
  if (!input.validity.valid) {
    showInputError(config, form, input);
  } else {
    hideInputError(config, form, input);
  }
}

const hasInvalidValue = (inputs) => {
  return inputs.some(input => !input.validity.valid);
}

const toggleButtonState = (config, inputs, button) => {
  if (hasInvalidValue(inputs)) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}

const setEventListeners = (config, form) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  toggleButtonState(config, inputs, button)
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(config, form, input);
      toggleButtonState(config, inputs, button);
    });
  });
}

