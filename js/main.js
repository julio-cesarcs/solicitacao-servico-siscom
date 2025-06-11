import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderTable();
});

const bntNew = document.querySelector("#btn-new");
const bntEdit = document.querySelector("#btn-edit");
const bntCancel = document.querySelector("#btn-cancel");

bntNew.addEventListener("click", () => {
  ui.showRequestArea();
});

bntEdit.addEventListener("click", () => {
  ui.showRequestArea();
});

bntCancel.addEventListener("click", () => {
  ui.hideRequestArea();
});
