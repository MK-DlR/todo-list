// toggle-checklist.js

// find checklist item by index to toggle complete/incomplete
export function toggleChecklistItemByIndex(todo, index) {
  if (!todo || !todo.Checklist || index < 0 || index >= todo.Checklist.length) {
    console.log("Invalid todo or index.");
    return;
  }

  const item = todo.Checklist[index];
  toggleChecklist(item);
  console.log("Updated todo checklist:", todo.Checklist);
}

// toggle checklist item complete/incomplete
export function toggleChecklist(checklistItem) {
  if (checklistItem.complete === true) {
    checklistItem.complete = false;
    console.log("complete --> incomplete");
    console.log(checklistItem);
  } else if (checklistItem.complete === false) {
    checklistItem.complete = true;
    console.log("incomplete --> complete");
    console.log(checklistItem);
  } else {
    console.log("Error");
  }
}
