import './style.css';

class TaskList {
  todos = [];

  save() {
    const todos = JSON.stringify(this.todos);
    localStorage.setItem('todos', todos);
  }

  add(description) {
    const todo = {
      description,
      completed: false,
      index: this.todos.length + 1,
    };
    this.todos.push(todo);
    this.save();
  }

  delete(id) {
    this.todos.splice(id - 1, 1);
    this.todos.forEach((i) => {
      if (i.index > id) {
        i.index -= 1;
      }
    });
    this.save();
  }

  getReserved() {
    this.todos = JSON.parse(localStorage.getItem('todos'));
  }

  edit(value, index) {
    this.todos[index - 1].description = value;
    this.save();
  }

  completed(status, index) {
    this.todos[index - 1].completed = status;
    this.save();
  }

  clearCompleted() {
    this.todos = this.todos.filter((a) => a.completed === false);
    for (let i = 0; i < this.todos.length; i += 1) {
      this.todos[i].index = i + 1;
    }
    this.save();
  }
}

const todo = new TaskList();
const listSection = document.querySelector('.list-section');

const create = () => {
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

const form = document.getElementById('form');

const getAdded = () => {
  const description = document.getElementById('new-todo').value;
  if (description != '') {
    todo.add(description);
    create();
    form.reset();
  }
};

const populate = () => {
  if (localStorage.getItem('todos')) {
    todo.getReserved();
    create();
  } else {
    create();
  }
};

const clearCompletedBtn = document.getElementById('clear-completed');
const clearCompleted = () => {
  clearCompletedBtn.addEventListener('click', () => {
    todo.clearCompleted();
    create();
  });
};

populate();
form.addEventListener('submit', getAdded);
clearCompleted();