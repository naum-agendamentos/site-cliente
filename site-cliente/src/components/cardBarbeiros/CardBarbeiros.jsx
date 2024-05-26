import React, { useEffect } from "react";
import styles from "./CardBarbeiros.module.css";
import capaImg from "../../utils/assets/logo/logoHeader.png";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from 'sweetalert2';
import { PilhaObj } from '../../utils/pilha';
import { useNavigate } from "react-router-dom";

const CardBarbeiros = ({
    id,
    foto,
    nome,
    email,
    telefone
}) => {
    const navigate = useNavigate();
    const pilha = new PilhaObj(10);

    // Restaurar a pilha do sessionStorage ao carregar a página
    useEffect(() => {
        const serializedPilha = sessionStorage.getItem("pilha");
        if (serializedPilha) {
            pilha.deserialize(serializedPilha);
        }
    }, []);

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
                    toast.success("Barbeiro excluido!");
                    ativarPilha(id); // Ativar a pilha imediatamente após a exclusão
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

    const ativarPilha = (id) => {
        if (pilha.getTopo() < pilha.tamanho) {
            pilha.push(id);
            sessionStorage.setItem("pilha", pilha.serialize());
        } else {
            toast.error("A pilha está cheia. Não é possível adicionar mais IDs.");
        }
    };

    const desfazerDelete = () => {
        const verificarVazio = pilha.isEmpty() ? null : pilha.pop();
        if (verificarVazio) {
            toast.info(`ID do último barbeiro deletado: ${verificarVazio}`);
            sessionStorage.setItem("pilha", pilha.serialize());
        } else {
            toast.warning("A pilha está vazia.");
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                desfazerDelete();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            <div className={styles["imagem-container"]}>
                <div className={styles["parte-imagem"]}>
                    <img src={foto ? foto : capaImg} alt="Imagem"
                        className={styles["imagem"]} />
                </div>
                <div className={styles["texto"]}>
                    <p><span>{nome || "N/A"}</span></p>
                    <p>Email: {email || "N/A"}</p>
                    <p>telefone: {telefone || "N/A"}</p>
                </div>
                <div className={styles["botoes"]}>
                    <button onClick={() => handleEdit(id)} className={styles["botao"]}>EDITAR</button>
                    <button onClick={() => handleDelete(id)} className={styles["botao"]}>EXCLUIR</button>
                </div>
            </div>
        </div>
    );
};

export default CardBarbeiros;
