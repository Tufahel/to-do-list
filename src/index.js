import './style.css';

const toDoTasks = [
  {
    description: 'Read books',
    progress: false,
    id: 1,
  },
  {
    description: 'Workout in the gym',
    progress: false,
    id: 0,
  },
  {
    description: 'Study online',
    progress: false,
    id: 2,
  },
  {
    description: 'Play with friends',
    progress: false,
    id: 4,
  },
  {
    description: 'Timepass with family',
    progress: false,
    id: 3,
  },
];

const taskContainer = document.querySelector('.list-container');
const clearBtn = document.createElement('button');
clearBtn.className = 'clear-btn';
clearBtn.textContent = 'Clear Checked Items';

const render = (toDo) => {
  const li = document.createElement('li');
  const check = document.createElement('input');
  const toDoDescription = document.createElement('p');
  const showMore = document.createElement('i');

  li.className = 'task';
  check.className = 'check-box';
  toDoDescription.className = 'toDo-description';

  showMore.classList.add('fa-solid');
  showMore.classList.add('fa-ellipsis-vertical');

  check.setAttribute('value', 1);
  check.type = 'checkbox';

  toDoDescription.textContent = toDo.description;

  li.appendChild(check);
  li.appendChild(toDoDescription);
  li.appendChild(showMore);

  taskContainer.appendChild(li);
};

toDoTasks
  .sort((one, two) => one.id - two.id)
  .forEach((toDo) => {
    render(toDo);
  });

if (toDoTasks.length) {
  taskContainer.appendChild(clearBtn);
}