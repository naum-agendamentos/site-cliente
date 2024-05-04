// Importa React da biblioteca react
import React from "react";
// Importa os estilos específicos deste componente
import styles from "./CardBarbeiros.module.css";
// Importa uma imagem padrão para ser usada caso nenhuma imagem específica seja fornecida
import capaImg from "../../utils/assets/logo/logoHeader.png";
//import api from "../../api";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas

// Define o componente CardMusica como uma função que recebe propriedades
const CardBarbeiros = ({
    id,
    foto,
    nome,
    email,
    telefone
}) => {
    const navigate = useNavigate(); // Inicializa o hook de navegação

    const handleEdit = (id) => {
        navigate(`/editar-barbeiro/${id}`);
    };

    const handleDelete = (id) => {

            Swal.fire({
                title: "Deseja mesmo excluir este barbeiro?",
                text: "Ele será desativado e não aparecerá mais",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "SIM",
                cancelButtonText: "CANCELAR"
              }).then((result) => {
                if (result.isConfirmed) {
                    const options = {
                        method: 'PUT',
                        url: `http://localhost:8080/barbeiros/desativar/${id}`,
                        headers: {
                          Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                      };
                      
                      axios.request(options).then(function (response) {
                        console.log(response.data);
                        toast.success("Barbeiro EXCLUIDO!");
                      }).catch(function (error) {
                        console.error(error);
                        toast.error("Erro ao Excluir o Barbeiro");
                      });
                  setTimeout(() => {
                    window.location.reload();
                }, 4000);
                }
              });
                
        };
        
        
        
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
                    <p>telefone: {telefone || "N/A"}</p>
                </div>

                <div className={styles["botoes"]}>
                    {/* Botão para editar as informações da música */}
                    <button onClick={() => handleEdit(id)} className={styles["botao"]}>EDITAR</button>
                    {/* Botão para excluir a música */}
                    <button onClick={() => handleDelete(id)} className={styles["botao"]}>EXCLUIR</button>
                </div>
            </div>
        </div>

    );
};
// Exporta o componente para que possa ser usado em outras partes da aplicação
export default CardBarbeiros;