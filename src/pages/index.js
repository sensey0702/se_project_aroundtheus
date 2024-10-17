import "../pages/index.css";
import {
  validationSettings,
  editProfileButton,
  addNewCardButton,
  cardForm,
  formElements,
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

import PopupWithForms from "../components/PopupWithForms.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

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
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon
  );
  const cardElement = card.getView();
  return cardElement;
}

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: "#profile-image",
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "965628aa-8b9c-448e-a4df-9a27d86f83f8",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
    userInfo.setAvatar(result);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((result) => {
    cardSection.renderItems(result);
  })
  .catch((err) => {
    console.error(err);
  });

function handleProfileEditSubmit(formData) {
  api
    .editProfileInfo(formData)
    .then(() => {
      userInfo.setUserInfo(formData);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
      alert("Could not change user info!");
    });
}

function handleAddCardFormSubmit(formData) {
  api
    .addNewCard(formData)
    .then(() => {
      cardSection.addItem(createCard(formData));
      addCardPopup.close();
      cardForm.reset();
    })
    .catch((err) => {
      console.error(err);
      alert("Could not add new place!");
    });
}

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

const deleteCardPopup = new PopupWithConfirm("#delete-card-modal", () => {});
deleteCardPopup.setEventListeners();

//runs when you click on a card's delete button
function handleDeleteCard(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitHandler(handleDeleteCardFormSubmit);

  //runs when you click the 'yes' button on the delete card modal
  function handleDeleteCardFormSubmit() {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.handleDeleteClick();
      })
      .catch((err) => {
        console.error(err);
        alert("Could not delete place!");
      })
      .finally(() => {
        deleteCardPopup.close();
      });
  }
}

function handleLikeIcon(card) {
  if (!card.getIsLiked()) {
    api
      .addLike(card.getId())
      .then(() => {
        card.handleLikeClick();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .removeLike(card.getId())
      .then(() => {
        card.handleLikeClick();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

editProfileButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileEditPopup.setInputValues(currentUserInfo);
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
