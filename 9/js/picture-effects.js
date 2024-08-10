const picture = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const valueInput = document.querySelector('.effect-level__value');
const fieldset = document.querySelector('.img-upload__effects');

const effectsList = document.querySelector('.effects__list');
const effectNone = effectsList.querySelector('#effect-none');
const effectChrome = effectsList.querySelector('#effect-chrome');
const effectSepia = effectsList.querySelector('#effect-sepia');
const effectMarvin = effectsList.querySelector('#effect-marvin');
const effectPhobos = effectsList.querySelector('#effect-phobos');
const effectHeat = effectsList.querySelector('#effect-heat');

const PictureEffect = {
  NONE: 'none',
  CHROME: 'grayscale',
  SEPIA: 'sepia',
  MARVIN: 'invert',
  PHOBOS: 'blur',
  HEAT: 'brightness'
};

const DEFAULT_SLIDER_OPTIONS = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1
};

const MARVIN_SLIDER_OPTIONS = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const PHOBOS_SLIDER_OPTIONS = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const HEAT_SLIDER_OPTIONS = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

noUiSlider.create(slider, {
  ...DEFAULT_SLIDER_OPTIONS,
  connect: 'lower',
});

sliderContainer.classList.add('hidden');

let currentEffect;

const useEffect = () => {
  if (currentEffect === PictureEffect.PHOBOS) {
    picture.style.filter = `${currentEffect}(${valueInput.value}px)`;

    return;
  }

  if (currentEffect === PictureEffect.MARVIN) {
    picture.style.filter = `${currentEffect}(${valueInput.value}%)`;

    return;
  }

  if (currentEffect === PictureEffect.NONE) {
    picture.style.filter = '';

    return;
  }

  picture.style.filter = `${currentEffect}(${valueInput.value})`;
};

const changeEffect = (evt) => {
  sliderContainer.classList.remove('hidden');

  if (evt.target === effectChrome) {
    slider.noUiSlider.updateOptions(DEFAULT_SLIDER_OPTIONS);

    currentEffect = PictureEffect.CHROME;
  }

  if (evt.target === effectSepia) {
    slider.noUiSlider.updateOptions(DEFAULT_SLIDER_OPTIONS);

    currentEffect = PictureEffect.SEPIA;
  }

  if (evt.target === effectMarvin) {
    slider.noUiSlider.updateOptions(MARVIN_SLIDER_OPTIONS);

    currentEffect = PictureEffect.MARVIN;
  }

  if (evt.target === effectPhobos) {
    slider.noUiSlider.updateOptions(PHOBOS_SLIDER_OPTIONS);

    currentEffect = PictureEffect.PHOBOS;
  }

  if (evt.target === effectHeat) {
    slider.noUiSlider.updateOptions(HEAT_SLIDER_OPTIONS);

    currentEffect = PictureEffect.HEAT;
  }

  if (evt.target === effectNone) {
    sliderContainer.classList.add('hidden');

    currentEffect = PictureEffect.NONE;
  }

  useEffect();

  valueInput.value = '';
};

slider.noUiSlider.on('update', () => {
  valueInput.value = parseFloat(slider.noUiSlider.get());

  useEffect();
});

fieldset.addEventListener('change', changeEffect);

const resetStyle = () => {
  picture.style = '';
  valueInput.value = '';
  sliderContainer.classList.add('hidden');
};

export {resetStyle};
