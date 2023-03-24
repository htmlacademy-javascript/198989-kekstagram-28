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
const sliderContainer = document.querySelector('.img-upload__effect-level');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const effectItem = document.querySelector('.effects');

let currentFilter = FILTERS[0];

const isDefault = () => currentFilter === FILTERS[0];

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
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

effectItem.addEventListener('change', (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentFilter = FILTERS.find((filter) => filter.name === evt.target.value);
  photoPreview.className = `effects__preview--${currentFilter.name}`;
  updateFilter();
});


const resetEffects = () => {
  currentFilter = FILTERS[0];
  updateFilter();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  photoPreview.style.filter = isDefault()
    ? FILTERS[0].style
    : `${currentFilter.style}(${sliderValue}${currentFilter.unit})`;
  effectLevel.value = sliderValue;
};

sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
