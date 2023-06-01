const baseUrl = 'https://auth.nomoreparties.co';

function handleQuery({
  method, link, data, extraHeaders,
}) {
  const headers = {
    ...extraHeaders,
    'Content-Type': 'application/json',
  };
  let responseOk = false;
  let responseStatus = '';
  return fetch(`${baseUrl}${link}`, {
    method,
    headers,
    body: JSON.stringify(data),
  })
    .then((res) => {
      responseOk = res.ok;
      responseStatus = res.status;
      try {
        return res.json();
      } catch (e) {
        return Promise.reject('unknown');
      }
    })
    .then((resData) => {
      if (responseOk) {
        return Promise.resolve(resData);
      }
      if (responseStatus === 400 || responseStatus === 401) {
        return Promise.reject(resData.error ?? resData.message ?? JSON.stringify(resData));
      }
      return Promise.reject('unknown');
    });
}

export function getContent(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return handleQuery({
    method: 'GET',
    link: '/users/me',
    extraHeaders: headers,
  });
}

export function authorize(data) {
  return handleQuery({
    method: 'POST',
    link: '/signin',
    data,
  })
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
      }
      return res;
    });
}

export function register(data) {
  return handleQuery({
    method: 'POST',
    link: '/signup',
    data,
  });
}
