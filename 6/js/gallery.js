const COMMENTS_COUNT = 5;

import {createPictures} from './picture.js';
import {renderBigPictureData} from './big-picture.js';
import {isEscapeKey, isEnterKey} from './util.js';

const pictureContainer = document.querySelector('.pictures');
const photoModalElement = document.querySelector('.big-picture');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');

let commentsShown = 0;
let comments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const createComment = ({avatar, message, name}) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_COUNT;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const openModal = (picture) => {
  photoModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderBigPictureData(picture);
  comments = picture.comments;
  if (comments.length > 0) {
    commentsShown = 0;
    renderComments();
  }
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

const onCommentsLoaderClick = () => renderComments();
commentsLoader.addEventListener('click', onCommentsLoaderClick);

const createGallery = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('[data-picture-element-id]');
    if (!pictureElement) {
      return;
    }
    const picture = pictures.find((item) => item.id === +pictureElement.dataset.pictureElementId);
    openModal(picture);
  });
  createPictures(pictures, pictureContainer);
};

export {createGallery};
