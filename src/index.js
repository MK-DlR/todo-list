// index.js

// imports
import "./styles.css";
import "./page-load.js";

import { assignTodo } from "./assign-todos.js";
import { showNewModal } from "./create-modal.js";
import { createProject, projectsList } from "./create-projects.js";
import { createTodo } from "./create-todos.js";
import { defaultProject, createDefault } from "./default-project.js";
import {
  deleteProject,
  deleteTodo,
  deleteChecklistItem,
} from "./delete-items.js";
import { showModal } from "./edit-modal.js";
import { editProjectTitle } from "./edit-projects.js";
import {
  createHomepage,
  createList,
  retrieveProjectsFromLocal,
  restoreCardColors,
} from "./page-load.js";

createHomepage();
retrieveProjectsFromLocal();
restoreCardColors(".projectCard");
restoreCardColors(".todoCard");
