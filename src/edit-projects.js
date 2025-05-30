// edit-projects.js

// edit project title
export function editProjectTitle(project) {
  // prompt to collect new project title details - change for UI
  let newProjectTitle = prompt("Please enter a new name for your project list");

  if (newProjectTitle && newProjectTitle.trim() !== "") {
    project.title = newProjectTitle;
    console.log(project);
  } else {
    alert("Invalid title, no changes made.");
    console.log("Invalid title, no changes made.");
  }
}
