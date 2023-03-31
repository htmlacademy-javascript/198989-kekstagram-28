import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const messageSuccess = successTemplate.cloneNode(true);
const successButton = messageSuccess.querySelector('.success__button');
const messageError = errorTemplate.cloneNode(true);
const errorButton = messageError.querySelector('.error__button');

successButton.addEventListener('click', () => {
  messageSuccess.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
});

document.addEventListener('click', (evt) => {
  if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
    messageSuccess.remove();
  }
});

const showSuccessMessage = () => {
  document.body.append(messageSuccess);
  document.addEventListener('keydown', onDocumentKeydown);
};


errorButton.addEventListener('click', () => {
  messageError.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
});

document.addEventListener('click', (evt) => {
  if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
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
