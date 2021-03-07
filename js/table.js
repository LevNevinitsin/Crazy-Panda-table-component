import { createElement } from './util.js';
import { getCurrentPage } from './pagination.js';

const UP = '▲';
const DOWN = '▼';

let table;
let head;
let body;
let sortedBy;

const updateHead = (element) => {

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
}

const getHead = (data) => {
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

  table.appendChild(getHead(data));
  drawBody(data, maxElementsNumber, pageNumber);

  return table;
}

export { UP, sortedBy, head, updateHead, drawBody, body, table, createTable, getCurrentPage };
