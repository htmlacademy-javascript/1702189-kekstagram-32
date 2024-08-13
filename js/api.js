const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.querySelector('body');

const GET_POSTS_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const UPLOAD_POST_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const ERROR_TIMEOUT = 5000;

const showDataError = () => {
  body.append(dataError);
  setTimeout(() => dataError.remove(), ERROR_TIMEOUT);
};

const getData = () => fetch(GET_POSTS_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(showDataError);

const sendFormData = (evt) => {
  const formData = new FormData(evt.target);

  return fetch(UPLOAD_POST_URL, {
    method: 'POST',
    body: formData,
  });
};

export {
  getData,
  sendFormData
};
