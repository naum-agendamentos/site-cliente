// Importa React da biblioteca react
import React from "react";
// Importa os estilos específicos deste componente
import styles from "./CardVerBarbeiro.module.css";
// Importa uma imagem padrão para ser usada caso nenhuma imagem específica seja fornecida
import capaImg from "../../utils/assets/logo/logoHeader.png";

// import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas

// Define o componente CardMusica como uma função que recebe propriedades
const CardBarbeiros = ({
    foto,
    nome,
    email,
    celular
}) => {
    // const navigate = useNavigate(); // Inicializa o hook de navegação

    // const editar = () => { // Função chamada ao clicar em cancelar
    //     navigate("/editar-barbeiro"); // Redireciona para a página de músicas
    // };


    return (
        // Contêiner principal do cartão
        <div>
            {/* Contêiner para a imagem */}
            <div className={styles["imagem-container"]}>
                <div className={styles["parte-imagem"]}>
                {/* Exibe a imagem da música; usa imagemSrc se fornecido, caso contrário usa capaImg */}
                <img src={foto ? foto : capaImg} alt="Imagem"
                    className={styles["imagem"]} />
                </div>
                
                
                {/* Contêiner para os botões */}
                <div className={styles["texto"]}>
                    <p><span>{nome || "N/A"}</span></p>
                    <p>Email: {email || "N/A"}</p>
                    <p>Celular: {celular || "N/A"}</p>
                </div>
            </div>
        </div>

    );
};
// Exporta o componente para que possa ser usado em outras partes da aplicação
export default CardBarbeiros;