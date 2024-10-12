import "../pages/index.css";
import {
  initialCards,
  validationSettings,
  editProfileButton,
  addNewCardButton,
  cardForm,
  formElements,
  profileAbout,
  profileAvatar,
  profileName,
} from "../utils/constants.js";

import Api from "../components/Api.js";
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

const profileEditPopup = new PopupWithForms(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForms(
  "#add-card-modal",
  handleAddCardFormSubmit
);
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "965628aa-8b9c-448e-a4df-9a27d86f83f8",
    "Content-Type": "application/json",
  },
});

api
  .get("/users/me")
  .then((result) => {
    profileName.textContent = result.name;
    profileAbout.textContent = result.about;
    profileAvatar.src = result.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

api
  .get("/cards")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData);
  profileEditPopup.close();
}

function handleAddCardFormSubmit(formData) {
  cardSection.addItem(createCard(formData));
  addCardPopup.close();
  cardForm.reset();
}

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

editProfileButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileEditPopup.setInputValues(currentUserInfo);
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
