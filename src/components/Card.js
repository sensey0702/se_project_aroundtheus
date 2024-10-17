class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;

    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._element = cardElement;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  getIsLiked() {
    return this._isLiked;
  }
  getId() {
    return this._id;
  }

  handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_active");
    this._isLiked = !this._isLiked;
  }

  handleDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImageEl = this._cardElement.querySelector(".card__image");

    this._cardImageEl.src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImageEl.alt = this._name;

    this._setEventListeners();

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    return this._cardElement;
  }
}

export default Card;
