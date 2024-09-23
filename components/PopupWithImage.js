import { previewImage, previewImageDescription } from "../utils/constants.js";
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(data) {
    const { name, link } = data;

    previewImage.src = link;
    previewImage.alt = name;

    previewImageDescription.textContent = name;
    super.open();
  }
}
