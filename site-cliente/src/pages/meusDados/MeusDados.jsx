import React, { useState } from "react";
import style from './MeuDados.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
//import ImgBarra from '../../utils/assets/barra-lateral.svg';
//import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MeusDados = () => {

    //const { id } = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const options = {
        method: 'GET',
        url: `http://localhost:8080/clientes/usuario`,
        params: { idUsuario: sessionStorage.getItem("userId") },
        headers: {
            'User-Agent': 'insomnia/8.6.1',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    };

    axios.request(options)
        .then(function (response) {
            const { data } = response;
            const { id, nome, email, telefone } = data;
            sessionStorage.setItem("idCliente", id);
            setNome(nome);
            setEmail(email);
            setTelefone(telefone);
        })
        .catch(function (error) {
            console.error(error);
        });

    const navigate = useNavigate(); // Inicializa o hook de navegação

    const handleEdit = () => {
        navigate(`/editar-meus-dados/${sessionStorage.getItem("idCliente")}`);
    };


    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className="borda-gradiente-left">
                <div className="borda-gradiente-right">
                    <div className={style["container"]}>
                        <NavBar />
                        <div className={style["container-title"]}><h1 className={style["title"]}>MEUS DADOS</h1></div>
                        <div className={style["container-boxdata"]}>
                            <div className={style["box-data"]}>
                                <div className={style["container-conteudo-box-data"]}>
                                    <p className={style["title-box-data"]}>EMAIL</p>
                                </div>
                                <div className={style["container-conteudo-box-data"]}>
                                    <p className={style["text-box-data"]}>{email || "N/A"}</p>
                                </div>

                                <div className={style["container-conteudo-box-data"]}>
                                    <p className={style["title-box-data"]}>NOME</p>
                                </div>
                                <div className={style["container-conteudo-box-data"]}>
                                    <p className={style["text-box-data"]}>{nome || "N/A"}</p>
                                </div>

                                <div className={style["container-conteudo-box-data"]}>
                                    <p className={style["title-box-data"]}>TELEFONE</p>
                                </div>
                                <div className={style["container-conteudo-box-data"]}>
                                    <p className={style["text-box-data"]}>{telefone || "N/A"}</p>
                                </div>

                                <div className={style["container-button-box-data"]}>
                                    <button className={style["button-edit-box-data"]} onClick={handleEdit}>Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MeusDados;