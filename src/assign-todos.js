// assign-todos.js

// imports
import { createTodo } from "./create-todos.js";
import { projectsList } from "./create-projects.js";

export function assignTodo() {
  let projectSelection = prompt("Please pick a project list");

  if (projectSelection && projectSelection.trim() !== "") {
    for (let i = 0; i < projectsList.length; i++) {
      if (
        projectsList[i].title.toLowerCase() === projectSelection.toLowerCase()
      ) {
        // prompt to collect todo details - change to form for UI
        // separate into own module separate from assigning todos to lists?
        let title = prompt("Enter todo item title");
        let description = prompt("Enter todo item description");
        let dueDate = prompt("Enter todo item due date (YYYY-MM-DD)");
        let priority = prompt(
          "Enter todo item priority (3 - low, 2 - medium, 1 - high)"
        );
        let notes = prompt("Enter any todo item notes");
        let checklist = prompt(
          "Enter todo checklist items separated by commas"
        );

        // create todo object using factory
        const newTodo = createTodo(
          title,
          description,
          dueDate,
          priority,
          notes,
          checklist,
          false
        );

        // add todo to the selected project's todos array
        projectsList[i].todos.push(newTodo);
        console.log(
          `Added todo to project "${projectsList[i].title}":`,
          newTodo
        );
        return projectsList[i]; // return updated project
      }
    }
    alert("Project not found");
  } else {
    alert("Please select a valid project title");
  }
}
