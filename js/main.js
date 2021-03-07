import { createElement } from './util.js';
import { sourceData } from './generated-data.js';
import { sortData } from './sort-data.js';
import { filter, createFilter, filterData } from './filter.js';
import { head, updateHead, body, drawBody, createTable } from './table.js';
import { createPagination, paginationList, updatePagination, getCurrentPage } from './pagination.js';

const MAX_ELEMENTS_NUMBER = 50;

const pageBody = document.body;

let component;
let filteredData = sourceData

const createComponent = (maxElementsNumber) => {
  component = createElement('div', 'component');
  component.appendChild(createFilter());

  if (sourceData.length > maxElementsNumber) {
    component.appendChild(createPagination(sourceData.length, maxElementsNumber));
  }
  component.appendChild(createTable(sourceData, maxElementsNumber));
  return component;
}

pageBody.appendChild(createComponent(MAX_ELEMENTS_NUMBER));

filter.addEventListener('input', (evt) => {
  body.remove();
  const request = evt.target.value;
  filteredData = filterData(sourceData, request);
  updatePagination(component, filteredData.length, MAX_ELEMENTS_NUMBER);
  drawBody(filteredData, MAX_ELEMENTS_NUMBER, 1);
});

head.addEventListener('click', (evt) => {
  const attribute = evt.target.closest('.table__th');
  updateHead(attribute);
  body.remove();
  drawBody(sortData(filteredData, attribute), MAX_ELEMENTS_NUMBER, getCurrentPage());
});

const resetContent = () => {
  body.remove();
  paginationList.querySelector('.pagination__button--number:disabled').disabled = false;
}

paginationList.addEventListener('click', (evt) => {
  if (evt.target.nodeName === 'BUTTON') {
    const button = evt.target;
    resetContent();
    button.disabled = true;

    drawBody(filteredData, MAX_ELEMENTS_NUMBER, getCurrentPage());
  }
});
