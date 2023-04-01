const FILTERS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  }
];

const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const photoPreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelElement = document.querySelector('.effect-level__value');
const effectItemElement = document.querySelector('.effects');

let currentFilter = FILTERS[0];

const isDefault = () => currentFilter === FILTERS[0];

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower'
});
hideSlider();

const updateFilter = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentFilter.min,
      max: currentFilter.max
    },
    start: currentFilter.max,
    step: currentFilter.step
  });
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

effectItemElement.addEventListener('change', (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentFilter = FILTERS.find((filter) => filter.name === evt.target.value);
  photoPreviewElement.className = `effects__preview--${currentFilter.name}`;
  updateFilter();
});


const resetEffects = () => {
  currentFilter = FILTERS[0];
  updateFilter();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  photoPreviewElement.style.filter = isDefault()
    ? FILTERS[0].style
    : `${currentFilter.style}(${sliderValue}${currentFilter.unit})`;
  effectLevelElement.value = sliderValue;
};

sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
