import "../pages/index.css";
import {
  initialCards,
  validationSettings,
  editProfileButton,
  cardTitleInput,
  cardUrlInput,
  addNewCardButton,
  cardForm,
  formElements,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForms from "../components/PopupWithForms.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

formElements.forEach((formElement) => {
  const formValidation = new FormValidator(validationSettings, formElement);
  formValidation.enableValidation();
});

const profileEditPopup = new PopupWithForms("#profile-edit-modal", () => {
  handleProfileEditSubmit();
});

profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForms("#add-card-modal", () => {
  handleAddCardFormSubmit();
});
addCardPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleProfileEditSubmit() {
  const newInfo = {
    name: document.querySelector("#profile-title-input").value,
    job: document.querySelector("#profile-description-input").value,
  };
  userInfo.setUserInfo(newInfo);
  profileEditPopup.close();
  userInfo.getUserInfo(newInfo);
}

function handleAddCardFormSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  cardSection.addItem(createCard({ name, link }));
  addCardPopup.close();
  cardForm.reset();
}

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

editProfileButton.addEventListener("click", () => {
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
