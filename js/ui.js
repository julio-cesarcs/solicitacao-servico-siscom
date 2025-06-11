import api from "./api.js";

const ui = {
  async renderTable() {
    const resquestToRender = await api.getRequests();
    try {
      resquestToRender.forEach(ui.addRequestInTable);
    } catch (error) {
      alert("Erro ao renderizar a tabela");
      console.error(error);
    }
  },

  addRequestInTable(request) {
    const tableRequest = document.querySelector("#table-request");
    const tBody = document.createElement("tbody");
    const tr = document.createElement("tr");

    const tdNumero = document.createElement("td");
    const tdData = document.createElement("td");
    const tdSolicitante = document.createElement("td");
    const tdLocal = document.createElement("td");
    const tdEndereco = document.createElement("td");
    const tdDescricao = document.createElement("td");
    const tdContato = document.createElement("td");

    tdNumero.textContent = request.id;
    tdData.textContent = request.data;
    tdSolicitante.textContent = request.solicitante;
    tdLocal.textContent = request.local;
    tdEndereco.textContent = request.endereco;
    tdDescricao.textContent = request.descricao;
    tdContato.textContent = request.contato;

    tr.append(
      tdNumero,
      tdData,
      tdSolicitante,
      tdLocal,
      tdEndereco,
      tdDescricao,
      tdContato
    );
    tr.classList.add('select')
    tBody.append(tr);
    tableRequest.append(tBody);
  },

  showRequestArea() {
    document.body.classList.add("modal-open");
  },

  hideRequestArea() {
    document.body.classList.remove("modal-open");
  },
};

export default ui;
