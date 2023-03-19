import {createPictures} from './picture.js';
import {isEscapeKey, isEnterKey} from './util.js';

const pictureContainer = document.querySelector('.pictures');
const photoModalElement = document.querySelector('.big-picture');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = (evt) => {
  photoModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  photoModalElement.querySelector('img').src = evt.target.src;
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeModal () {
  photoModalElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

photoModalCloseElement.addEventListener('click', () => {
  closeModal();
});

photoModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});

const createGallery = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('[data-picture-element-id]');
    if (!pictureElement) {
      return;
    }
    const picture = pictures.find((item) => item.id === pictureElement.dataset.pictureElementId);
    openModal(picture);
  });
  createPictures(pictures, pictureContainer);
};

export {createGallery};
