import { createElement } from './util.js';
import { filteredData } from './filter.js';
import { drawBody, body, table } from './table.js';
import { component } from './component.js';

const LEFT = '◀';
const RIGHT = '▶';
let pageNumber = 1;
let pagination;
let paginationCount;
let leftArrow;
let rightArrow;
let paginationList;

const clearComponent = () => {
  body.remove();
  paginationList.querySelector('.pagination__button--number:disabled').disabled = false;
}

const disableNumber = () => {
  paginationList.querySelectorAll('.pagination__button--number')[pageNumber - 1].disabled = true;
}

const enableLeftArrow = () => {
  if (leftArrow.disabled === true) { leftArrow.disabled = false }
}
const enableRightArrow = () => {
  if (rightArrow.disabled === true) { rightArrow.disabled = false }
}
const disableLeftArrow = () => {
  if (pageNumber === 1) { leftArrow.disabled = true }
}
const disableRightArrow = () => {
  if (pageNumber === paginationCount) { rightArrow.disabled = true }
}

const turnPage = (direction, maxElementsNumber) => {
  clearComponent();

  if (direction === LEFT) {
    pageNumber--;
    disableLeftArrow();
    enableRightArrow();
  } else {
    pageNumber++;
    disableRightArrow();
    enableLeftArrow();
  }

  disableNumber();

  drawBody(filteredData, maxElementsNumber, pageNumber);
}

const onLeftArrowClick = (maxElementsNumber) => () => {
  turnPage(LEFT, maxElementsNumber);
}

const onRightArrowClick = (maxElementsNumber) => () => {
  turnPage(RIGHT, maxElementsNumber);
}

const manageArrows = () => {
  enableLeftArrow();
  enableRightArrow();
  disableLeftArrow();
  disableRightArrow();
}

const onPaginationListClick = (maxElementsNumber) => (evt) => {
  if (evt.target.nodeName === 'BUTTON') {
    const button = evt.target;
    clearComponent();
    pageNumber = parseInt(button.textContent);

    manageArrows();

    drawBody(filteredData, maxElementsNumber, pageNumber);
    button.disabled = true;
  }
}

const setListeners = (leftArrow, paginationList, rightArrow, maxElementsNumber) => {
  rightArrow.addEventListener('click', onRightArrowClick(maxElementsNumber));
  leftArrow.addEventListener('click', onLeftArrowClick(maxElementsNumber));
  paginationList.addEventListener('click', onPaginationListClick(maxElementsNumber));
}

const createArrow = (arrow, direction, parent) => {
  arrow = createElement('button', 'pagination__button', 'pagination__button--arrow');
  arrow.textContent = direction;

  if (direction === LEFT) { arrow.disabled = true }

  parent.appendChild(arrow);
  return arrow;
}

const createPaginationList = (elementsNumber, maxElementsNumber) => {
  paginationCount = Math.ceil(elementsNumber / maxElementsNumber);
  for (let i = 1; i <= paginationCount; i++) {
    const paginationItem = createElement('li', 'pagination__item');
    const numberButton = createElement('button', 'pagination__button', 'pagination__button--number');
    numberButton.textContent = i;

    paginationItem.appendChild(numberButton);
    paginationList.appendChild(paginationItem);
  }
  paginationList.querySelector('.pagination__button').disabled = true;
}

const createPagination = (elementsNumber, maxElementsNumber) => {
  pagination = createElement('div', 'pagination');
  const paginationContent = document.createDocumentFragment();

  leftArrow = createArrow(leftArrow, LEFT, paginationContent);

  paginationList = createElement('ol', 'pagination__list');
  createPaginationList(elementsNumber, maxElementsNumber);
  paginationContent.appendChild(paginationList);

  rightArrow = createArrow(rightArrow, RIGHT, paginationContent)

  pagination.appendChild(paginationContent);
  setListeners(leftArrow, paginationList, rightArrow, maxElementsNumber);

  return pagination;
}

const updatePaginationList = (elementsNumber, maxElementsNumber) => {
  paginationList.remove();
  paginationList.innerHTML = '';
  createPaginationList(elementsNumber, maxElementsNumber);
  pageNumber = 1;
  disableLeftArrow();
  enableRightArrow();
  pagination.insertBefore(paginationList, rightArrow)
}

const updatePagination = (elementsNumber, maxElementsNumber) => {
  if (component.contains(pagination)) {
    pagination.remove();
  }
  if (elementsNumber > maxElementsNumber) {
    updatePaginationList(elementsNumber, maxElementsNumber);
    component.insertBefore(pagination, table);
  }
}

export { paginationList, createPagination, updatePagination };
