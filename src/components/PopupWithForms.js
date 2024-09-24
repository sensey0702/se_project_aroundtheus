import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
  }
  _getInputValues() {
    const formData = {};

    const inputs = this._popupForm.querySelectorAll(".modal__input");

    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });

    return formData;
  }
  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }
}
