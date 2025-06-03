// default-project.js
import { projectsList } from "./create-projects.js";
import { createTodo } from "./create-todos.js";

// create default project object with an empty todos array
export const defaultProject = {
  title: "Default Project List",
  todos: [],
  id: self.crypto.randomUUID(),
};

// create defaults when needed
export function createDefaultProjects() {
  const defaultProject1 = {
    title: "Default Project List",
    todos: [],
    id: self.crypto.randomUUID(),
  };

  const defaultProject2 = {
    title: "Default Project List2",
    todos: [],
    id: self.crypto.randomUUID(),
  };

  projectsList.push(defaultProject1, defaultProject2);
  console.log("Created default projects");
  return [defaultProject1, defaultProject2];
}

// add todos to default project todos list
export function createDefault(newTodo) {
  defaultProject.todos.push(newTodo);
  return defaultProject;
}
