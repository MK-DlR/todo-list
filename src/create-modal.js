// create-modal.js

// imports
import { createTodoCard, createList } from "./page-load";
import { projectsList } from "./create-projects";

export function showNewModal() {
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
  message.textContent = "Create New Todo Item";

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
  titleText.innerHTML = "Title:";

  const editTitle = document.createElement("INPUT");
  editTitle.setAttribute("id", "editTitle");
  editTitle.setAttribute("type", "text");
  editTitle.setAttribute("required", "true");

  const descText = document.createElement("div");
  descText.style.fontWeight = "700";
  descText.innerHTML = "Description:";

  const editDesc = document.createElement("INPUT");
  editDesc.setAttribute("id", "editDesc");
  editDesc.setAttribute("type", "text");

  const dateText = document.createElement("div");
  dateText.style.fontWeight = "700";
  dateText.innerHTML = "Due Date:";

  const editDate = document.createElement("INPUT");
  editDate.setAttribute("id", "editDate");
  editDate.setAttribute("type", "date");

  const priorityText = document.createElement("div");
  priorityText.style.fontWeight = "700";
  priorityText.innerHTML = "Priority:";

  const editPriority = document.createElement("INPUT");
  editPriority.setAttribute("id", "editPriority");
  editPriority.setAttribute("type", "number");
  editPriority.setAttribute("min", "0");
  editPriority.setAttribute("max", "3");
  editPriority.setAttribute("step", "1");
  editPriority.setAttribute("value", "1"); // default priority

  const notesText = document.createElement("div");
  notesText.style.fontWeight = "700";
  notesText.innerHTML = "Notes:";

  const editNotes = document.createElement("INPUT");
  editNotes.setAttribute("id", "editNotes");
  editNotes.setAttribute("type", "text");

  // project selection dropdown
  const projectText = document.createElement("div");
  projectText.style.fontWeight = "700";
  projectText.innerHTML = "Add to Project:";

  const projectSelect = document.createElement("select");
  projectSelect.setAttribute("id", "projectSelect");
  projectSelect.setAttribute("required", "true");

  // add default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a project...";
  projectSelect.appendChild(defaultOption);

  // populate with existing projects
  projectsList.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.title;
    projectSelect.appendChild(option);
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttonContainer");

  const submitInput = document.createElement("INPUT");
  submitInput.classList.add("submitInput");
  submitInput.type = "submit";
  submitInput.value = "Create Todo";

  // handle form submission
  submitInput.addEventListener("click", (event) => {
    event.preventDefault();

    const title = editTitle.value.trim();
    const description = editDesc.value.trim();
    const date = editDate.value;
    const priority = parseInt(editPriority.value) || 0;
    const notes = editNotes.value.trim();
    const selectedProjectId = projectSelect.value;

    // validation
    if (!title) {
      alert("Title is required!");
      return;
    }

    if (!selectedProjectId) {
      alert("Please select a project!");
      return;
    }

    // find the selected project
    const selectedProject = projectsList.find(
      (project) => project.id === selectedProjectId
    );
    if (!selectedProject) {
      alert("Selected project not found!");
      return;
    }

    // create new todo object
    const newTodo = {
      TodoId: self.crypto.randomUUID(),
      Title: title,
      Description: description,
      DueDate: date,
      Priority: priority,
      Notes: notes,
      Checklist: [],
    };

    // add to the selected project
    selectedProject.todos.push(newTodo);

    // refresh the display
    createList();

    // close modal
    document.body.removeChild(overlay);
  });

  modal.appendChild(message);
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
  editForm.appendChild(projectText);
  editForm.appendChild(projectSelect);

  // buttons
  modal.appendChild(buttonContainer);
  buttonContainer.appendChild(submitInput);
  buttonContainer.appendChild(closeButton);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
