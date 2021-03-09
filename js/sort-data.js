import { UP } from './table.js';

const sortData = (data, element) => {
  const key = element.textContent.split(' ')[0];
  const isAscending = element.children[0].textContent === UP ? true : false;

  let cb;

  if (typeof data[0][key] === 'number') {
    cb = isAscending
      ? (a, b) => a[key] - b[key]
      : (a, b) => b[key] - a[key];
  } else {
    if (isAscending) {
      cb = (a, b) => {
        if (a[key] > b[key]) { return 1 }
        if (a[key] < b[key]) { return -1 }
        return 0;
      }
    } else {
      cb = (a, b) => {
        if (a[key] < b[key]) { return 1 }
        if (a[key] > b[key]) { return -1 }
        return 0;
      }
    }
  }

  return data.sort(cb);
}

export { sortData };
