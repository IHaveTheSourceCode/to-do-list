function callProjectContainerForm() {
  const form = document.querySelector(".project-container-form");
  form.classList.toggle("hide");
}

//function that send info from above form

function unappendProjectForms() {
  document.querySelectorAll(".project-name-input").innerHTML = "";
}

function createProjectContainer(project_name) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("project-wrapper");
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = "public/arrow-down.png";
  const paragraph = document.createElement("p");
  paragraph.textContent = project_name;
  const button = document.createElement("div");
  button.classList.add("add-project-wrapper");
  const image = document.createElement("img");
  image.classList.add("add-project-button");
  image.src = "public/btn-plus.png";

  appendProjectListener(button, wrapper);

  button.appendChild(image);
  div.appendChild(img);
  div.appendChild(paragraph);
  wrapper.appendChild(div);
  wrapper.appendChild(button);
  document.querySelector("#projects-nav").appendChild(wrapper);
}
// function createProjectForm
// function createNoteForm
// function show/hide projects in container

function toggleProjectSubdirectory() {}

//function that send info from below input

function appendProjectListener(btn, parent) {
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("project-name-input");
  input.placeholder = "Project name";

  input.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
    }
  });

  btn.addEventListener("click", () => {
    unappendProjectForms();
    parent.appendChild(input);
  });
}

export { callProjectContainerForm, createProjectContainer };
