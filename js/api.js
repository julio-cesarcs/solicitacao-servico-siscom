const URL_BASE = "http://localhost:3000";

const api = {
  async getRequests() {
    try {
      const response = await axios.get(`${URL_BASE}/solicitacoes`);
      return await response.data;
    } catch (error) {
      alert("Erro ao buscar solicitações");
      console.error(error);
      throw error;
    }
  },
};

export default api;
