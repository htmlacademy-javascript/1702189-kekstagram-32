import {pristine} from './form-validation';

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadImageForm.querySelector('.img-upload__input');
const editImageForm = uploadImageForm.querySelector('.img-upload__overlay');
const closeButton = editImageForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');

const checkFocus = () => hashtagInput === document.querySelector(':focus') || commentInput === document.querySelector(':focus');

const closeEditForm = () => {
  editImageForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', closeEditFormKeydown);

  uploadImageInput.value = '';

  pristine.reset();
};

function closeEditFormKeydown(evt) {
  if (evt.key === 'Escape' && !checkFocus()) {
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
