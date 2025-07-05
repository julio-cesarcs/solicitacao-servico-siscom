import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderTable();
});

const btnNew = document.querySelector("#btn-new");
const btnEdit = document.querySelector("#btn-edit");
const btnDelete = document.querySelector("#btn-delete");
const btnSave = document.querySelector("#btn-save");
const btnCancel = document.querySelector("#btn-cancel");
const searchBar = document.querySelector("#search-bar");
let target = null;

btnNew.addEventListener("click", (e) => {
  target = e.target.id;
  ui.showRequestArea();
  document.querySelector("#input-number").value = getId();
  document.querySelector("#input-date").value = getToday();
});

btnEdit.addEventListener("click", (e) => {
  target = e.target.id;
  ui.showRequestArea();
});

btnDelete.addEventListener("click", () => {
  const id = document.querySelector("#input-number").value;
  try {
    api.deleteRequest(id);
  } catch {
    console.log(error);
    alert("Erro ao salvar solicitação");
    throw error;
  }
  ui.hideRequestArea();
  ui.renderTable();
  ui.clearDataOfForm();
});

searchBar.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    const searchText = searchBar.value;
    ui.clearTable();
    const filteredRequests = await api.searchBy(searchText);
    ui.renderTable(filteredRequests);
    console.log(filteredRequests); //está exibindo corretamente
  }
});

btnSave.addEventListener("click", async (e) => {
  e.preventDefault();

  const id = document.querySelector("#input-number").value;
  const data = document.querySelector("#input-date").value;
  const solicitante = getRequester(
    document.querySelector("#select-requester").value
  );
  const local = document.querySelector("#input-local").value;
  const endereco = document.querySelector("#input-address").value;
  const descricao = document.querySelector("#textarea-description").value;
  const contato = document.querySelector("#input-contact").value;

  if (!solicitante || !local || !endereco || !descricao || !contato) {
    alert("Preencha todos os campos");
    return;
  }

  try {
    if (target === "btn-new") {
      await api.postRequest({
        id,
        data,
        solicitante,
        local,
        endereco,
        descricao,
        contato,
      });
    } else if (target === "btn-edit") {
      await api.putRequest({
        id,
        data,
        solicitante,
        local,
        endereco,
        descricao,
        contato,
      });
    }
    ui.hideRequestArea();
    ui.renderTable();
    ui.clearDataOfForm();
  } catch (error) {
    console.log(error);
    alert("Erro ao salvar solicitação");
    throw error;
  }
});

btnCancel.addEventListener("click", () => {
  ui.hideRequestArea();
});

function getToday() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

function getId() {
  const arrayTr = document.querySelectorAll("tBody tr");
  const consecutivePart = String(arrayTr.length + 1).padStart(3, "0");
  const year = new Date().getFullYear();
  const yearPart = String(year).slice(-2);

  return `${consecutivePart}-${yearPart}`;
}

function getRequester(requester) {
  const requesterMap = {
    arthur: "Arthur Guimarães Bueno",
    felipe: "Felipe Lopes de Paula Couto",
    lucio: "Lúcio Mauro Bessa Cardoso",
  };
  return requesterMap[requester];
}
