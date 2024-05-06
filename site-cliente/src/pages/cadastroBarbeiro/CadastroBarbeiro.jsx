//import api from "../../api";
import styles from "./CadastroBarbeiro.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../../components/navbarBarbeiro/NavbarBarbeiro';
import axios from "axios";
import { toast } from "react-toastify";
function CadastroBarbeiro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [descricao, setDescricao] = useState("");
    const [foto, setFoto] = useState("");


    const handleSave = () => {
        if (senha !== confirmarSenha) {
            toast.error("As senhas não coincidem!");
            return;
        }


        const options = {
            method: 'POST',
            url: 'http://localhost:8080/barbeiros',
            data: {
                nome: nome,
                email: email,
                senha: senha,
                telefone: telefone,
                descricao: descricao,
                foto: foto
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        console.log(options);

        axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Novo Barbeiro criado com sucesso!");
            sessionStorage.setItem("editado",
                JSON.stringify(response.data));
            navigate("/barbeiros")

        }).catch(function (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao salvar os dados,por favor, tente novamente.");
        });

    };
    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }
    // const handleBack = () => {
    //     navigate("/login");

    // }


    return (
        <>
            <div class="borda-gradiente-left">
                <div class="borda-gradiente-right">
                    <div className={styles["container"]}>
                        <NavBar />
                        <div className={styles["container-title"]}>
                            <h1 className={styles["title"]}>CADASTRAR BARBEIRO</h1></div>
                        <div className={styles["container-form"]}>
                            <div className={styles["container-input"]}>
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
                                <p>Descrição</p>
                                <textarea
                                    className={styles["input-form"]}
                                    placeholder="Digite uma descrição"
                                    value={descricao}
                                    onChange={(e) => handleInputChange(e, setDescricao)}
                                />
                            </div>
                            <div className={styles["container-input"]}>
                                <p>Foto</p>
                                <input className={styles["input-form"]}
                                    type="text"
                                    value={foto}
                                    placeholder="URL da Imagem"
                                    onChange={(e) => handleInputChange(e, setFoto)} />
                            </div>
                            <div className={styles["container-btn"]}>
                                <button className={styles["button-alterar"]} type="button"
                                    onClick={handleSave}>CADASTRAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default CadastroBarbeiro;
