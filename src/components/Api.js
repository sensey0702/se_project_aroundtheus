export default class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { ...this._headers },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // other methods for working with the API

  get(endpoint) {
    return fetch(`${this._baseUrl}${endpoint}`, {
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

  patch(endpoint, body) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  post(endpoint, body) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  put(endpoint, body) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  delete(endpoint) {
    return fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
