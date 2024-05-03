import api from "../../api";
import { toast } from "react-toastify";
import styles from './CadastroCliente.module.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ImgBarra from '../../utils/assets/barra-lateral.svg';
import NavBar from '../../components/navbar/NavBar';

function CadastroCliente() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleSave = () => {
        if (senha !== confirmarSenha) {
            toast.error("As senhas não coincidem!");
            return;
        }
        const objetoCadastrado = {
            email,
            nome,
            senha,
            telefone,
        };
        api.post(`clientes`, {
            email,
            nome,
            senha,
            telefone,

        }).then(() => {
            toast.success("Novo Cliente criado com sucesso!");
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
    // const handleBack = () => {
    //     navigate("/login");

    // }


    return (
        <>
            <div className={styles["container"]}>
                <img src={ImgBarra} className={styles["barraLeft"]} alt="" srcSet="" />
                <img src={ImgBarra} className={styles["barraRight"]} alt="" srcSet="" />
                <NavBar />
                <div className={styles["container-title"]}>
                    <h1 className={styles["title"]}>CADASTRAR</h1></div>
                <div className={styles["container-form"]}>
                    <div className={styles["container-input"]}>
                        <p>EMAIL</p>
                        <input
                            className={styles["input-form"]}
                            type="text"
                            placeholder="usuario@gmail.com"
                            value={email}
                            onChange={(e) => handleInputChange(e, setEmail)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                        <p>NOME</p>
                        <input
                            className={styles["input-form"]}
                            type="text"
                            placeholder="Ex: usuario"
                            value={nome}
                            onChange={(e) => handleInputChange(e, setNome)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                        <p>TELEFONE</p>
                        <input
                            className={styles["input-form"]}
                            type="text"
                            placeholder="Ex: 11 999999999"
                            value={telefone}
                            onChange={(e) => handleInputChange(e, setTelefone)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                        <p>SENHA</p>
                        <input
                            className={styles["input-form"]}
                            type="password"
                            placeholder="***********"
                            value={senha}
                            onChange={(e) => handleInputChange(e, setSenha)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                        <p>CONFIRMAR SENHA</p>
                        <input
                            className={styles["input-form"]}
                            type="password"
                            placeholder="***********"
                            value={confirmarSenha}
                            onChange={(e) => handleInputChange(e, setConfirmarSenha)}
                        />
                    </div>
                    <h5 className={styles["h5-txt"]}>já tem uma conta? <a  className={styles["h4-txt"]}href="../login">clique aqui</a></h5>

                    <div className="container-btn">
                        <button className={styles["button-alterar"]} type="button"
                            onClick={handleSave}>CADASTRAR</button>
                        <div id="pg_login"></div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default CadastroCliente;