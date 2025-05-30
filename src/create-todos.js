// create-todos.js

// imports
import { createTodoCard } from "./page-load.js";

// factory function to create todo items
export function createTodo(
  title,
  description,
  dueDate,
  priority,
  notes,
  checklist = [],
  complete = false
) {
  const todoCard = document.createElement("div");
  // random uuid for each todo item
  const todoId = self.crypto.randomUUID();

  let normalizedChecklist = [];

  if (typeof checklist === "string") {
    normalizedChecklist = checklist.split(",").map((item) => ({
      title: item.trim(),
      complete: false,
      id: self.crypto.randomUUID(),
    }));
  } else if (Array.isArray(checklist)) {
    normalizedChecklist = checklist.map((item) => {
      if (typeof item === "string") {
        return {
          title: item,
          complete: false,
          id: self.crypto.randomUUID(), // random uuid for each checklist item
        };
      } else {
        return {
          ...item,
          id: item.id || self.crypto.randomUUID(), // assign uuid if missing
        };
      }
    });
  }

  return {
    TodoId: todoId,
    Title: title,
    Description: description,
    DueDate: dueDate,
    Priority: priority,
    Notes: notes,
    Checklist: normalizedChecklist,
    Complete: complete,
    todoCard,
  };
}
