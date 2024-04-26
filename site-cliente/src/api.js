// Importa a biblioteca Axios.
import axios from "axios";

// Cria uma instância do Axios com configurações personalizadas.
const api = axios.create({
    // Define a URL base para as requisições HTTP. Essa URL é obtida a partir de uma variável de ambiente,
    // o que torna o código mais seguro e flexível, já que a URL pode ser facilmente alterada sem necessidade de modificar o código.
    baseURL: "https://6601e79f9d7276a755526034.mockapi.io/music-box"
});
    
// Exporta a instância criada para que possa ser utilizada em outras partes do projeto.
export default api;