import {getRandomInteger, createIdGenerator, getRandomArrayElement} from './util.js';

const PICTURE_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 6;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Фотография не является отражением реальности. Она есть реальность этого отражения.',
  'Реальность становится всё больше похожа на фотографии.',
  'В любой ситуации всегда улыбайтесь.',
  'В простоте есть удивительная красота.',
  'Думать следует до и после съёмки, никогда во время её.',
  'На всякий случай, а то вдруг вы забыли, как я выгляжу…'
];
const NAMES = ['Иван', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита'];

const generateCommentId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generateUrlId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const getPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(1, COMMENT_COUNT)}, createComment)
});

const createPhotos = () => Array.from({length: PICTURE_COUNT}, getPhoto);

export {createPhotos};


