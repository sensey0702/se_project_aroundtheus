import {
  initialCards,
  editProfileButton,
  profileTitle,
  profileDescription,
  profileDescriptionInput,
  profileTitleInput,
  cardTitleInput,
  cardUrlInput,
  addNewCardButton,
  cardForm,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

/* Validation Settings */
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formElements = document.querySelectorAll(".modal__form");

formElements.forEach((formElement) => {
  const formValidation = new FormValidator(validationSettings, formElement);
  formValidation.enableValidation();
});

const profileEditPopup = new PopupWithForm("#profile-edit-modal", () => {
  handleProfileEditSubmit();
});

profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", () => {
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

/*Event Handlers*/
function handleProfileEditSubmit() {
  const newInfo = {
    name: document.querySelector("#profile-title-input").value,
    job: document.querySelector("#profile-description-input").value,
  };
  userInfo.setUserInfo(newInfo);
  profileEditPopup.close();
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
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
