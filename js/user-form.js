import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {showErrorMessage} from './message.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imgUploadFormElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const photoUploadButtonElement = document.querySelector('#upload-file');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');
const inputValueElement = document.querySelector('.scale__control--value');
const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');
const fileChooserElement = document.querySelector('.img-upload__input');
const previewElement = document.querySelector('.img-upload__preview img');
const miniPreviewsElement = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const openModal = () => {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  inputValueElement.setAttribute('value', '100%');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  imgUploadFormElement.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

cancelButtonElement.addEventListener('click', () => {
  closeModal();
});

const areInputsFocused = () => document.activeElement === hashtagInputElement || document.activeElement === descriptionInputElement;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !areInputsFocused() && !(document.querySelector('.error'))) {
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
    hashtagInputElement,
    key,
    value
  )
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (cb) => {
  imgUploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(imgUploadFormElement));
      unblockSubmitButton();
    }
  });
};

const setOnUploadFormChange = () => {
  photoUploadButtonElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      previewElement.src = URL.createObjectURL(file);
      for (const miniPreviewElement of miniPreviewsElement) {
        miniPreviewElement.style.backgroundImage = `url(${previewElement.src})`;
      }
      openModal();
    } else {
      showErrorMessage();
    }
  });
};

export {setOnFormSubmit, setOnUploadFormChange, closeModal};
