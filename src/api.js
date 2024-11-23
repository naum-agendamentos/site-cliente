// Importa a biblioteca Axios.
import axios from "axios";

// Variável para armazenar a instância do Axios
let api = null;

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

// Função para criar e exportar a instância do Axios com o IP público
export async function getApi() {
    if (!api) { // Verifica se a instância já foi criada
        const publicIP = await getPublicIP();

        if (publicIP) {
            api = axios.create({
                baseURL: `http://${publicIP}/`  // Configura o baseURL dinamicamente com o IP público
            });
        } else {
            console.error("Não foi possível obter o IP público.");
            return null;
        }
    }

    return api; // Retorna a instância criada
}

// Se desejar usar diretamente a instância (não recomendado sem esperar a criação):
export default getApi();
