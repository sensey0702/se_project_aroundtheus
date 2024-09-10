import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */
const editProfileButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeButtons = document.querySelectorAll(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileForm = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const cardForm = document.forms["card-form"];
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageDescription = previewImageModal.querySelector(
  ".modal__description"
);
const addCardSubmitButton = addCardModal.querySelector("#submit-button");

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

/* Functions */
function closePopUp(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
  document.removeEventListener("click", handleOverlayClick);
}

function openPopUp(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
  document.addEventListener("click", handleOverlayClick);
}

function renderCard(cardData, method = "prepend") {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListEl[method](cardElement);
}

/*Event Handlers*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  closePopUp(addCardModal);
  cardForm.reset();
}

function handleEscClose(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const modal = document.querySelector(".modal_opened");
    closePopUp(modal);
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closePopUp(event.target);
  }
}

function handleImageClick(cardData) {
  openPopUp(previewImageModal);
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewImageDescription.textContent = cardData.name;
}

/* Event Listeners*/
editProfileButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => {
  openPopUp(addCardModal);
  addCardSubmitButton.classList.add("modal__button_disabled");
});

initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popup));
});
