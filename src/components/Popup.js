export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }
  open() {
    this._popupElement.classList.add("modal_opened");
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
  }
  _handleEscClose(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    if (event.target.classList.contains("modal_opened")) {
      this.close(event.target);
    }
  }

  setEventListeners() {
    this._closeButtons = this._popupElement.querySelectorAll(".modal__close");
    this._closeButtons.forEach((button) => {
      const popup = button.closest(".modal");
      button.addEventListener("click", () => this.close());
    });

    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);
  }
}
