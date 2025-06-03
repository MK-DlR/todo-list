// page-load.js

// imports
import { projectsList, createProject } from "./create-projects";
import { moveHigher, moveLower, moveItemByIndex } from "./reorder-items";
import { toggleTodoComplete } from "./toggle-todo";
import { deleteTodo } from "./delete-items";
import { showModal } from "./edit-modal.js";
import { showNewModal } from "./create-modal.js";
import { createDefaultProjects } from "./default-project.js";

// svg imports
import addItem from "./images/addCircle.svg";
import arrowDown from "./images/arrowdown.svg";
import arrowUp from "./images/arrowup.svg";
import arrowLeft from "./images/arrowleft.svg";
import arrowRight from "./images/arrowright.svg";
import deleteIcon from "./images/delete.svg";
import editIcon from "./images/edit.svg";
import checkIcon from "./images/check.svg";
import addIcon from "./images/add.svg";
import newUser from "./images/newuser.svg";

const header = document.querySelector("header");
const sidebar = document.querySelector("#sidebar");
const content = document.querySelector("#content");

// save to localStorage function
export function saveProjectsToLocal() {
  localStorage.setItem("allProjects", JSON.stringify(projectsList));
}

// retrieve from localStorage function
// retrieve from localStorage function
export function retrieveProjectsFromLocal() {
  const userData = JSON.parse(localStorage.getItem("allProjects"));

  if (userData && userData.length > 0) {
    console.log("User data found");
    projectsList.length = 0; // clear existing
    projectsList.push(...userData); // add saved projects
    console.log(projectsList);
    createList();
    updateSidebarProjectsList(); // update sidebar
  } else {
    console.log("No stored data - creating defaults");
    // only create defaults if projectsList is empty
    if (projectsList.length === 0) {
      createDefaultProjects(); // use function from default-project.js
    }
    createList();
    updateSidebarProjectsList(); // update sidebar
  }
}

// date formatting function
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  let day = date.getDate();

  const suffixes = {
    1: "st",
    2: "nd",
    3: "rd",
    21: "st",
    22: "nd",
    23: "rd",
    31: "st",
  };
  const suffix = suffixes[day] || "th";

  return `Today is ${month} ${day}${suffix}, ${year}.`;
}

// element creation function
function createElement(
  tag,
  className = null,
  textContent = null,
  attributes = {}
) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (textContent) element.textContent = textContent;

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}

// svg icon helper function
function createIcon(src, className, title) {
  const img = createElement("img", className);
  img.src = src;
  img.style.width = "auto";
  img.style.height = "20px";
  img.style.cursor = "pointer";
  img.title = title;
  return img;
}

// button creation function
function createButton(className, text, icon, clickHandler) {
  const container = createElement("div", className);
  const button = createElement(
    "button",
    className.replace("Container", ""),
    text,
    {
      style:
        "width: 230px; padding: 5px; display: flex; flex-direction: row-reverse; justify-content: flex-end; background-color: #f2f4f8; cursor: pointer; font-weight: 700; font-size: medium;",
    }
  );

  // add hover to button element
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#d2f7d2";
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#f2f4f8";
  });

  if (icon) button.appendChild(icon);
  if (clickHandler) container.addEventListener("click", clickHandler);
  container.appendChild(button);
  return container;
}

// color management
function getCardColors(selector) {
  const colors = {};
  document.querySelectorAll(selector).forEach((card) => {
    const id = card.dataset.id;
    const backgroundColor = card.style.backgroundColor;
    if (backgroundColor) colors[id] = backgroundColor;
  });
  // save user chosen color to localStorage
  localStorage.setItem("cardColors", JSON.stringify(colors));
  return colors;
}

export function restoreCardColors(selector) {
  // get user chosen color from localStorage
  const colors = JSON.parse(localStorage.getItem("cardColors")) || {};
  Object.keys(colors).forEach((id) => {
    const card = document.querySelector(`${selector}[data-id="${id}"]`);
    if (card) card.style.backgroundColor = colors[id];
  });
}

// priority border styles
const PRIORITY_BORDERS = {
  1: "thick solid #F8D7DA",
  2: "thick solid #f8ebd7",
  3: "thick solid #FFF3CD",
  default: "thick solid #D1E7DD",
};

// delete confirmation dialog
function confirmDelete(message, onConfirm) {
  if (window.confirm(message)) onConfirm();
}

// edit prompt
function promptEdit(message, currentValue, onSuccess) {
  const newValue = prompt(message, currentValue);
  if (newValue) onSuccess(newValue);
  else if (newValue === "") return "blank";
  return null;
}

// checklist item addition function
function addChecklistItem(todo, project, insertIndex = -1) {
  const newTitle = prompt("Add new checklist item:");
  if (!newTitle) {
    alert("Action cancelled");
    return;
  }

  const newItem = {
    id: self.crypto.randomUUID(),
    title: newTitle,
    complete: false,
  };

  if (insertIndex === -1) {
    todo.Checklist.push(newItem);
  } else {
    todo.Checklist.splice(insertIndex + 1, 0, newItem);
  }

  const expandedTodoIds = getExpandedTodoIds();
  const todoColors = getCardColors(".todoCard");
  refreshTodoList(project);
  restoreExpandedTodoIds(expandedTodoIds);
  restoreCardColors(todoColors, ".todoCard");
}

// update sidebar with current projects
export function updateSidebarProjectsList() {
  const currentProjectsList = document.querySelector(".currentProjectsList");
  if (!currentProjectsList) return;

  currentProjectsList.innerHTML = "";

  if (projectsList.length === 0) {
    currentProjectsList.textContent = "No projects yet";
    return;
  }

  projectsList.forEach((project) => {
    const projectItem = createElement(
      "div",
      "sidebar-project-item",
      project.title
    );
    projectItem.dataset.id = project.id;

    projectItem.addEventListener("click", () => {
      const projectCard = document.querySelector(
        `.projectCard[data-id="${project.id}"]`
      );
      if (projectCard) {
        projectCard.scrollIntoView({ behavior: "smooth", block: "start" });
        projectCard.style.border = "2px solid #007bff";
        setTimeout(() => (projectCard.style.border = ""), 2000);
      }
    });

    currentProjectsList.appendChild(projectItem);
  });
}

// create basic page layout
export function createHomepage() {
  const date = new Date();
  const formattedDate = formatDate(date);

  // create header content
  const headerContent = createElement("h2", "headerContent");
  const nameFromLocalStorage = localStorage.getItem("userName");

  // retrieve stored username if available
  headerContent.textContent = nameFromLocalStorage
    ? `Welcome, ${nameFromLocalStorage}. ${formattedDate}`
    : "No name data in local storage";

  // create sidebar content
  const sidebarContent = createElement("div", "sidebarContent");

  // create sidebar buttons
  const addUserName = createButton(
    "addUserName",
    "Add New User",
    createIcon(newUser, "addUserImg", "add new user"),
    () => {
      const newUserName = prompt("Enter your name:");
      if (newUserName) {
        headerContent.textContent = `Welcome, ${newUserName}. ${formattedDate}`;
        // store username if given
        localStorage.setItem("userName", newUserName);
      }
    }
  );

  const newProjContainer = createButton(
    "newProjContainer",
    "Create New Project",
    createIcon(addItem, "addItemClone", "add new project"),
    () => {
      const newProject = createProject();
      if (newProject) {
        updateSidebarProjectsList();
        createList();
      }
    }
  );

  const newTodoContainer = createButton(
    "newTodoContainer",
    "Create New Todo Item",
    createIcon(addItem, "addItemClone2", "add new todo"),
    () => {
      showNewModal();
      createList();
    }
  );

  // current project list section
  const projectListsSection = createElement("div", "projectListsSection");
  const projectListsHeader = createElement(
    "h3",
    "projectListsHeader",
    "Current Projects"
  );
  const currentProjectsList = createElement("div", "currentProjectsList");

  // append all elements
  header.appendChild(headerContent);
  sidebar.appendChild(sidebarContent);

  [
    addUserName,
    newProjContainer,
    newTodoContainer,
    document.createElement("br"),
    projectListsSection,
  ].forEach((el) => sidebarContent.appendChild(el));

  [projectListsHeader, currentProjectsList].forEach((el) =>
    projectListsSection.appendChild(el)
  );

  updateSidebarProjectsList();
}

// project movement handler
function createProjectMoveHandler(direction) {
  return () => {
    const projectColors = getCardColors(".projectCard");
    createList();
    restoreCardColors(projectColors, ".projectCard");
    updateSidebarProjectsList();
  };
}

// todo movement between projects
function createTodoProjectMover(todo, project, direction) {
  return () => {
    const currentProjectIndex = projectsList.findIndex(
      (p) => p.id === project.id
    );
    const targetIndex =
      direction === "left" ? currentProjectIndex - 1 : currentProjectIndex + 1;

    if (targetIndex < 0) {
      alert("This is the first project. Cannot move to previous.");
      return;
    }

    if (targetIndex >= projectsList.length) {
      alert("This is the last project. Cannot move to next.");
      return;
    }

    const targetProject = projectsList[targetIndex];
    const todoIndex = project.todos.findIndex((t) => t.TodoId === todo.TodoId);

    if (todoIndex !== -1) {
      const moved = moveItemByIndex(
        project.todos,
        targetProject.todos,
        todoIndex
      );
      if (moved) {
        const todoColors = getCardColors(".todoCard");
        refreshTodoList(project);
        refreshTodoList(targetProject);
        restoreCardColors(todoColors, ".todoCard");
      }
    }
  };
}

// create project lists
export function createList() {
  content.innerHTML = "";

  projectsList.forEach((project) => {
    const projectCard = createElement("div", "projectCard");
    projectCard.dataset.id = project.id;

    // create header row and icon bars
    const projectHeaderRow = createElement("div", "project-header-row");
    const projectIconBarLeft = createElement("div", "project-icon-bar-left");
    const projectIconBarRight = createElement("div", "project-icon-bar-right");
    const projectHeader = createElement("h2", "projectHeader", project.title);

    // movement arrows
    const arrowLeftImg = createMoveArrow(
      arrowLeft,
      "arrowLeftImg",
      "move project left",
      "left",
      ".projectCard",
      projectsList,
      "id",
      moveHigher,
      moveLower,
      createProjectMoveHandler()
    );
    const arrowRightImg = createMoveArrow(
      arrowRight,
      "arrowRightImg",
      "move project right",
      "right",
      ".projectCard",
      projectsList,
      "id",
      moveHigher,
      moveLower,
      createProjectMoveHandler()
    );

    // edit and delete icons and event listeners
    const editIconImg = createIcon(editIcon, "editIconImg", "edit");
    editIconImg.addEventListener("click", () => {
      promptEdit("Edit project title:", project.title, (newTitle) => {
        project.title = newTitle;
        projectHeader.textContent = newTitle;
        updateSidebarProjectsList();
        // save to localStorage
        saveProjectsToLocal();
      });
    });

    const deleteIconImg = createIcon(
      deleteIcon,
      "deleteIconImg",
      "delete project list"
    );
    deleteIconImg.addEventListener("click", () => {
      confirmDelete("Are you sure you want to delete this list?", () => {
        const projectIndex = projectsList.findIndex((p) => p.id === project.id);
        if (projectIndex !== -1) projectsList.splice(projectIndex, 1);
        projectCard.remove();
        updateSidebarProjectsList();
        // save to localStorage
        saveProjectsToLocal();
      });
    });

    // color picker
    const colorPicker = createElement("INPUT", "colorPicker", null, {
      type: "color",
    });
    colorPicker.addEventListener("input", function () {
      projectCard.style.backgroundColor = this.value;
      getCardColors(".projectCard");
    });

    // append elements
    content.appendChild(projectCard);
    projectCard.appendChild(projectHeaderRow);
    [projectIconBarLeft, projectHeader, projectIconBarRight].forEach((el) =>
      projectHeaderRow.appendChild(el)
    );
    [arrowLeftImg, arrowRightImg].forEach((el) =>
      projectIconBarLeft.appendChild(el)
    );
    [deleteIconImg, editIconImg, colorPicker].forEach((el) =>
      projectIconBarRight.appendChild(el)
    );

    // add todo cards
    project.todos.forEach((todo) => {
      projectCard.appendChild(createTodoCard(todo, project));
      // save to localStorage
      saveProjectsToLocal();
    });
  });
}

// checklist refresh handler
function createChecklistRefreshHandler(project) {
  return () => {
    const expandedTodoIds = getExpandedTodoIds();
    const todoColors = getCardColors(".todoCard");
    refreshTodoList(project);
    restoreExpandedTodoIds(expandedTodoIds);
    restoreCardColors(todoColors, ".todoCard");
  };
}

// create todo card
export function createTodoCard(todo, project) {
  const todoCard = createElement("div", "todoCard");
  todoCard.dataset.id = todo.TodoId;

  // set priority border
  todoCard.style.borderLeft =
    PRIORITY_BORDERS[todo.Priority] || PRIORITY_BORDERS.default;

  // create icon bars
  const upperIconBar = createElement("div", "upper-icon-bar");
  const upperLeftIconBar = createElement("div", "upper-left-icon-bar");
  const upperRightIconBar = createElement("div", "upper-right-icon-bar");
  const titleHeader = createElement("h3", "titleHeader", todo.Title);

  // movement arrows for project switching
  const arrowLeftImg = createIcon(
    arrowLeft,
    "arrowLeftImg",
    "move to previous project list"
  );
  const arrowRightImg = createIcon(
    arrowRight,
    "arrowRightImg",
    "move to next project list"
  );

  arrowLeftImg.addEventListener(
    "click",
    createTodoProjectMover(todo, project, "left")
  );
  arrowRightImg.addEventListener(
    "click",
    createTodoProjectMover(todo, project, "right")
  );

  // up/down movement arrows
  const arrowUpImg = createMoveArrow(
    arrowUp,
    "arrowUpImg",
    "move up",
    "up",
    ".todoCard",
    project.todos,
    "TodoId",
    moveHigher,
    moveLower,
    () => refreshTodoList(project)
  );
  const arrowDownImg = createMoveArrow(
    arrowDown,
    "arrowDownImg",
    "move down",
    "down",
    ".todoCard",
    project.todos,
    "TodoId",
    moveHigher,
    moveLower,
    () => refreshTodoList(project)
  );

  // append upper elements
  todoCard.appendChild(upperIconBar);
  [upperLeftIconBar, titleHeader, upperRightIconBar].forEach((el) =>
    upperIconBar.appendChild(el)
  );
  [arrowLeftImg, arrowRightImg].forEach((el) =>
    upperLeftIconBar.appendChild(el)
  );
  [arrowUpImg, arrowDownImg].forEach((el) => upperRightIconBar.appendChild(el));

  // description and due date sections
  const descHeader = createElement("h4", "descHeaders", "Description");
  const descContent = createElement("p", "todoDesc", todo.Description);
  todoCard.appendChild(descHeader);
  todoCard.appendChild(descContent);

  const dueHeader = createElement("h4", "descHeaders", "Due");
  const dueContent = createElement("p", null, todo.DueDate);
  todoCard.appendChild(dueHeader);
  todoCard.appendChild(dueContent);

  // expand section
  const expandSection = createElement("div", "expandSection");
  const expandButton = createElement("p", "expandButton", "Expand...");
  const expandedContent = createElement("div", "expandedContent");

  expandSection.appendChild(expandButton);
  todoCard.appendChild(expandSection);
  todoCard.appendChild(expandedContent);

  // expand functionality
  expandSection.addEventListener("click", function () {
    this.classList.toggle("active");
    const isExpanded = expandedContent.style.display === "block";
    expandedContent.style.display = isExpanded ? "none" : "block";
    expandButton.textContent = isExpanded ? "Expand..." : "Expanded...";
  });

  // notes section
  const notesHeader = createElement("h4", "descHeaders", "Notes");
  const notesP = createElement("p", null, todo.Notes);
  expandedContent.appendChild(notesHeader);
  expandedContent.appendChild(notesP);

  // edit button
  const editIconImg = createIcon(editIcon, "editIconImg", "edit");
  editIconImg.addEventListener("click", () => {
    showModal(todo, titleHeader, descContent, dueContent, notesP);
  });

  expandedContent.appendChild(document.createElement("br"));

  // checklist section
  const checklistHeader = createElement("h4", "checklistHeader", "Checklist");
  const addIconClone = createIcon(addIcon, "addIconImg2", "add");
  addIconClone.addEventListener("click", () => addChecklistItem(todo, project));

  checklistHeader.appendChild(addIconClone);
  expandedContent.appendChild(checklistHeader);

  // create checklist items
  todo.Checklist.forEach((item) => {
    const checkContainer = createElement("div", "checkContainer");
    checkContainer.dataset.id = item.id;

    const checkbox = createElement("input", "checkItem", null, {
      type: "checkbox",
      "data-check-id": item.id,
    });
    checkbox.checked = item.complete;

    const span = createElement("span", "checkLabel", item.title);
    if (item.complete) span.classList.add("strikethrough");

    checkbox.addEventListener("change", () => {
      item.complete = checkbox.checked;
      span.classList.toggle("strikethrough", checkbox.checked);
      // save to localStorage
      saveProjectsToLocal();
    });

    // checklist item controls
    const editIconImg = createIcon(editIcon, "editIconImg", "edit");
    editIconImg.classList.add("checkEdit");
    editIconImg.addEventListener("click", () => {
      const result = promptEdit(
        "Edit checklist item:",
        item.title,
        (newTitle) => {
          item.title = newTitle;
          span.textContent = newTitle;
          // save to localStorage
          saveProjectsToLocal();
        }
      );

      if (result === "blank") {
        confirmDelete("If left blank, checklist item will be removed.", () => {
          const index = todo.Checklist.indexOf(item);
          if (index !== -1) todo.Checklist.splice(index, 1);
          checkContainer.remove();
        });
      }
    });

    const arrowUpImg = createMoveArrow(
      arrowUp,
      "arrowUpImgChecklist",
      "move up",
      "up",
      ".checkContainer",
      todo.Checklist,
      "id",
      moveHigher,
      moveLower,
      createChecklistRefreshHandler(project)
    );
    const arrowDownImg = createMoveArrow(
      arrowDown,
      "arrowDownImgChecklist",
      "move down",
      "down",
      ".checkContainer",
      todo.Checklist,
      "id",
      moveHigher,
      moveLower,
      createChecklistRefreshHandler(project)
    );

    const addIconClone = createIcon(addIcon, "addIconImg", "add");
    addIconClone.addEventListener("click", () => {
      const currentIndex = todo.Checklist.findIndex(
        (checkItem) => checkItem.id === item.id
      );
      if (currentIndex !== -1) {
        addChecklistItem(todo, project, currentIndex);
      }
    });

    [
      checkbox,
      span,
      editIconImg,
      arrowUpImg,
      arrowDownImg,
      addIconClone,
    ].forEach((el) => checkContainer.appendChild(el));

    expandedContent.appendChild(checkContainer);
    expandedContent.appendChild(createElement("label"));
  });

  // lower icon bar
  const lowerIconBar = createElement("div", "lower-icon-bar");
  const lowerLeftIconBar = createElement("div", "lower-left-icon-bar");
  const lowerRightIconBar = createElement("div", "lower-right-icon-bar");

  // delete icon
  const deleteIconImg = createIcon(
    deleteIcon,
    "deleteIconImg",
    "delete todo list card"
  );
  deleteIconImg.addEventListener("click", () => {
    confirmDelete("Are you sure you want to delete this item?", () => {
      const todoIndex = project.todos.findIndex(
        (t) => t.TodoId == todoCard.dataset.id
      );
      if (todoIndex !== -1) {
        deleteTodo(project, todoIndex);
        todoCard.remove();
        // save to localStorage
        saveProjectsToLocal();
      }
    });
  });

  // color picker
  const colorPicker = createElement("INPUT", "colorPicker", null, {
    type: "color",
  });
  colorPicker.addEventListener("input", function () {
    todoCard.style.backgroundColor = this.value;
    const projectColors = getCardColors(".projectCard");
    const todoColors = getCardColors(".todoCard");
    const allColors = { ...projectColors, ...todoColors };
    localStorage.setItem("cardColors", JSON.stringify(allColors));
  });

  // edit and check icons
  const editIconImgClone = createIcon(editIcon, "editIconImg", "edit");
  editIconImgClone.addEventListener("click", () => {
    showModal(todo, titleHeader, descContent, dueContent, notesP);
  });

  const checkIconImg = createIcon(checkIcon, "checkIconImg", "mark complete");
  checkIconImg.addEventListener("click", function () {
    const todoIndex = project.todos.findIndex(
      (t) => t.TodoId == todoCard.dataset.id
    );
    if (todoIndex !== -1) {
      toggleTodoComplete(todo, todoCard);
      this.classList.toggle("checked");
      // save to localStorage
      saveProjectsToLocal();
    }
  });

  // append lower elements
  todoCard.appendChild(lowerIconBar);
  [lowerLeftIconBar, lowerRightIconBar].forEach((el) =>
    lowerIconBar.appendChild(el)
  );
  lowerLeftIconBar.appendChild(deleteIconImg);
  [editIconImgClone, checkIconImg, colorPicker].forEach((el) =>
    lowerRightIconBar.appendChild(el)
  );

  return todoCard;
}

// refresh to do list
function refreshTodoList(project) {
  const projectCard = content.querySelector(
    `.projectCard[data-id='${project.id}']`
  );
  if (!projectCard) return;

  const todoColors = getCardColors(".todoCard");
  projectCard.querySelectorAll(".todoCard").forEach((card) => card.remove());

  project.todos.forEach((todo) => {
    projectCard.appendChild(createTodoCard(todo, project));
  });

  restoreCardColors(todoColors, ".todoCard");
}

// arrow movement function
function createMoveArrow(
  iconSrc,
  className,
  title,
  direction,
  containerClass,
  array,
  idField,
  moveFnUp,
  moveFnDown,
  refreshFn
) {
  const img = createIcon(iconSrc, className, title);
  img.addEventListener("click", function () {
    const card = this.closest(containerClass);
    if (!card) return;

    const itemId = card.dataset.id;
    const index = array.findIndex((item) => item[idField] === itemId);

    if ((direction === "up" || direction === "left") && index > 0) {
      moveFnUp(array, index);
      refreshFn && refreshFn();
    } else if (
      (direction === "down" || direction === "right") &&
      index >= 0 &&
      index < array.length - 1
    ) {
      moveFnDown(array, index);
      refreshFn && refreshFn();
    }
  });
  // save to localStorage
  saveProjectsToLocal();
  return img;
}

function getExpandedTodoIds() {
  const expandedIds = [];
  document.querySelectorAll(".todoCard").forEach((todoCard) => {
    const expandSection = todoCard.querySelector(".expandSection");
    if (expandSection && expandSection.classList.contains("active")) {
      expandedIds.push(todoCard.dataset.id);
    }
  });
  return expandedIds;
}

function restoreExpandedTodoIds(expandedIds) {
  expandedIds.forEach((id) => {
    const todoCard = document.querySelector(`.todoCard[data-id="${id}"]`);
    if (todoCard) {
      const expandSection = todoCard.querySelector(".expandSection");
      const expandedContent = todoCard.querySelector(".expandedContent");
      const expandButton = expandSection?.querySelector(".expandButton");

      if (expandSection && expandedContent && expandButton) {
        expandSection.classList.add("active");
        expandedContent.style.display = "block";
        expandButton.textContent = "Expanded...";
      }
    }
  });
}
