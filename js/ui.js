import api from "./api.js";

const ui = {
  async renderTable(filteredRequests = null) {
    ui.clearTable();
    const resquestToRender = !filteredRequests
      ? await api.getRequests()
      : filteredRequests;
    try {
      resquestToRender.forEach(ui.addRequestInTable);
    } catch (error) {
      alert("Erro ao renderizar a tabela");
      console.error(error);
    }
  },

  addRequestInTable(request) {
    // const tableRequest = document.querySelector("#table-request");
    const tBody = document.querySelector("#tbody-request");
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

    tr.onclick = () => {
      ui.getDataOfTable(
        tdNumero.textContent,
        tdData.textContent,
        tdSolicitante.textContent,
        tdLocal.textContent,
        tdEndereco.textContent,
        tdDescricao.textContent,
        tdContato.textContent
      );

      if (tr.classList.contains("selected")) {
        tr.classList.remove("selected");
        ui.clearDataOfForm();
      } else {
        const trs = document.querySelectorAll("tr");
        trs.forEach((tr) => {
          tr.classList.remove("selected");
        });
        tr.classList.add("selected");
      }
    };
    tBody.append(tr);
    // tableRequest.append(tBody);
  },

  showRequestArea() {
    document.body.classList.add("modal-open");
  },

  hideRequestArea() {
    document.body.classList.remove("modal-open");
  },

  getDataOfTable(
    number,
    date,
    requester,
    local,
    address,
    description,
    contact
  ) {
    document.querySelector("#input-number").value = number;
    document.querySelector("#input-date").value = date;
    document.querySelector("#select-requester").value =
      ui.getRequesterValue(requester);
    document.querySelector("#input-local").value = local;
    document.querySelector("#input-address").value = address;
    document.querySelector("#textarea-description").value = description;
    document.querySelector("#input-contact").value = contact;
  },

  clearDataOfForm() {
    document.querySelector("#input-number").value = "";
    document.querySelector("#input-date").value = "";
    document.querySelector("#select-requester").value = "";
    document.querySelector("#input-local").value = "";
    document.querySelector("#input-address").value = "";
    document.querySelector("#textarea-description").value = "";
    document.querySelector("#input-contact").value = "";
  },

  getRequesterValue(requester) {
    if ((requester = "Arthur Guimarães Bueno")) return "arthur";

    if ((requester = "Felipe Lopes de Paula Couto")) return "felipe";

    if ((requester = "Lúcio Mauro Bessa Cardoso")) return "lucio";
  },

  clearTable() {
    const tBodyRequest = document.querySelector("#tbody-request");
    const tRows = tBodyRequest.querySelectorAll("tr");
    tRows.forEach((tRow) => {
      tRow.remove();
    });
  },
};
export default ui;
