import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const photoUploadButton = document.querySelector('#upload-file');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const inputValue = document.querySelector('.scale__control--value');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  inputValue.setAttribute('value', '100%');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  imgUploadForm.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

cancelButton.addEventListener('click', () => {
  closeModal();
});

const isInputsFocused = () => document.activeElement === hashtagInput || document.activeElement === descriptionInput;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isInputsFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const getTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return tags;
};

const validateLength = (value) => getTags(value).every((item) => item.length <= MAX_HASHTAG_LENGTH);

const validateCount = (value) => getTags(value).length <= MAX_HASHTAG_COUNT;

const validateFirstSymbol = (value) => getTags(value).every((item) => /^#/.test(item));

const validateSymbols = (value) => getTags(value).every((item) => /^.[\wА-яЁё]+$/.test(item));

const validateUniqueness = (tags) => {
  const lowerCaseTags = getTags(tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const errors = new Map();
errors.set(validateFirstSymbol, 'Хэш-тег должен начинаться с символа # (решётка)')
  .set(validateLength, 'Максимальная длина хэш-тега 20 символов')
  .set(validateSymbols, 'Хэш-теги должны состоять из букв и чисел')
  .set(validateCount, 'Нельзя указать больше пяти хэш-тегов')
  .set(validateUniqueness, 'Хэш-теги не должны повторяться');

errors.forEach((value, key) =>
  pristine.addValidator(
    hashtagInput,
    key,
    value
  )
);

/*pristine.addValidator(
  hashtagInput,
  validateFirstSymbol,
  'Хэш-тег должен начинаться с символа # (решётка)'
);

pristine.addValidator(
  hashtagInput,
  validateLength,
  'Максимальная длина хэш-тега 20 символов'
);

pristine.addValidator(
  hashtagInput,
  validateSymbols,
  'Хэш-теги должны состоять из букв и чисел'
);

pristine.addValidator(
  hashtagInput,
  validateUniqueness,
  'Хэш-теги не должны повторяться'
);

pristine.addValidator(
  hashtagInput,
  validateCount,
  'Нельзя указать больше пяти хэш-тегов'
);*/

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const loadPhoto = () => {
  photoUploadButton.addEventListener('change', () => {
    openModal();
  });
};

export {loadPhoto};
