const buttonBigger = document.querySelector('.scale__control--bigger');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const scaleControlInput = document.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview img');

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};

const normalizeValue = () => parseInt(scaleControlInput.value, 10);

const scalePhoto = (evt) => {
  const isIncrease = evt.target === buttonBigger;
  const isDecrease = evt.target === buttonSmaller;

  let value = normalizeValue();

  if (isIncrease && value < Scale.MAX) {
    value += Scale.STEP;
  }

  if (isDecrease && value > Scale.MIN) {
    value -= Scale.STEP;
  }

  scaleControlInput.value = `${value}%`;
  picture.style.transform = `scale(${value / 100})`;
};

buttonBigger.addEventListener('click', scalePhoto);
buttonSmaller.addEventListener('click', scalePhoto);
