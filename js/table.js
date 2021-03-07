import { createElement } from './util.js';
import { sortData } from './sort-data.js';
import { filteredData } from './filter.js';
import { paginationList } from './pagination.js';

const UP = '▲';
const DOWN = '▼';

let table;
let head;
let body;
let sortedBy;

const getCurrentPage = () => {
  return parseInt(paginationList.querySelector('.pagination__button--number:disabled').textContent)
}

const onHeadClick = (maxElementsNumber) => (evt) => {
  const element = evt.target.closest('.table__th');
  const arrow = element.children[0];

  if (element.classList.contains('table__th--active')) {
    arrow.textContent = arrow.textContent === DOWN ? UP : DOWN
  } else {
    arrow.classList.add('table__arrow--active')
  }

  if (sortedBy && sortedBy !== element) {
    sortedBy.classList.remove('table__th--active', 'table__th--ascending');
    sortedBy.children[0].classList.remove('table__arrow--active');
  }

  sortedBy = element;

  element.classList.add('table__th--active', 'table__th--ascending');

  body.remove();

  const sortedData = sortData(filteredData, element);
  drawBody(sortedData, maxElementsNumber, getCurrentPage());
}

const setHeadListeners = (maxElementsNumber) => {
  head.addEventListener('click', onHeadClick(maxElementsNumber));
}

const getHead = (data, maxElementsNumber) => {
  head = createElement('thead');
  const tr = createElement('tr');

  const trContent = document.createDocumentFragment();

  const keys = Object.keys(data[0])
  keys.forEach((key) => {
    const th = createElement('th', 'table__th');
    const arrow = createElement('span', 'table__arrow');
    th.textContent = `${key} `;
    arrow.textContent = DOWN;
    th.appendChild(arrow);
    trContent.appendChild(th);
  })

  tr.appendChild(trContent);
  head.appendChild(tr);

  setHeadListeners(maxElementsNumber);

  return head;
}

const getBody = (data) => {
  body = createElement('tbody');
  const bodyContent = document.createDocumentFragment();
  data.forEach((entry) => {
    const tr = createElement('tr');
    const trContent = document.createDocumentFragment();

    const values = Object.values(entry);

    values.forEach((value) => {
      const td = createElement('td', 'table__td');
      td.textContent = value;
      trContent.appendChild(td);
    })
    tr.appendChild(trContent);

    bodyContent.appendChild(tr);
  })

  body.appendChild(bodyContent);

  return body;
}

const getDataToDraw = (data, maxElementsNumber, pageNumber) => {
  return data.slice((pageNumber - 1) * maxElementsNumber, Math.min(pageNumber * maxElementsNumber, data.length))
}

const drawBody = (data, maxElementsNumber, pageNumber) => {
  const dataToDraw = getDataToDraw(data, maxElementsNumber, pageNumber);
  table.appendChild(getBody(dataToDraw));
}

const createTable = (data, maxElementsNumber, pageNumber = 1) => {

  table = createElement('table', 'table');

  table.appendChild(getHead(data, maxElementsNumber));
  drawBody(data, maxElementsNumber, pageNumber);

  return table;
}

export { UP, sortedBy, drawBody, body, table, createTable };
