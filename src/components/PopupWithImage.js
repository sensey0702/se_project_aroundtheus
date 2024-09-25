import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageModal = document.querySelector("#preview-image-modal");
    this._previewImage = this._imageModal.querySelector(".modal__image");
    this._previewImageText = this._imageModal.querySelector(
      ".modal__description"
    );
  }

  open(data) {
    const { name, link } = data;

    this._previewImage.src = link;
    this._previewImage.alt = name;

    this._previewImageText.textContent = name;
    super.open();
  }
}
