//import api from "../../api";
import styles from "./CadastroBarbeiro.module.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../../components/navbarBarbeiro/NavbarBarbeiro';
import axios from "axios";
import { toast } from "react-toastify";
import Loading from '../../utils/assets/loading-gif-transparent-10.gif';
import api from "../../api";
import CloudinaryUploader from "../../components/uploadImg/CloudinaryUploader";


function CadastroBarbeiro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [descricao, setDescricao] = useState("");
    const [foto, setFoto] = useState("");

    const [erroNome, setErroNome] = useState("");
    const [inputValidNome, setInputValidNome] = useState("input-form");

    const [erroEmail, setErroEmail] = useState("");
    const [inputValidEmail, setInputValidEmail] = useState("input-form");

    const [erroTelefone, setErroTelefone] = useState("");
    const [inputValidTelefone, setInputValidTelefone] = useState("input-form");

    const [erroSenha, seterroSenha] = useState("");
    const [inputValidSenha, setInputValidSenha] = useState("input-form");

    const [erroConfSenha, seterroConfSenha] = useState("");
    const [inputValidConfSenha, setInputValidConfSenha] = useState("input-form");

    const [erroDescricao, seterroDescricao] = useState("");
    const [inputValidDescricao, setInputValidDescricao] = useState("input-form");

    const [erroFoto, seterroFoto] = useState("");
    const [inputValidFoto, setInputValidFoto] = useState("botao-up-img");

    const [botaoSalvar, setBotaoSalvar] = useState(false);


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

    const handleDescricaoBlur = (event) => {
        const value = event.target.value;

        if (value === "") {
            seterroDescricao("Descrição não pode estar vazia");
            setInputValidDescricao("input-error");
        } else {
            seterroDescricao("");
            setInputValidDescricao("input-form");
        }
    }

    const handleFotoBlur = (event) => {
        const value = event.target.value;

        const regexUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

        if (!value.match(regexUrl)) {
            seterroFoto("Carregue uma imagem");
        } else {
            seterroFoto("");
        }
    }


    const handleSave = () => {


        handleNomeBlur({ target: { value: nome } });
        handleEmailBlur({ target: { value: email } });
        handleSenhaBlur({ target: { value: senha } });
        handleConfSenhaBlur({ target: { value: confirmarSenha } });
        handleTelefoneBlur({ target: { value: telefone } });
        handleDescricaoBlur({ target: { value: descricao } });
        handleFotoBlur({ target: { value: foto } });

        const todosCamposVazios = !nome && !email && !senha && !confirmarSenha && !telefone && !descricao && !foto;

        if (erroNome || erroEmail || erroSenha || erroConfSenha || erroTelefone || erroDescricao || erroFoto || todosCamposVazios) {
            toast.error("Preencha todos os campos corretamente.");
        } else {
            setBotaoSalvar(true);
            const options = {
                method: 'POST',
                url: 'barbeiros',
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

            api.request(options).then(function (response) {
                console.log(response.data);
                toast.success("Novo Barbeiro criado com sucesso!");
                sessionStorage.setItem("editado",
                    JSON.stringify(response.data));
                navigate("/barbeiros")

            }).catch((error) => {
                setBotaoSalvar(false);
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
    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }
    // const handleBack = () => {
    //     navigate("/login");

    // }

    const fileInputRef = useRef(null);
    const [nomeImg, setNomeImg] = useState("Carregar Imagem");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Imagem selecionada:', file.name);
            setNomeImg(file.name);
            setSelectedFile(file);
        }
    };


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
                                    <p>DESCRIÇÃO</p>
                                    {erroDescricao && <span>{erroDescricao}</span>}
                                </div>
                                <textarea
                                    className={styles[inputValidDescricao]}
                                    placeholder="Digite uma descrição"
                                    value={descricao}
                                    onBlur={handleDescricaoBlur}
                                    onChange={(e) => handleInputChange(e, setDescricao)}
                                />
                            </div>
                            <div className={styles["container-input"]}>
                                <div className={styles["info-up-inputs"]}>
                                    <p>FOTO</p>
                                    {erroFoto && <span>{erroFoto}</span>}
                                </div>
                                <button
                                    className={styles[inputValidFoto]}
                                    type="button"
                                    onClick={handleButtonClick}
                                >
                                    <svg
                                        aria-hidden="true"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeWidth="2"
                                            stroke="#ffffff"
                                            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            stroke="#ffffff"
                                            d="M17 15V18M17 21V18M17 18H14M17 18H20"
                                        />
                                    </svg>
                                    {nomeImg}
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                <div className={styles["part-url"]}>
                                {selectedFile && (
                                    <CloudinaryUploader
                                        file={selectedFile}
                                        onUploadComplete={(url) => {
                                            setFoto(url);
                                           
                                        }}
                                    />
                                )}
                                </div>
                               
                            </div>
                            <div className={styles["container-btn"]}>
                            <button className={styles["button-alterar"]} onClick={handleSave}> {botaoSalvar ? <img className={styles["gif-loading"]} src={Loading} alt="Loading" /> : "CADASTRAR"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default CadastroBarbeiro;
