import './style.css';

import { getAdded, form } from './modules/addTodo.js';
import { populate } from './modules/populate.js';
import { clearCompleted } from './modules/clear.js';

populate();
form.addEventListener('submit', getAdded);
clearCompleted();