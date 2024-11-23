import React from "react";
import styles from "./CardBarbeiros.module.css";
import capaImg from "../../utils/assets/logo/logoHeader.png";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import api from "../../api";

const CardBarbeiros = ({ id, foto, nome, email, telefone, onDelete }) => {
    const navigate = useNavigate();

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
                    url: `barbeiros/desativar/${id}`,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                };

                api.request(options).then(function (response) {
                    console.log(response.data);
                    toast.success("Barbeiro excluido!");
                    sessionStorage.setItem("AtivarToast", "ativar");
                    onDelete(id); 
                }).catch(function (error) {
                    console.error(error);
                    toast.error("Erro ao Excluir o Barbeiro");
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        });
    };

    return (
        <div>
            <div className={styles["imagem-container"]}>
                <div className={styles["parte-imagem"]}>
                    <img src={foto ? foto : capaImg} alt="Imagem" className={styles["imagem"]} />
                </div>
                <div className={styles["texto"]}>
                    <p><span>{nome || "N/A"}</span></p>
                    <p>Email: {email || "N/A"}</p>
                    <p>Telefone: {telefone || "N/A"}</p>
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
