const mainArray = [];
const testArr = [];

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
  wrapper.dataset.orderWrap = orderIteration;
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.classList.add("arrow-down-image");
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
  console.log(prContainer);
  mainArray.push(prContainer);
  console.log(mainArray);
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

  // event that will add single directory when pressing enter on input form
  input.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      //creates directory and adds it to array on "enter" press
      let project = document.createElement("div");
      project.classList.add("project");
      let project_name = document.createElement("p");
      project_name.textContent = input.value;
      project.appendChild(project_name);
      // pushes element to corresponding project's array
      for (let i = 0; i < mainArray.length; i++) {
        if (mainArray[i].id == parent.dataset.order) {
          mainArray[i].arr.push(new subDir(mainArray[i].arr.length));
          // console.log(mainArray[i].arr[mainArray[i].arr.length + 1]);
          // let x = mainArray[i].arr.length - 1;

          //mainArray[i].arr[1].arr
          let z = mainArray[i].arr[mainArray[i].arr.length - 1].arr;
          console.log(z);
          // let y = mainArray[i].arr[mainArray[i].length - 1];
          // console.log(y);
          // console.log(x);
          // console.log(mainArray[i].arr[x]);
          project.addEventListener("click", function () {
            subDirClickEvents(
              mainArray[i].arr[mainArray[i].arr.length - 1].arr
            );
          });
        }
      }
      parent.prepend(project);
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
  this.arr = [];
}

function subDir(id) {
  this.id = id;
  this.arr = [];
}

function createNote(important, text, date) {
  this.important = important;
  this.text = text;
  this.date = date;
}

//render notes (takes subDir notes array as argument)
function renderNotes(subDir) {
  // adds addNoteBtn
  let projectList = document.querySelector(".project-list");

  //clears notes
  document.querySelectorAll(".note").forEach((note) => note.remove());

  //renders notes
  for (let i = 0; i < subDir.length; i++) {
    let important = subDir[i].important;
    let text = subDir[i].text;
    let date = subDir[i].date;
    projectList.prepend(makeNote(important, text, date));
  }
}

function makeAddNoteBtn() {
  let btn = document.createElement("button");
  btn.classList.add("add-note");
  btn.textContent = "Add note";
  return btn;
}

// function removeMakeAddNoteBtn() {
//   document.querySelector(".add-note").remove();
// }

//creates form for making notes nodeElements
function createNoteForm(subDir) {
  let noteForm = document.createElement("div");
  noteForm.classList.add("note-form");

  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.classList.add("note-text");

  let dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.classList.add("note-date");
  textInput.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      subDir.push(new createNote(false, textInput.value, dateInput.value));
      dateInput.value = "";
      textInput.value = "";
      renderNotes(subDir);
    }
  });

  noteForm.appendChild(textInput);
  noteForm.appendChild(dateInput);

  return noteForm;
  // document.querySelector(".project-list").appendChild(noteForm);
}

function deleteNoteForm() {
  document.querySelector(".note-form").remove();
}

// returns note nodeElement
function makeNote(important, noteText, noteDate) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("note");

  let star = document.createElement("img");
  star.classList.add("star");
  if (important == true) {
    star.src = "../star-filled.png";
  } else {
    star.src = "../star.png";
  }

  let text = document.createElement("div");
  text.classList.add("note-s");
  text.textContent = noteText;

  let date = document.createElement("div");
  date.classList.add("due-date");
  date.textContent = noteDate;

  wrapper.appendChild(star);
  wrapper.appendChild(text);
  wrapper.appendChild(date);

  return wrapper;
}

// clears notes display
function clearDisplay() {
  document.querySelector(".project-list").innerHTML = "";
}

// events that will occur when clicking on subDir
// notes will be rendered with addNoteBtn inside of it
// takes notes array as argument
function subDirClickEvents(subDirTarget) {
  clearDisplay();
  // appends form for filling notes to notes container
  //btn adding must happen first
  let notesContainer = document.querySelector(".project-list");
  //add btn that has event listener below

  notesContainer.appendChild(createNoteForm(subDirTarget));

  // renders notes
  renderNotes(subDirTarget);
}

export { callProjectContainerForm, createProjectContainer };
