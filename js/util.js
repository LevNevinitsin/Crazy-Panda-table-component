const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
}

const createElement = (tag, ...classes) => {
  const element = document.createElement(tag);

  if (classes) {
    classes.forEach((elementClass) => {
      element.classList.add(elementClass);
    });
  }

  return element;
}

export { getRandomInteger, getRandomArrayElement, createElement };
