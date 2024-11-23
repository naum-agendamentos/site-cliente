// Importa a biblioteca Axios.
import axios from "axios";

// Função para pegar o IP público da instância EC2 via Metadata API
async function getPublicIP() {
    try {
        const response = await axios.get('http://169.254.169.254/latest/meta-data/public-ipv4');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter o IP público:", error);
        return null; // Caso haja um erro, pode-se configurar um IP padrão ou tratar da maneira desejada.
    }
}

// Cria uma instância do Axios com configurações personalizadas.
async function createApi() {
    const publicIP = await getPublicIP();

    if (publicIP) {
        const api = axios.create({
            baseURL: `http://${publicIP}/`  // Configura o baseURL dinamicamente com o IP público
        });

        // Exporta a instância criada para que possa ser utilizada em outras partes do projeto.
        return api;
    } else {
        // Retorna um erro ou usa uma URL padrão caso o IP não seja encontrado.
        console.error("Não foi possível obter o IP público.");
        return null;
    }
}

// Chama a função para configurar o Axios
createApi().then((api) => {
    if (api) {
        // Exemplo de uso do API
        api.get('/alguma-rota')
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }
});
