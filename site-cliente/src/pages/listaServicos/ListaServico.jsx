import React, { useState, useEffect } from "react";
import style from './ListaServico.module.css';
import NavBar from '../../components/navbarBarbeiro/NavbarBarbeiro';
import BtnEdit from '../../utils/assets/btn-edit.png';
import BtnDelete from '../../utils/assets/btn-delete.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

const ListaServico = () => {
    const [servicos, setServicos] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8080/servicos',
            params: { idBarbearia: sessionStorage.getItem("idBarbearia") },
            headers: {
                'User-Agent': 'insomnia/9.2.0',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        axios.request(options)
            .then(function (response) {
                

                setServicos(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []); 


    const handleCadast = () => {
        navigate("/cadastro-servico");
    };

    const handleEdit = (id) => {
        navigate(`/editar-servico/${id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Deseja mesmo excluir este serviço?",
            text: "Ele será deletado permanentemente",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SIM",
            cancelButtonText: "CANCELAR"
          }).then((result) => {
            if (result.isConfirmed) {
                const options = {
                    method: 'DELETE',
                    url: `http://localhost:8080/servicos/${id}`,
                    params: { idBarbearia: sessionStorage.getItem("idBarbearia") },
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                  };
                  
                  axios.request(options).then(function (response) {
                    console.log(response.data);
                    toast.success("Serviço EXCLUIDO!");
                  }).catch(function (error) {
                    console.error(error);
                    toast.error("Erro ao Excluir o serviço");
                  });
              setTimeout(() => {
                window.location.reload();
            }, 4000);
            }
          });
    };

    return (
        <>
            <div className="borda-gradiente-left">
                <div className="borda-gradiente-right">
                    <div className={style["container"]}>
                        <NavBar />
                        <div className={style["container-title"]}>
                            <h1 className={style["title"]}>SERVIÇOS CADASTRADOS</h1>
                        </div>
                        <div className={style["container-table"]}>
                            <div className={style["box-table"]}>
                                <table className="table">
                                    <thead className={style["title-table"]}>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Preço</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {servicos.map((servico) => (
                                            <tr key={servico.id}>
                                                <th scope="row">{servico.id || "N/D"}</th>
                                                <td className={style["txt-td"]}>{servico.nomeServico || "N/D"}</td>
                                                <td className={style["txt-td"]}>{servico.preco || "N/D"}</td>
                                                <td className={style["txt-td"]}>
                                                    <button className={style["btn"]}>
                                                        <img onClick={() => handleEdit(servico.id)} className={style["img-btn"]} src={BtnEdit} alt="Edit" />
                                                    </button>
                                                </td>
                                                <td className={style["txt-td"]}>
                                                    <button className={style["btn"]}>
                                                        <img onClick={() => handleDelete(servico.id)} className={style["img-btn"]} src={BtnDelete} alt="Delete" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={style["container-adicionar"]}>
                                <button onClick={handleCadast} className={style["btn-adicionar"]}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListaServico;
