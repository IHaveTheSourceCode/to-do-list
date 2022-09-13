// function createProjectContainerForm
//will add form to navbar, gets name only
function callProjectContainerForm() {
  const form = document.querySelector(".project-container-form");
  form.classList.toggle("hide");
}

function appendProjectForm() {
  //hides plus button, shows form
  // if clicked anywhere else cancel form and show plus button
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("project-name-input");
  input.placeholder = "Project name";
  document.querySelector("");
}

function unappendProjectForm() {}

// function createProjectForm
// function createNoteForm
// function show/hide projects in container
export { callProjectContainerForm };
