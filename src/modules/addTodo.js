import { todo, create } from './showList.js';

export const form = document.getElementById('form');

export const getAdded = () => {
  const description = document.getElementById('new-todo').value;
  if (description != '') {
    todo.add(description);
    create();
    form.reset();
  }
};