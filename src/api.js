// Importa a biblioteca Axios
import axios from "axios";

// Cria uma instância do Axios com configurações personalizadas.
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost/"  // Fallback para localhost se a variável não for definida
});

// Exporta a instância criada para que possa ser utilizada em outras partes do projeto.
export default api;
