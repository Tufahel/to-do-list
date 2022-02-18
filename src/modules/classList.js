export class TaskList {
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