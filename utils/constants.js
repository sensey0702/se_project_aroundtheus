export const initialCards = [
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
export const editProfileButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const closeButtons = document.querySelectorAll(".modal__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileForm = document.forms["profile-form"];
export const cardListEl = document.querySelector(".cards__list");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addCardModal = document.querySelector("#add-card-modal");
export const cardForm = document.forms["card-form"];
export const cardTitleInput = document.querySelector("#card-title-input");
export const cardUrlInput = document.querySelector("#card-url-input");
export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImage = previewImageModal.querySelector(".modal__image");
export const previewImageDescription = previewImageModal.querySelector(
  ".modal__description"
);
