class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleQuery({ relativeLink, method, body }) {
    const options = {
      method,
      headers: this._headers,
    };

    if (body) options.body = body;

    return fetch(`${this._baseUrl}${relativeLink}`, options)
      .then((response) => {
        if (response.ok) return response.json();

        return Promise.reject(response.status);
      });
  }

  getData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'GET',
    });
  }

  patchData(relativeLink, dataBody) {
    return this._handleQuery({
      relativeLink,
      method: 'PATCH',
      body: JSON.stringify(dataBody),
    });
  }

  postData(relativeLink, dataBody) {
    return this._handleQuery({
      relativeLink,
      method: 'POST',
      body: JSON.stringify(dataBody),
    });
  }

  deleteData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'DELETE',
    });
  }

  putData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'PUT',
    });
  }

  getUserInfo() {
    return this.getData('users/me');
  }

  changeLikeCardStatus(cardId, shouldSetLike) {
    if (shouldSetLike) {
      return this.putData(`cards/${cardId}/likes`);
    }
    return this.deleteData(`cards/${cardId}/likes`);
  }

  deleteCard(cardId) {
    return this.deleteData(`cards/${cardId}`);
  }

  addCard(data) {
    return this.postData('cards', data);
  }

  setUserInfo(data) {
    return this.patchData('users/me', data);
  }

  setUserAvatar(data) {
    return this.patchData('users/me/avatar', data);
  }

  getInitialCards() {
    return this.getData('cards');
  }
}

const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
    headers: {
      authorization: '389cc047-0fd3-4299-98ad-2eb5ed0f0d06',
      'content-type': 'application/json',
    },
  },
);

export default api;
