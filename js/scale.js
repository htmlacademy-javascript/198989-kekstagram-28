const STEP_VALUE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const decreaseButton = document.querySelector('.scale__control--smaller');
const zoomButton = document.querySelector('.scale__control--bigger');
const inputValue = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview img');

let currentValue = 0;

const scalePhoto = (value) => {
  photoPreview.style.transform = `scale(${value / 100})`;
  inputValue.value = `${value}%`;
};

decreaseButton.addEventListener('click', () => {
  currentValue = parseInt(inputValue.value, 10);
  let newValue = currentValue - STEP_VALUE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scalePhoto(newValue);
});

zoomButton.addEventListener('click', () => {
  currentValue = parseInt(inputValue.value, 10);
  let newValue = currentValue + STEP_VALUE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scalePhoto(newValue);
});

const resetScale = () => scalePhoto(DEFAULT_SCALE);

export {resetScale};
