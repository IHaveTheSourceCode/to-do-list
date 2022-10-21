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
  let orderFixed = orderIteration;
  img.addEventListener("click", function () {
    toggleProjectSubdirectory(orderFixed);
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
  return wrapper;
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

      let x;

      // pushes element to corresponding project's array
      for (let i = 0; i < mainArray.length; i++) {
        if (mainArray[i].id == parent.dataset.order) {
          mainArray[i].arr.push(new subDir(mainArray[i].arr.length));
          x = mainArray[i].arr[mainArray[i].arr.length - 1].arr;
        }
      }
      project.addEventListener("click", function () {
        subDirClickEvents(x);
        document.querySelectorAll(".project").forEach((project) => {
          project.classList.remove("active-subdir");
        });
        project.classList.add("active-subdir");
      });
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

function testAppend(subDirName, parent) {
  let project = document.createElement("div");
  project.classList.add("project");
  let project_name = document.createElement("p");
  project_name.textContent = subDirName;
  project.appendChild(project_name);

  let x;

  for (let i = 0; i < mainArray.length; i++) {
    if (mainArray[i].id == parent.dataset.order) {
      mainArray[i].arr.push(new subDir(mainArray[i].arr.length));
      x = mainArray[i].arr[mainArray[i].arr.length - 1].arr;
    }
  }
  project.addEventListener("click", function () {
    subDirClickEvents(x);
    document.querySelectorAll(".project").forEach((project) => {
      project.classList.remove("active-subdir");
    });
    project.classList.add("active-subdir");
  });
  parent.prepend(project);
  // unappendProjectForms();
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
    if (subDir[i] !== "") {
      projectList.prepend(
        makeNote(important, text, date, subDir[i], subDir, i)
      );
    }
  }
}

function makeAddNoteBtn() {
  let btn = document.createElement("button");
  btn.classList.add("add-note");
  btn.textContent = "Add note";
  return btn;
}

//creates form for making notes nodeElements
function createNoteForm(subDir) {
  let noteForm = document.createElement("div");
  noteForm.classList.add("note-form");

  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.classList.add("note-text");
  textInput.placeholder = "My fresh new task. ";

  let dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.classList.add("note-date");
  date.placeholder = "yyyy-mm-dd";
  textInput.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      if (textInput.value != "") {
        subDir.push(new createNote(false, textInput.value, dateInput.value));
        dateInput.value = "";
        textInput.value = "";
        textInput.placeholder = "My fresh new task. ";
        renderNotes(subDir);
      } else {
        textInput.placeholder = "Fill note's text before adding it.";
      }
    }
  });

  let button1 = makeAddNoteBtn();
  button1.addEventListener("click", function () {
    if (textInput.value != "") {
      subDir.push(new createNote(false, textInput.value, dateInput.value));
      dateInput.value = "";
      textInput.value = "";
      textInput.placeholder = "My fresh new task. ";
      renderNotes(subDir);
    } else {
      textInput.placeholder = "Fill note's text before adding it.";
    }
  });

  document.querySelector(".project-list").appendChild(button1);

  noteForm.appendChild(textInput);
  noteForm.appendChild(dateInput);

  return noteForm;
}

function deleteNoteForm() {
  document.querySelector(".note-form").remove();
}

// returns note nodeElement
function makeNote(important, noteText, noteDate, obj, objArray, iteration) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("note");

  let star = document.createElement("img");
  //toggle star to active and inactive

  star.addEventListener("click", function () {
    obj.important = !obj.important;
    renderNotes(objArray);
  });
  star.classList.add("star");
  function changeStarImg() {
    if (important == true) {
      star.src = "../star-filled.png";
    } else {
      star.src = "../star.png";
    }
  }

  changeStarImg();

  let text = document.createElement("div");
  text.classList.add("note-s");
  text.textContent = noteText;
  // add event listener to note
  //that will delete object from array on click
  text.addEventListener("click", function () {
    objArray[iteration] = "";
    renderNotes(objArray);
  });

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
  let notesContainer = document.querySelector(".project-list");

  notesContainer.appendChild(createNoteForm(subDirTarget));

  // renders notes
  renderNotes(subDirTarget);
}

// all below functions will fill notes container (and clear at start)
//and they will not append input

// function that will add all tasks
function getAllTasks() {
  let targetNotesArr = [];
  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray[i].arr.length; j++) {
      for (let k = 0; k < mainArray[i].arr[j].arr.length; k++) {
        if (mainArray[i].arr[j].arr[k].text) {
          targetNotesArr.push(mainArray[i].arr[j].arr[k]);
        }
      }
    }
  }
  document.querySelectorAll(".active-subdir").forEach((target) => {
    target.classList.remove("active-subdir");
  });
  renderNotes(targetNotesArr);
}
//function that will get today's date
function getTodaysDate() {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();

  today = year + "-" + month + "-" + day;
  return today;
}

//function that will get date 7 days ahead
function getNextWeekDate() {
  function addDays(date, days) {
    let result = new Date(date);

    result.setDate(result.getDate() + days);

    let day = String(result.getDate()).padStart(2, "0");
    let month = String(result.getMonth() + 1).padStart(2, "0"); //January is 0!
    let year = result.getFullYear();

    result = year + "-" + month + "-" + day;

    return result;
  }
  return addDays(getTodaysDate(), 7);
}

// function that will filter tasks for today
function filterByDateToday() {
  let targetNotesArr = [];
  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray[i].arr.length; j++) {
      for (let k = 0; k < mainArray[i].arr[j].arr.length; k++) {
        if (mainArray[i].arr[j].arr[k].date == getTodaysDate()) {
          targetNotesArr.push(mainArray[i].arr[j].arr[k]);
        }
      }
    }
  }
  document.querySelectorAll(".active-subdir").forEach((target) => {
    target.classList.remove("active-subdir");
  });
  renderNotes(targetNotesArr);
}
// function that will filter tasks for next 7 days from today's date
function filterByDateLastWeek() {
  let targetNotesArr = [];
  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray[i].arr.length; j++) {
      for (let k = 0; k < mainArray[i].arr[j].arr.length; k++) {
        if (
          mainArray[i].arr[j].arr[k].date >= getTodaysDate() &&
          mainArray[i].arr[j].arr[k].date <= getNextWeekDate()
        ) {
          targetNotesArr.push(mainArray[i].arr[j].arr[k]);
        }
      }
    }
  }
  document.querySelectorAll(".active-subdir").forEach((target) => {
    target.classList.remove("active-subdir");
  });
  renderNotes(targetNotesArr);
}
// function that will filter important tasks
function filterByImportance() {
  let targetNotesArr = [];
  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray[i].arr.length; j++) {
      for (let k = 0; k < mainArray[i].arr[j].arr.length; k++) {
        if (mainArray[i].arr[j].arr[k].important == true) {
          targetNotesArr.push(mainArray[i].arr[j].arr[k]);
        }
      }
    }
  }
  document.querySelectorAll(".active-subdir").forEach((target) => {
    target.classList.remove("active-subdir");
  });
  renderNotes(targetNotesArr);
}

// adds active status style to an element
function setActiveStatusStyle(element) {
  element.classList.add("active-subdir");
}

// deletes form for appending notes
function removeNoteAppendingForm() {
  let btn = document.querySelector(".add-note");
  let noteForm = document.querySelector(".note-form");
  if (btn) btn.remove();
  if (noteForm) noteForm.remove();
}

// sets all above functions to corresponding elements of the app
const allTasks = document.querySelector(".all-tasks");
allTasks.addEventListener("click", function () {
  getAllTasks();
  removeNoteAppendingForm();
  setActiveStatusStyle(allTasks);
});

const todaysTasks = document.querySelector(".todays-tasks");
todaysTasks.addEventListener("click", function () {
  filterByDateToday();
  removeNoteAppendingForm();
  setActiveStatusStyle(todaysTasks);
});

const nextWeekTasks = document.querySelector(".next-week-tasks");
nextWeekTasks.addEventListener("click", function () {
  filterByDateLastWeek();
  removeNoteAppendingForm();
  setActiveStatusStyle(nextWeekTasks);
});

const importantTasks = document.querySelector(".important-tasks");
importantTasks.addEventListener("click", function () {
  filterByImportance();
  removeNoteAppendingForm();
  setActiveStatusStyle(importantTasks);
});

function retriveAppData() {}

export {
  callProjectContainerForm,
  createProjectContainer,
  testAppend,
  renderNotes,
};
