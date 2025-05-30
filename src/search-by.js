// search-by-title.js

// allow searching projects by index
export function findProjectByIndex(projectsList, index) {
  if (0 <= index && index < projectsList.length) {
    return projectsList[index];
  } else {
    console.log("Not a valid project index");
    return null;
  }
}

// allow searching todo items by index
export function findTodoByIndex(project, index) {
  if (0 <= index && index < project.todos.length) {
    return project.todos[index];
  } else {
    console.log("Not a valid todo item index");
    return null;
  }
}

// allow searching checklists by index
export function findChecklistByIndex(todo, index) {
  if (0 <= index && index < todo.Checklist.length) {
    return todo.Checklist[index];
  } else {
    console.log("Not a valid checklist item index");
    return null;
  }
}
