import {pristine} from './form-validation';
import {isEscape} from './util';
import './picture-scaling.js';
import {resetStyle} from './picture-effects.js';

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadImageForm.querySelector('.img-upload__input');
const editImageForm = uploadImageForm.querySelector('.img-upload__overlay');
const closeButton = editImageForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');

const checkFocus = () => hashtagInput === document.activeElement || commentInput === document.activeElement;

const closeEditForm = () => {
  editImageForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', closeEditFormKeydown);

  uploadImageInput.value = '';
  resetStyle();

  pristine.reset();
};

function closeEditFormKeydown(evt) {
  if (isEscape(evt) && !checkFocus()) {
    evt.preventDefault();
    closeEditForm();
  }
}

const openEditForm = () => {
  editImageForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', closeEditFormKeydown);
};

uploadImageInput.addEventListener('change', openEditForm);
closeButton.addEventListener('click', closeEditForm);
