import { createElement } from './util.js';
import { generateData } from './generated-data.js';
import { sortData } from './sort-data.js';
import { filter, createFilter, filterData } from './filter.js';
import { head, updateHead, body, drawBody, createTable } from './table.js';
import { createPagination, paginationList, updatePagination, getCurrentPage } from './pagination.js';

const PAGE_ELEMENTS_MAX = 50;
const TOTAL_ELEMENTS_NUMBER = 1000;

const pageBody = document.body;

let component;
const sourceData = generateData(TOTAL_ELEMENTS_NUMBER);
let filteredData = sourceData;

const createComponent = (maxElementsNumber) => {
  component = createElement('div', 'component');
  component.appendChild(createFilter());
  if (sourceData.length > maxElementsNumber) {
    component.appendChild(createPagination(sourceData.length, maxElementsNumber));
  }
  component.appendChild(createTable(sourceData, maxElementsNumber));
  return component;
}

pageBody.appendChild(createComponent(PAGE_ELEMENTS_MAX));

filter.addEventListener('input', (evt) => {
  body.remove();
  const request = evt.target.value;
  filteredData = filterData(sourceData, request);
  updatePagination(component, filteredData.length, PAGE_ELEMENTS_MAX);
  drawBody(filteredData, PAGE_ELEMENTS_MAX, 1);
});

head.addEventListener('click', (evt) => {
  const attribute = evt.target.closest('.table__th');
  updateHead(attribute);
  body.remove();
  drawBody(sortData(filteredData, attribute), PAGE_ELEMENTS_MAX, getCurrentPage());
});

paginationList.addEventListener('click', (evt) => {
  if (evt.target.nodeName === 'BUTTON') {
    body.remove();
    paginationList.querySelector('.pagination__button--number:disabled').disabled = false;
    evt.target.disabled = true;
    drawBody(filteredData, PAGE_ELEMENTS_MAX, getCurrentPage());
  }
});
