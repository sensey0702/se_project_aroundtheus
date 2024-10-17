export default class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: { ...this._headers },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: { ...this._headers },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: { ...this._headers },
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: { ...this._headers },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: { ...this._headers },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  removeLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: { ...this._headers },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this._headers },
      body: JSON.stringify({ avatar: link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
