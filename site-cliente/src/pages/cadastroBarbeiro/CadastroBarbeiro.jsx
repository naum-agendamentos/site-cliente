import api from "../../api";
import style from "./CadastroBarbeiro.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImgBarra from '../../utils/assets/barra-lateral.svg'
import NavBar from '../../components/navbar-pos-login/NavBar';
import { toast } from "react-toastify";
function CadastroBarbeiro() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [celular, setCelular] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [descricao, setDescricao] = useState("");
    const [foto, setFoto] = useState("");
    const handleSave = () => {
        if (senha !== confirmarSenha) {
            toast.error("As senhas não coincidem!");
            return;
        }
        const objetoCadastrado = {
            email,
            nome,
            senha,
            celular,
            descricao,
            foto
        };
        api.post(``, {
            email,
            nome,
            senha,
            celular,
            descricao,
            foto
        }).then(() => {
            toast.success("Novo Barbeiro criado com sucesso!");
            sessionStorage.setItem("editado",
                JSON.stringify(objetoCadastrado));
            navigate("/login")
        }).catch(() => {
            toast.error("Ocorreu um erro ao salvar os dados,por favor, tente novamente.");
        })
    };
    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }
    const handleBack = () => {
        navigate("/login");

    }
    

    return (
            <>
                <div className={style["container"]}>
                    <img src={ImgBarra} className={style["barraLeft"]} alt="" srcSet="" />
                    <img src={ImgBarra} className={style["barraRight"]} alt="" srcSet="" />
                    <NavBar />
                    <div className={style["container-title"]}><h1 className={style["title"]}>CADASTRAR BARBEIRO</h1></div>
                    <div className={style["container-form"]}>
                        <div className={style["container-input"]}>
                            <p>EMAIL</p>
                            <input
                                className={style["input-form"]}
                                type="text"
                                placeholder="usuario@gmail.com"
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                            />
                        </div>
                        <div className={style["container-input"]}>
                            <p>NOME</p>
                            <input
                                className={style["input-form"]}
                                type="text"
                                placeholder="Ex: usuario"
                                value={nome}
                                onChange={(e) => handleInputChange(e, setNome)}
                            />
                        </div>
                        <div className={style["container-input"]}>
                            <p>TELEFONE</p>
                            <input
                                className={style["input-form"]}
                                type="text"
                                placeholder="Ex: 11 999999999"
                                value={celular}
                                onChange={(e) => handleInputChange(e, setCelular)}
                            />
                        </div>
                        <div className={style["container-input"]}>
                            <p>SENHA</p>
                            <input
                                className={style["input-form"]}
                                type="password"
                                placeholder="***********"
                                value={senha}
                                onChange={(e) => handleInputChange(e, setSenha)}
                            />
                        </div>
                        <div className={style["container-input"]}>
                            <p>CONFIRMAR SENHA</p>
                            <input
                                className={style["input-form"]}
                                type="password"
                                placeholder="***********"
                                value={confirmarSenha}
                                onChange={(e) => handleInputChange(e, setConfirmarSenha)}
                            />
                        </div>
                        <div className={style["container-input"]}>
                            <p>Descrição</p>
                            <textarea
                                className={style["input-form"]}
                                placeholder="Digite uma descrição"
                                value={descricao}
                                onChange={(e) => handleInputChange(e, setDescricao)}
                            />
                        </div>
                        <div className={style["container-input"]}>
                            <p>Foto</p>
                            <input className={style["input-form"]} 
                            type="text" 
                            value={foto}
                            placeholder="URL da Imagem"
                            onChange={(e) => handleInputChange(e,setFoto)} />
                        </div>
                        <div className={style["container-btn"]}>
                            <button className={style["button-alterar"]} type="button" 
                            onClick={handleSave}>CADASTRAR</button>
                        </div>
                    </div>
                </div>
            </>
    );
}


export default CadastroBarbeiro;
