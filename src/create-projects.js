// create-projects.js

// create array to hold all created projects
export const projectsList = [];

export function createProject() {
  // prompt to collect project title - change to form for UI
  let projectInput = prompt("New project title:");

  if (projectInput && projectInput.trim() !== "") {
    // check for duplicate project titles
    for (let i = 0; i < projectsList.length; i++) {
      if (projectsList[i].title.toLowerCase() === projectInput.toLowerCase()) {
        alert("Project title already present");
        console.log("Project title already present");
        return;
      }
    }

    // create project object with an empty todos array
    const newProject = {
      title: projectInput.trim(),
      todos: [],
      id: self.crypto.randomUUID(), // random uuid for each project
    };

    projectsList.push(newProject);
    console.log("Created project:", newProject);
    return newProject;
  } else {
    alert("Please input a project title"); // don't allow empty project title
    console.log("Please input a project title");
  }
}
