const STEP_VALUE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const decreaseButtonElement = document.querySelector('.scale__control--smaller');
const zoomButtonElement = document.querySelector('.scale__control--bigger');
const inputValueElement = document.querySelector('.scale__control--value');
const photoPreviewElement = document.querySelector('.img-upload__preview img');

let currentValue = 0;

const scalePhoto = (value) => {
  photoPreviewElement.style.transform = `scale(${value / 100})`;
  inputValueElement.value = `${value}%`;
};

decreaseButtonElement.addEventListener('click', () => {
  currentValue = parseInt(inputValueElement.value, 10);
  let newValue = currentValue - STEP_VALUE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scalePhoto(newValue);
});

zoomButtonElement.addEventListener('click', () => {
  currentValue = parseInt(inputValueElement.value, 10);
  let newValue = currentValue + STEP_VALUE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scalePhoto(newValue);
});

const resetScale = () => scalePhoto(DEFAULT_SCALE);

export {resetScale};
