import { todo, create } from './showList.js';

const clearCompletedBtn = document.getElementById('clear-completed');

export const clearCompleted = () => {
  clearCompletedBtn.addEventListener('click', () => {
    todo.clearCompleted();
    create();
  });
};