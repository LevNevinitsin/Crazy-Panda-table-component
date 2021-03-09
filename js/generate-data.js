import { NAMES } from './static-data.js'
import { getRandomInteger, getRandomArrayElement } from './util.js';

const generateData = (elementsNumber) => {
  const data = [];

  for (let i = 1; i <= elementsNumber; i++) {
    const newItem = {};
    newItem.id = i;
    newItem.name = getRandomArrayElement(NAMES);
    newItem.salary = getRandomInteger(40, 160) * 1000;
    data.push(newItem);
  }

  return data;
}

export { generateData };
