const mainArray = [];

function callProjectContainerForm() {
  const form = document.querySelector(".project-container-form");
  form.classList.toggle("hide");

  // resets input on call
  const form_input = document.querySelector("#container-name");
  form_input.value = "";
}

// deletes repository inputs
function unappendProjectForms() {
  document.querySelectorAll(".project-name-input").innerHTML = "";
}

let orderIteration = 0;
let elementId = 0;

// creates projects container
function createProjectContainer(projectName) {
  const projects = document.createElement("div");
  projects.classList.add("projects");
  projects.dataset.order = orderIteration;
  const wrapper = document.createElement("div");
  wrapper.classList.add("project-wrapper");
  wrapper.dataset.order = orderIteration;
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = "../arrow-down.png";
  img.alt = "open notes image.";
  img.addEventListener("click", function () {
    toggleProjectSubdirectory(orderIteration);
  });
  orderIteration++;
  const paragraph = document.createElement("p");
  paragraph.textContent = projectName;
  const button = document.createElement("div");
  button.classList.add("add-project-wrapper");
  const image = document.createElement("img");
  image.classList.add("add-project-button");
  image.src = "../btn-plus.png";

  appendProjectListener(button, projects);

  button.appendChild(image);
  div.appendChild(img);
  div.appendChild(paragraph);
  wrapper.appendChild(div);
  projects.appendChild(button);
  wrapper.appendChild(projects);
  document.querySelector("#projects-nav").appendChild(wrapper);

  let prContainer = new projectsContainer(elementId);
  mainArray.push(prContainer);
  elementId++;
}

// shows/hides directory list
function toggleProjectSubdirectory(target) {
  document.querySelector(`[data-order="${target}"]`).classList.toggle("hide");
}

//creates input for creating new directories
function appendProjectListener(btn, parent) {
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("project-name-input");
  input.placeholder = "Project name";

  input.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      //creates directory and adds it to array on "enter" press
      let project = document.createElement("div");
      project.classList.add("project");
      let project_name = document.createElement("p");
      project_name.textContent = input.value;
      project.appendChild(project_name);
      parent.appendChild(project);
      input.value = "";
      parent.appendChild(input);
      unappendProjectForms();
    }
  });

  btn.addEventListener("click", () => {
    unappendProjectForms();
    parent.appendChild(input);
  });
}

// create Project on form fill
function addProject() {
  const btn = document.querySelector(".add-button");
  const input = document.querySelector("#container-name");

  btn.addEventListener("click", function () {
    createProjectContainer(input.value);
  });
  // input.addEventListener("keydown", (e) => {
  //   if (e.code == "Enter") {
  //     createProjectContainer(input.value);
  //   }
  // });
  // needs fix, not working, dk why yet

  input.value = "";
}
addProject();

// functions that create backend elements

function projectsContainer(id) {
  this.id = id;
  let arr = [];
}

function project(id) {
  this.id = id;
  let arr = [];
}

function note(id, important, text, due_date) {
  this.id = id;
  this.important = important;
  this.text = text;
  this.due_date = due_date;
}

// add project with custom id when creating project with form
// add subproject to project with same id when creating subproject with text input

// add function that will render notes when clicking on subdir and
//and change add note behavior

export { callProjectContainerForm, createProjectContainer };
