import api from "../../api";
import { toast } from "react-toastify";
import styles from './CadastroCliente.module.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import NavBar from '../../components/navbar/NavBar';

function CadastroCliente() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erroEmail, setErroEmail] = useState("");
    const [inputValidEmail, setInputValidEmail] = useState("input-form");

    const [erroNome, setErroNome] = useState("");
    const [inputValidNome, setInputValidNome] = useState("input-form");

    const [erroTelefone, setErroTelefone] = useState("");
    const [inputValidTelefone, setInputValidTelefone] = useState("input-form");

    const [erroSenha, seterroSenha] = useState("");
    const [inputValidSenha, setInputValidSenha] = useState("input-form");

    const [erroConfSenha, seterroConfSenha] = useState("");
    const [inputValidConfSenha, setInputValidConfSenha] = useState("input-form");

    const handleInputChange = (event, setStateFunction) => {
        const value = event.target.value;
        setStateFunction(value);
    }

    const handleEmailBlur = (event) => {
        const value = event.target.value;
        const regexEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!value.match(regexEmail)) {
            setErroEmail("Insira um email válido");
            setInputValidEmail("input-error");
        } else {
            setErroEmail("");
            setInputValidEmail("input-form");
        }
    }

    const handleNomeBlur = (event) => {
        const value = event.target.value;

        if (value === "") {
            setErroNome("Nome não pode estar vazio");
            setInputValidNome("input-error");
        } else {
            setErroNome("");
            setInputValidNome("input-form");
        }
    }

    const handleTelefoneBlur = (event) => {
        const value = event.target.value;
        const regexTel = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

        if (!value.match(regexTel) || value.length !== 11) {
            setErroTelefone("Insira um telefone válido");
            setInputValidTelefone("input-error");
        } else {
            setErroTelefone("");
            setInputValidTelefone("input-form");
        }
    }

    const handleSenhaBlur = (event) => {
        const value = event.target.value;

        if (value.length < 6) {
            seterroSenha("A senha deve conter no mínimo 6 dígitos");
            setInputValidSenha("input-error");
        } else {
            seterroSenha("");
            setInputValidSenha("input-form");
        }
    }

    const handleConfSenhaBlur = (event) => {
        const value = event.target.value;

        if (value !== senha) {
            seterroConfSenha("As senhas não coincidem");
            setInputValidConfSenha("input-error");
        } else {
            seterroConfSenha("");
            setInputValidConfSenha("input-form");
        }
    }

    const handleSave = () => {
        handleEmailBlur({ target: { value: email } });
        handleNomeBlur({ target: { value: nome } });
        handleTelefoneBlur({ target: { value: telefone } });
        handleSenhaBlur({ target: { value: senha } });
        handleConfSenhaBlur({ target: { value: confirmarSenha } });

        const todosCamposVazios = !email && !nome && !telefone && !senha && !confirmarSenha;

        if (erroEmail || erroNome || erroTelefone || erroSenha || erroConfSenha || todosCamposVazios) {
            toast.error("Preencha todos os campos corretamente.");
        } else {
            const objetoCadastrado = {
                email,
                nome,
                senha,
                telefone,
            };
            api.post('clientes', {
                email,
                nome,
                senha,
                telefone,
            }).then(() => {
                toast.success("Novo Cliente criado com sucesso!");
                sessionStorage.setItem("editado", JSON.stringify(objetoCadastrado));
                navigate("/login");
            }).catch((error) => {
                const status = error.response ? error.response.status : 'sem status';
                const mensagem = error.response ? error.response.data : error.message;
            
                if (status === 409) {
                    toast.error("Já existe um usuário com esse endereço de Email");
                } else {
                    toast.error(`Ocorreu um erro ${mensagem}, por favor, tente novamente.`);
                }
                
            });
            
        }
    };

    return (
        <>
            <div class="borda-gradiente-left">
                <div class="borda-gradiente-right">
                    <div className={styles["container"]}>
                        <NavBar />
                        <div className={styles["container-title"]}>
                            <h1 className={styles["title"]}>CADASTRAR</h1></div>
                        <div className={styles["container-form"]}>
                            <div className={styles["container-input"]}>
                                <div className={styles["info-up-inputs"]}>
                                    <p>EMAIL</p>
                                    {erroEmail && <span>{erroEmail}</span>}
                                </div>
                                <input
                                    className={styles[inputValidEmail]}
                                    type="text"
                                    placeholder="usuario@gmail.com"
                                    value={email}
                                    onBlur={handleEmailBlur}
                                    onChange={(e) => handleInputChange(e, setEmail)}
                                />
                            </div>
                            <div className={styles["container-input"]}>
                                <div className={styles["info-up-inputs"]}>
                                    <p>NOME</p>
                                    {erroNome && <span>{erroNome}</span>}
                                </div>
                                <input
                                    className={styles[inputValidNome]}
                                    type="text"
                                    placeholder="Ex: usuario"
                                    value={nome}
                                    onBlur={handleNomeBlur}
                                    onChange={(e) => handleInputChange(e, setNome)}
                                />
                            </div>
                            <div className={styles["container-input"]}>
                                <div className={styles["info-up-inputs"]}>
                                    <p>TELEFONE</p>
                                    {erroTelefone && <span>{erroTelefone}</span>}
                                </div>
                                <input
                                    className={styles[inputValidTelefone]}
                                    type="text"
                                    placeholder="Ex: 11 999999999"
                                    maxLength={11}
                                    value={telefone}
                                    onBlur={handleTelefoneBlur}
                                    onChange={(e) => handleInputChange(e, setTelefone)}
                                />
                            </div>
                            <div className={styles["container-input"]}>
                                <div className={styles["info-up-inputs"]}>
                                    <p>SENHA</p>
                                    {erroSenha && <span>{erroSenha}</span>}
                                </div>
                                <input
                                    className={styles[inputValidSenha]}
                                    type="password"
                                    placeholder="***********"
                                    value={senha}
                                    onBlur={handleSenhaBlur}
                                    onChange={(e) => handleInputChange(e, setSenha)}
                                />
                            </div>
                            <div className={styles["container-input"]}>
                                <div className={styles["info-up-inputs"]}>
                                    <p>CONFIRMAR SENHA</p>
                                    {erroConfSenha && <span>{erroConfSenha}</span>}
                                </div>
                                <input
                                    className={styles[inputValidConfSenha]}
                                    type="password"
                                    placeholder="***********"
                                    value={confirmarSenha}
                                    onBlur={handleConfSenhaBlur}
                                    onChange={(e) => handleInputChange(e, setConfirmarSenha)}
                                />
                            </div>
                            <h5 className={styles["h5-txt"]}>já tem uma conta? <a className={styles["h4-txt"]} href="../login">clique aqui</a></h5>

                            <div className="container-btn">
                                <button className={styles["button-alterar"]} type="button"
                                    onClick={handleSave}>CADASTRAR</button>
                                <div id="pg_login"></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default CadastroCliente;
