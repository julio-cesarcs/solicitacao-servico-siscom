const URL_BASE = "http://localhost:3000";
// const URL_BASE = "https://684f7986e7c42cfd1794c693.mockapi.io";
const api = {
  async getRequests() {
    try {
      const response = await axios.get(`${URL_BASE}/solicitacoes`);
      return await response.data;
    } catch (error) {
      alert("Erro ao buscar as SS's");
      console.error(error);
      throw error;
    }
  },

  async postRequest(request) {
    try {
      const response = await axios.post(`${URL_BASE}/solicitacoes`, request);
      return await response.data;
    } catch (error) {
      alert("Erro ao salvar a SS");
      console.error(error);
      throw error;
    }
  },

  async putRequest(request) {
    try {
      const response = await axios.put(
        `${URL_BASE}/solicitacoes/${request.id}`,
        request
      );
      return await response.data;
    } catch {
      alert("Erro ao editar a SS");
      throw error;
    }
  },

  async deleteRequest(id) {
    try {
      const response = await axios.delete(`${URL_BASE}/solicitacoes/${id}`);
    } catch {
      alert("Erro ao excluir a SS");
      throw error;
    }
  },

  async searchBy(term) {
    try {
      const termLowerCase = term.toLowerCase();
      const requests = await this.getRequests();
      const filteredRequests = requests.filter((request) => {
        return (
          request.local.toLowerCase().includes(termLowerCase) ||
          request.endereco.toLowerCase().includes(termLowerCase) ||
          request.descricao.toLowerCase().includes(termLowerCase)
        );
      });
      return filteredRequests;
    } catch {
      alert("Erro ao filtrar SS");
      throw error;
    }
  },
};

export default api;
