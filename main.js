import "./style.css";
import "./setEventListeners";

const container = [];

//array will hold projectsContainers
// and project containers will hold projects inside of them
// and projects will hold notes inside of them

import {
  callProjectContainerForm,
  createProjectContainer,
  testAppend,
  renderNotes,
} from "./manipulateDOM";

let notesArr = [
  {
    text: "Make the dishes.",
    important: false,
    date: "12-09-2024",
  },
  {
    text: "Learn new tools.",
    important: false,
    date: "12-12-2022",
  },
  {
    text: "Pet the cat.",
    important: true,
    date: "10-20-2022",
  },
  {
    text: "Buy ice-cream.",
    important: false,
    date: "11-26-2022",
  },
  {
    text: "Go for a bike ride.",
    important: false,
    date: "12-20-2022",
  },
];
let subDir = createProjectContainer("My first project");
renderNotes(notesArr);
