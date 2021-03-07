import { createElement } from './util.js';
import { sourceData } from './generated-data.js';
import { sortData } from './sort-data.js';
import { updatePagination } from './pagination.js';
import { sortedBy, drawBody, body } from './table.js';

const LABEL_TEXT = 'Filter: ';
const FILTER_TYPE = 'text';

let filter;
let filteredData = sourceData;

const filterData = (data, request) => {
  let result = data;
  if (request) {
    result = data.filter((entry) => {
      return Object.values(entry).some((value) => value.toString().includes(request))
    })
  }
  if (sortedBy) {
    sortData(result, sortedBy);
  }
  return result;
}

const createFilter = () => {
  const filterBox = createElement('div', 'component__filter');
  const label = createElement('label', 'component__label');
  label.textContent = LABEL_TEXT;
  filter = createElement('input', 'component__input');
  filter.type = FILTER_TYPE;

  label.appendChild(filter);
  filterBox.appendChild(label);
  return filterBox;
}

const onFilterInput = (maxElementsNumber) => (evt) => {
  body.remove();
  const request = evt.target.value;
  filteredData = filterData(sourceData, request);
  updatePagination(filteredData.length, maxElementsNumber);
  drawBody(filteredData, maxElementsNumber, 1);
}

const createFilterListener = (maxElementsNumber) => {
  filter.addEventListener('input', onFilterInput(maxElementsNumber));
}

export { filteredData, createFilter, createFilterListener }
