// delete-todo.js

// imports
import { projectsList } from "./create-projects";

// delete project list
export function deleteProject(index) {
  if (index > -1 && index < projectsList.length) {
    const deleted = projectsList.splice(index, 1);
    console.log("Deleted project:", deleted[0]);
    return deleted[0];
  } else {
    console.log("Not a valid project index");
    return null;
  }
}

// delete todo item
export function deleteTodo(project, index) {
  if (index > -1 && index < project.todos.length) {
    const deleted = project.todos.splice(index, 1);
    console.log("Deleted todo item:", deleted[0]);
    return deleted[0];
  } else {
    console.log("Not a valid todo item index");
    return null;
  }
}

// delete checklist item
export function deleteChecklistItem(todo, index) {
  if (index > -1 && index < todo.Checklist.length) {
    const deleted = todo.Checklist.splice(index, 1);
    console.log("Deleted checklist item:", deleted[0]);
    return deleted[0];
  } else {
    console.log("Not a valid checklist item index");
    return null;
  }
}
