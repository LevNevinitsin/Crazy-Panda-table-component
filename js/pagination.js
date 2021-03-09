import { createElement } from './util.js';
import { table } from './table.js';

let pagination;
let paginationList;

const getCurrentPage = () => {
  return parseInt(paginationList.querySelector('.pagination__button:disabled').textContent)
}

const createPaginationList = (elementsNumber, maxElementsNumber) => {
  const paginationCount = Math.ceil(elementsNumber / maxElementsNumber);

  for (let i = 1; i <= paginationCount; i++) {
    const paginationItem = createElement('li', 'pagination__item');
    const numberButton = createElement('button', 'pagination__button');
    numberButton.textContent = i;
    paginationItem.appendChild(numberButton);
    paginationList.appendChild(paginationItem);
  }

  paginationList.querySelector('.pagination__button').disabled = true;
}

const createPagination = (elementsNumber, maxElementsNumber) => {
  pagination = createElement('div', 'pagination');
  paginationList = createElement('ol', 'pagination__list');
  createPaginationList(elementsNumber, maxElementsNumber);
  pagination.appendChild(paginationList);
  return pagination;
}

const updatePaginationList = (elementsNumber, maxElementsNumber) => {
  paginationList.remove();
  paginationList.innerHTML = '';
  createPaginationList(elementsNumber, maxElementsNumber);
  pagination.appendChild(paginationList);
}

const updatePagination = (component, elementsNumber, maxElementsNumber) => {
  if (component.contains(pagination)) {
    pagination.remove();
  }

  if (elementsNumber > maxElementsNumber) {
    updatePaginationList(elementsNumber, maxElementsNumber);
    component.insertBefore(pagination, table);
  }
}

export {
  paginationList,
  createPagination,
  updatePagination,
  getCurrentPage
};
