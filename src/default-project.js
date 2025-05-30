// default-project.js

import { projectsList } from "./create-projects.js";
import { createTodo } from "./create-todos.js";

// create default project object with an empty todos array
export const defaultProject = {
  title: "Default Project List",
  todos: [],
  id: self.crypto.randomUUID(),
};

(function pushDefault() {
  projectsList.push(defaultProject);
  console.log("Created project:", defaultProject);
  return defaultProject;
})();

// test project 2
export const defaultProject2 = {
  title: "Default Project List2",
  todos: [],
  id: self.crypto.randomUUID(),
};

(function pushDefault() {
  projectsList.push(defaultProject2);
  console.log("Created project:", defaultProject2);
  return defaultProject2;
})();

// test adding todo list item
export const todoTestItem = createTodo(
  "Todo List Project",
  "The Odin Project todo list project",
  "2025-06-06",
  "1",
  "This project is hard",
  [
    { title: "Create backend functionality", complete: true },
    { title: "Work on DOM", complete: true },
    { title: "Create UI", complete: true },
    { title: "Add localStorage", complete: false },
  ]
);

// test adding second todo list item
export const todoTestItem2 = createTodo(
  "Eat Kraken",
  "Bothering the beebus",
  "2025-05-21",
  "2",
  "He's a lil weirdo",
  [
    { title: "Pick up the beebus", complete: false },
    { title: "Smooch his stupid apple head", complete: false },
    { title: "Consume entirely", complete: false },
  ]
);

// add todos to default project todos list
export function createDefault(newTodo) {
  defaultProject.todos.push(newTodo);
  return defaultProject;
}

// add test todos to default project immediately
createDefault(todoTestItem);
createDefault(todoTestItem2);
