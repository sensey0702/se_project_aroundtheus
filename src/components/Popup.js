export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._closeButtons = this._popupElement.querySelector(".modal__close");
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClick);
  }
  _handleEscClose(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    if (event.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButtons.addEventListener("click", () => this.close());
  }
}
