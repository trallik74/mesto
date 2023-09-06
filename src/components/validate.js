import {validationConfig} from "./constants.js";
import FormValidator from "./FormValidator.js";

const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
const validators = {};

function enableValidation() {

  formsList.forEach(form => {
    validators[form.getAttribute('name')] = new FormValidator(validationConfig, form);
    validators[form.getAttribute('name')].enableValidation();
  });
}

export {validators, enableValidation}
