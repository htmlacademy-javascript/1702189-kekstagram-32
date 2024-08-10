const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (array) => {
  const randomElement = getRandomInteger(0, (array.length - 1));
  return randomElement;
};

const isEscape = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getRandomArrayElement,
  isEscape
};
