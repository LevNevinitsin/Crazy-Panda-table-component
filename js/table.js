import { createElement } from './util.js';

const UP = '▲';
const DOWN = '▼';

let table;
let head;
let body;
let sortedBy;

const updateHead = (element) => {
  const arrow = element.children[0];

  if (element.classList.contains('table__sort-button--active')) {
    arrow.textContent = arrow.textContent === DOWN ? UP : DOWN;
  } else {
    arrow.classList.add('table__arrow--active');
  }

  if (sortedBy !== element) {
    if (sortedBy) {
      sortedBy.classList.remove('table__sort-button--active');
      sortedBy.children[0].classList.remove('table__arrow--active');
    }
    sortedBy = element;
  }

  element.classList.add('table__sort-button--active');
}

const getHead = (data) => {
  head = createElement('thead');
  const tr = createElement('tr');
  const keys = Object.keys(data[0]);

  keys.forEach((key) => {
    const th = createElement('th', 'table__th');
    const sortButton = createElement('button', 'table__sort-button');
    const arrow = createElement('span', 'table__arrow');
    sortButton.textContent = `${key} `;
    arrow.textContent = UP;

    sortButton.appendChild(arrow);
    th.appendChild(sortButton)
    tr.appendChild(th);
  })

  head.appendChild(tr);
  return head;
}

const getBody = (data) => {
  body = createElement('tbody');

  data.forEach((entry) => {
    const tr = createElement('tr');
    const values = Object.values(entry);

    values.forEach((value) => {
      const td = createElement('td', 'table__td');
      td.textContent = value;
      tr.appendChild(td);
    })

    body.appendChild(tr);
  })

  return body;
}

const getDataToDraw = (data, maxElementsNumber, pageNumber) => {
  return data.slice((pageNumber - 1) * maxElementsNumber, Math.min(pageNumber * maxElementsNumber, data.length));
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

export { UP, sortedBy, head, updateHead, body, drawBody, table, createTable };
