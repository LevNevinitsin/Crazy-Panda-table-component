import { NAMES } from './static-data.js'
import { getRandomInteger, getRandomArrayElement } from './util.js';

const ELEMENTS_NUMBER = 1340;

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

const sourceData = generateData(ELEMENTS_NUMBER)

export { sourceData };
