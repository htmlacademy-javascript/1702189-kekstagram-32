const uploadImageForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const MAX_COMMENT_LENGTH = 140;
const ERROR_COMMENT_MESSAGE = `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`;

const HashtagErrorText = {
  INVALID: 'Введён невалидный хэштег',
  MAX_COUNT: 'Превышено количество хэштегов',
  REPEAT: 'Хэштеги повторяются'
};

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const validateForm = (evt) => {
  evt.preventDefault();
  return pristine.validate();
};

const isHashtagValid = (item) => VALID_SYMBOLS_REGEXP.test(item);

const normalizeString = (value) => value.toLowerCase().split(/\s+/);

const validateHashtagText = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = normalizeString(value);

  return hashtags.every(isHashtagValid);
};

const validateHashtagCount = (value) => {
  const hashtags = normalizeString(value);

  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const validateHashtagRepeat = (value) => {
  const hashtags = normalizeString(value);

  const set = new Set();

  hashtags.forEach((item) => set.add(item));

  return hashtags.length === set.size;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  validateHashtagText,
  HashtagErrorText.INVALID,
  3,
  true
);

pristine.addValidator(
  hashtagInput,
  validateHashtagCount,
  HashtagErrorText.MAX_COUNT,
  2,
  true
);

pristine.addValidator(
  hashtagInput,
  validateHashtagRepeat,
  HashtagErrorText.REPEAT,
  1,
  true
);

pristine.addValidator(
  commentInput,
  validateCommentLength,
  ERROR_COMMENT_MESSAGE
);

export {
  pristine,
  validateForm
};
