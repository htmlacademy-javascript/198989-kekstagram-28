import {createPictures} from './picture.js';
import {renderBigPictureData} from './big-picture.js';
import {isEscapeKey, isEnterKey} from './util.js';

const COMMENTS_COUNT = 5;

const pictureContainerElement = document.querySelector('.pictures');
const photoModalElement = document.querySelector('.big-picture');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');
const commentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const commentInput = photoModalElement.querySelector('.social__footer-text');

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
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const openModal = (picture) => {
  photoModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
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
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentInput.value = '';
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
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

const createGallery = (pictures) => {
  pictureContainerElement.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('[data-picture-element-id]');
    if (!pictureElement) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find((item) => item.id === +pictureElement.dataset.pictureElementId);
    openModal(picture);
  });
  createPictures(pictures, pictureContainerElement);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

export {createGallery};
