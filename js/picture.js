const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictures = (pictures) => {
  const pictureContainerFragment = document.createDocumentFragment();

  pictures.forEach(({url, description, comments, likes}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureContainer.append(pictureElement);
  });

  pictureContainer.append(pictureContainerFragment);
};

export {createPictures};
