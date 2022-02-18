import { todo, create } from './showList.js';

export const populate = () => {
  if (localStorage.getItem('todos')) {
    todo.getReserved();
    create();
  } else {
    create();
  }
};