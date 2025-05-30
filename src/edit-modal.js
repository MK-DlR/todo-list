// edit-modal.js

// imports
import { createTodoCard, saveProjectsToLocal } from "./page-load";

export function showModal(todo, titleHeader, descElem, dueElem, notesElem) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "1000";

  const modal = document.createElement("div");
  modal.style.backgroundColor = "white";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  modal.style.minWidth = "300px";
  modal.style.textAlign = "center";

  const message = document.createElement("p");
  message.style.fontWeight = "700";
  message.style.fontSize = "x-large";

  const closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "10px";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  const editForm = document.createElement("FORM");
  editForm.setAttribute("id", "myForm");
  editForm.classList.add("editForm");

  const titleText = document.createElement("div");
  titleText.style.fontWeight = "700";
  titleText.innerHTML = "Edit Title:";

  const editTitle = document.createElement("INPUT");
  editTitle.setAttribute("id", "editTitle");
  editTitle.setAttribute("type", "text");

  const descText = document.createElement("div");
  descText.style.fontWeight = "700";
  descText.innerHTML = "Edit Description:";

  const editDesc = document.createElement("INPUT");
  editDesc.setAttribute("id", "editDesc");
  editDesc.setAttribute("type", "text");

  const dateText = document.createElement("div");
  dateText.style.fontWeight = "700";
  dateText.innerHTML = "Edit Due Date:";

  const editDate = document.createElement("INPUT");
  editDate.setAttribute("id", "editDate");
  editDate.setAttribute("type", "date");

  const priorityText = document.createElement("div");
  priorityText.style.fontWeight = "700";
  priorityText.innerHTML = "Edit Priority:";

  const editPriority = document.createElement("INPUT");
  editPriority.setAttribute("id", "editPriority");
  editPriority.setAttribute("type", "number");
  editPriority.setAttribute("min", "0");
  editPriority.setAttribute("max", "3");
  editPriority.setAttribute("step", "1");

  const notesText = document.createElement("div");
  notesText.style.fontWeight = "700";
  notesText.innerHTML = "Edit Notes:";

  const editNotes = document.createElement("INPUT");
  editNotes.setAttribute("id", "editNotes");
  editNotes.setAttribute("type", "text");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttonContainer");

  const submitInput = document.createElement("INPUT");
  submitInput.classList.add("submitInput");
  submitInput.type = "submit";
  submitInput.value = "Submit";

  // prefill existing values
  editTitle.value = todo.Title;
  editDesc.value = todo.Description;
  editDate.value = todo.DueDate;
  editPriority.value = todo.Priority;
  editNotes.value = todo.Notes;

  // handle form submission
  submitInput.addEventListener("click", (event) => {
    event.preventDefault();

    const title = editTitle.value;
    const description = editDesc.value;
    const date = editDate.value;
    const priority = editPriority.value;
    const notes = editNotes.value;

    // update data object
    todo.Title = title;
    todo.Description = description;
    todo.DueDate = date;
    todo.Priority = priority;
    todo.Notes = notes;

    // save to localStorage
    saveProjectsToLocal();

    // update DOM
    titleHeader.textContent = title;
    descElem.textContent = description;
    dueElem.textContent = date;
    notesElem.textContent = notes;

    // update the todo card's border color based on priority
    const todoCard = titleHeader.closest(".todoCard");
    if (todoCard) {
      if (priority == 1) {
        todoCard.style.borderLeft = "thick solid #F8D7DA";
      } else if (priority == 2) {
        todoCard.style.borderLeft = "thick solid #f8ebd7";
      } else if (priority == 3) {
        todoCard.style.borderLeft = "thick solid #FFF3CD";
      } else {
        todoCard.style.borderLeft = "thick solid #D1E7DD";
      }
    }

    // close dialogue
    document.body.removeChild(overlay);
  });

  // modal.appendChild(message);
  modal.appendChild(document.createElement("br"));
  modal.appendChild(editForm);
  // form inputs
  editForm.appendChild(titleText);
  editForm.appendChild(editTitle);
  editForm.appendChild(descText);
  editForm.appendChild(editDesc);
  editForm.appendChild(dateText);
  editForm.appendChild(editDate);
  editForm.appendChild(priorityText);
  editForm.appendChild(editPriority);
  editForm.appendChild(notesText);
  editForm.appendChild(editNotes);
  // more form inputs
  modal.appendChild(buttonContainer);
  buttonContainer.appendChild(submitInput);
  buttonContainer.appendChild(closeButton);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
