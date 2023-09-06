class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showInputError = (input) => {
    input.classList.add(this._config.inputErrorClass);
    const span = this._form.querySelector(`.${input.id}-error`);
    span.textContent = input.validationMessage;
    span.classList.add(this._config.errorClass);
  }

  _hideInputError = (input) => {
    input.classList.remove(this._config.inputErrorClass);
    const span = this._form.querySelector(`.${input.id}-error`);
    span.textContent = '';
    span.classList.remove(this._config.errorClass);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _enableButton() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.disabled = false;
  }

  _disableButton() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.disabled = true;
  }

  _hasInvalidValue() {
    return this._inputsList.some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidValue()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState()
    this._inputsList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
    });
  });
  }

  disableForm() {
    this._inputsList.forEach(input => this._hideInputError(input));
    this._disableButton();
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
