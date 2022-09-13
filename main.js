import "./style.css";
import "./setEventListeners";

// import javascriptLogo from "./javascript.svg";
// import { setupCounter } from "./counter.js";

//object will hold projects container that will hold objects

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

import { callProjectContainerForm } from "./manipulateDOM";
