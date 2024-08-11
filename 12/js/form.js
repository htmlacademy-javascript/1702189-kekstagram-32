import {
  pristine,
  validateForm
} from './form-validation';
import {isEscape} from './util';
import './picture-scaling.js';
import {resetStyle} from './picture-effects.js';
import {sendFormData} from './api.js';

const uploadImageForm = document.querySelector('.img-upload__form');
const picturePreview = document.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');
const uploadImageInput = uploadImageForm.querySelector('.img-upload__input');
const editImageForm = uploadImageForm.querySelector('.img-upload__overlay');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');
const submitButton = uploadImageForm.querySelector('.img-upload__submit');
const closeButton = editImageForm.querySelector('.img-upload__cancel');

const body = document.querySelector('body');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = error.querySelector('.error__button');
const success = document.querySelector('#success').content.querySelector('.success');
const successButton = success.querySelector('.success__button');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  BLOCKED: 'Публикация',
  UNBLOCKED: 'Опубликовать'
};

const checkFocus = () => hashtagInput === document.activeElement || commentInput === document.activeElement;

let isSubmitErorrShown = false;

const closeSubmitError = () => {
  error.remove();
  isSubmitErorrShown = false;
  document.removeEventListener('click', onBodyClick);
};

const closeSubmitErrorKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeSubmitError();
    document.removeEventListener('keydown', closeSubmitErrorKeydown);
  }
};

const showSubmitError = () => {
  body.append(error);
  isSubmitErorrShown = true;
  document.addEventListener('keydown', closeSubmitErrorKeydown);
  document.addEventListener('click', onBodyClick);
};

const closeSubmitSuccess = () => {
  document.body.classList.remove('modal-open');
  success.remove();
  document.removeEventListener('click', onBodyClick);
};

const closeSubmitSuccesKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeSubmitSuccess();
    document.removeEventListener('keydown', closeSubmitSuccesKeydown);
  }
};

const showSubmitSuccess = () => {
  document.body.classList.add('modal-open');
  body.append(success);
  document.addEventListener('keydown', closeSubmitSuccesKeydown);
  document.addEventListener('click', onBodyClick);
};

errorButton.addEventListener('click', closeSubmitError);
successButton.addEventListener('click', closeSubmitSuccess);

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }

  closeSubmitError();
  closeSubmitSuccess();
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.BLOCKED;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.UNBLOCKED;
};

const closeEditForm = () => {
  editImageForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', closeEditFormKeydown);

  resetStyle();

  pristine.reset();
  uploadImageForm.reset();
};

const sendForm = (evt) => {
  if (validateForm(evt)) {
    blockSubmitButton();
    sendFormData(evt)
      .then(closeEditForm)
      .then(showSubmitSuccess)
      .catch(showSubmitError)
      .finally(unblockSubmitButton);
  }
};

uploadImageForm.addEventListener('submit', sendForm);

function closeEditFormKeydown(evt) {
  if (isEscape(evt) && !checkFocus() && !isSubmitErorrShown) {
    evt.preventDefault();
    closeEditForm();
  }
}

const openEditForm = () => {
  const file = uploadImageInput.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((it) => fileName.endsWith(it))) {

    picturePreview.src = URL.createObjectURL(file);
    previewEffects.forEach((item) => {
      item.style = `background-image: url("${picturePreview.src}")`;
    });

    editImageForm.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', closeEditFormKeydown);
  }
};

uploadImageInput.addEventListener('change', openEditForm);
closeButton.addEventListener('click', closeEditForm);
