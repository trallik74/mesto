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
    .catch(error => {
      console.log('При загрузке карточки произошла ошибка ' + error);

      return []
    })


  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._header
    })
    .catch(error => {
      console.log('При загрузке пользоваетля произошла ошибка ' + error);

      return {
        name: 'unknown',
        about: 'unknown',
        avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
        _id: null
      }
    })
  }

  updateUserInfo({name, about}) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({name, about})
    })
    .catch(error => {
      console.log('При обновление информации о пользователе произошла ошибка ' + error);
    })
  }

  createCard({name, link}) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({name, link})
    })
    .catch(error => {
      console.log('При добавление карточки произошла ошибка ' + error);
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
    .catch(error => {
      console.log('При обновление аватара произошла ошибка ' + error);
    })
  }
}
