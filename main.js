import "./style.css";
import "./setEventListeners";

const container = [];

//array will hold projectsContainers
// and project containers will hold projects inside of them
// and projects will hold notes inside of them

import {
  callProjectContainerForm,
  createProjectContainer,
} from "./manipulateDOM";

createProjectContainer("name");
