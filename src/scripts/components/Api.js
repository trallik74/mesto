export default class Api {
  constructor({url, header}) {
    this._url = url;
    this._header = header;
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(response.status);
      })
  }

  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'GET',
      headers: this._header
    })
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._header
    })
  }

  updateUserInfo({name, about}) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({name, about})
    })
  }

  createCard({name, link}) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({name, link})
    })
  }

  deleteCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._header
    })
  }

  likeCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._header
    })
  }

  removeLikeFromCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._header
    })
  }

  changeAvatar(avatar) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({avatar})
    })
  }
}
