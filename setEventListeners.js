import { callProjectContainerForm } from "./manipulateDOM";

document
  .querySelector(".close-project-form")
  .addEventListener("click", callProjectContainerForm);

document
  .querySelector(".open-project-form")
  .addEventListener("click", callProjectContainerForm);

document
  .querySelector(".add-button")
  .addEventListener("click", callProjectContainerForm);
