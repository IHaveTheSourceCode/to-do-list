import "./style.css";
import "./setEventListeners";

const container = [];

//array will hold projectsContainers
// and project containers will hold projects inside of them
// and projects will hold notes inside of them

class projectsContainer {
  constructor(container_name, id) {
    this.container_name = container_name;
    this.id = id;
  }
}

class project {
  constructor(project_name, id) {
    this.project_name = project_name;
    this.id = id;
  }
}

class note {
  constructor(title, description, due_date, starred, id) {
    this.title = title;
    this.description = description;
    this.due_date = due_date;
    this.starred = starred;
    this.id = id;
  }
}

import {
  callProjectContainerForm,
  createProjectContainer,
} from "./manipulateDOM";
createProjectContainer("Project Name2");
