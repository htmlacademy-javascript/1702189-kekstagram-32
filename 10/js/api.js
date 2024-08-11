const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.querySelector('body');

const ERROR_TIMEOUT = 5000;

const showDataError = () => {
  body.append(dataError);
  setTimeout(() => dataError.remove(), ERROR_TIMEOUT);
};

const getData = () => fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .catch(showDataError);

const sendFormData = (evt) => {
  const formData = new FormData(evt.target);

  return fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  });
};

export {
  getData,
  sendFormData
};
