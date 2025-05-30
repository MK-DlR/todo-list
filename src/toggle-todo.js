// toggle-todo.js

export function toggleTodoComplete(todo, todoCard) {
  if (todo.Complete === true) {
    todo.Complete = false;

    // restore saved priority if available
    const priority = todo.originalPriority ?? 1;
    todo.Priority = priority;

    let color = "red";
    if (priority == 1) {
      color = "#F8D7DA";
    } else if (priority == 2) {
      color = "#f8ebd7";
    } else if (priority == 3) {
      color = "#FFF3CD";
    } else {
      color = "#D1E7DD";
    }

    todoCard.style.borderLeft = `thick solid ${color}`;
    console.log("complete --> incomplete");
  } else if (todo.Complete === false) {
    todo.Complete = true;

    // save current priority before marking complete
    todo.originalPriority = todo.Priority;
    todo.Priority = 0;

    todoCard.style.borderLeft = "thick solid #D1E7DD"; // complete
    console.log("incomplete --> complete");
  } else {
    console.log("Error");
  }
}
