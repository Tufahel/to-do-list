import { TaskList } from './classList.js';

export const todo = new TaskList();
const listSection = document.querySelector('.list-section');

export const create = () => {
  listSection.replaceChildren();
  if (todo.todos.length > 0) {
    listSection.style.display = 'block';
    const listContainer = document.createElement('ul');
    listContainer.className = 'allTodos';
    listSection.appendChild(listContainer);
    todo.todos.map((a) => {
      const list = document.createElement('li');
      list.className = 'todo';

      const descriptionContainer = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'checkbox';
      if (a.completed === true) {
        checkbox.checked = 'checked';
      }

      checkbox.onclick = (e) => {
        todo.completed(e.target.checked, a.index);
      };

      descriptionContainer.appendChild(checkbox);

      const descript = document.createElement('p');
      descript.id = 'task-description';
      descript.textContent = a.description;
      descriptionContainer.appendChild(descript);
      list.appendChild(descriptionContainer);

      const editIcon = document.createElement('i');
      editIcon.className = 'fa fa-solid fa-pen-to-square';
      list.appendChild(editIcon);

      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fa fa-solid fa-trash';
      deleteIcon.id = a.index;

      list.onclick = () => {
        descript.contentEditable = 'true';
        list.style.backgroundColor = 'whitesmoke';
        list.appendChild(deleteIcon);
        editIcon.style.display = 'none';
        list.addEventListener('keydown', () => {
          todo.edit(descript.innerHTML, a.index);
        });
      };
      deleteIcon.onclick = () => {
        todo.delete(a.index);
        todo.save();
        create();
      };
      listContainer.append(list);
      return list;
    });
    listSection.appendChild(listContainer);
  }
};