import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const messageSuccess = successTemplate.cloneNode(true);
const successButtonElement = messageSuccess.querySelector('.success__button');
const messageError = errorTemplate.cloneNode(true);
const errorButtonElement = messageError.querySelector('.error__button');
const successTextContainerElement = messageSuccess.querySelector('.success__inner');
const successTitleElement = messageSuccess.querySelector('.success__title');
const errorTextContainerElement = messageSuccess.querySelector('.error__inner');
const errorTitleElement = messageSuccess.querySelector('.error__title');

successButtonElement.addEventListener('click', () => {
  messageSuccess.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
});

document.addEventListener('click', (evt) => {
  if (evt.target !== successTextContainerElement && evt.target !== successTitleElement) {
    messageSuccess.remove();
  }
});

const showSuccessMessage = () => {
  document.body.append(messageSuccess);
  document.addEventListener('keydown', onDocumentKeydown);
};


errorButtonElement.addEventListener('click', () => {
  messageError.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
});

document.addEventListener('click', (evt) => {
  if (evt.target !== errorTextContainerElement && evt.target !== errorTitleElement) {
    messageError.remove();
  }
});

const showErrorMessage = () => {
  document.body.append(messageError);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    messageSuccess.remove();
    messageError.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

export {showSuccessMessage, showErrorMessage};
