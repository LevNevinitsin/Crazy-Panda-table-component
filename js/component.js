import { createElement } from './util.js';
import { sourceData } from './generated-data.js';
import { createFilter, createFilterListener } from './filter.js';
import { createTable } from './table.js';
import { createPagination } from './pagination.js';

let component;

const createComponent = (maxElementsNumber) => {

  component = createElement('div', 'component');

  component.appendChild(createFilter());
  createFilterListener(maxElementsNumber);

  if (sourceData.length > maxElementsNumber) {
    component.appendChild(createPagination(sourceData.length, maxElementsNumber));
  }

  component.appendChild(createTable(sourceData, maxElementsNumber));

  return component;
}

export { component, createComponent };
