//import api from '../../api';
import { toast } from 'react-toastify';
import style from './EditarMeuDados.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import NavBar from '../../components/navbar-pos-login/NavBar';
//import ImgBarra from '../../utils/assets/barra-lateral.svg';
import axios from "axios";
import { useParams } from "react-router-dom";

const EditarMeusDados = () => {
    const navigate = useNavigate();
    //const { idUser } = { idUser: 1 };
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

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


    const validateFields = () => {
        handleNomeBlur({ target: { value: nome } });
        handleEmailBlur({ target: { value: email } });
        handleSenhaBlur({ target: { value: senha } });
        handleConfSenhaBlur({ target: { value: confirmarSenha } });
        handleTelefoneBlur({ target: { value: telefone } });

        return !(
            erroNome || erroEmail || erroSenha || erroConfSenha || erroTelefone
        );
    };

    const handleSave = async () => {

        if (validateFields() && nome && email && senha && confirmarSenha && telefone) {
            const options = {
                method: 'PUT',
                url: `https://api-rest-naum.azurewebsites.net/clientes/${id}`,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                },
                data: {
                    nome: nome,
                    email: email,
                    senha: senha,
                    telefone: telefone
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                toast.success('Dados editados com sucesso! Realize o login novamente');
                sessionStorage.setItem("editado", JSON.stringify(response.data));
                navigate(`/login`)
            }).catch((error) => {
                const status = error.response ? error.response.status : 'sem status';
                const mensagem = error.response ? error.response.data : error.message;
            
                if (status === 409) {
                    toast.error("Já existe um usuário com esse endereço de Email");
                } else {
                    toast.error(`Ocorreu um erro ${mensagem}, por favor, tente novamente.`);
                }
                
            });
        } else {
            toast.error("Preencha todos os campos corretamente.");
        }
    };

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api-rest-naum.azurewebsites.net/clientes/usuario`,
            params: { idUsuario: sessionStorage.getItem("userId") },
            headers: {
                'User-Agent': 'insomnia/8.6.1',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        axios.request(options)
            .then(async function () {

                const fetchData = async () => {
                    try {
                        const response = await axios.request({
                            method: 'GET',
                            url: `https://api-rest-naum.azurewebsites.net/clientes/usuario`,
                            params: { idUsuario: sessionStorage.getItem("userId") },
                            headers: options.headers
                        });
                        const { data } = response;
                        const { nome, email, telefone } = data;
                        setNome(nome);
                        setEmail(email);
                        setTelefone(telefone);
                    } catch (error) {
                        console.log("Erro ao buscar os detalhes do Cliente: ", error);
                    }
                };

                fetchData();
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [id]);

    const handleCancel = () => {
        navigate(`/meus-dados/${id}`)
    };

    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className="borda-gradiente-left">
                <div className="borda-gradiente-right">
                    <div className={style["container"]}>
                        <NavBar />
                        <div className={style["container-title"]}><h1 className={style["title"]}>EDITAR DADOS</h1></div>
                        <div className={style["container-form"]}>
                            <div className={style["container-input"]}>
                                <div className={style["info-up-inputs"]}>
                                    <p>EMAIL</p>
                                    {erroEmail && <span>{erroEmail}</span>}
                                </div>
                                <input
                                    className={style[inputValidEmail]}
                                    type="text"
                                    placeholder="usuario@gmail.com"
                                    value={email}
                                    onBlur={handleEmailBlur}
                                    onChange={(e) => handleInputChange(e, setEmail)}
                                />
                            </div>
                            <div className={style["container-input"]}>
                                <div className={style["info-up-inputs"]}>
                                    <p>NOME</p>
                                    {erroNome && <span>{erroNome}</span>}
                                </div>
                                <input
                                    className={style[inputValidNome]}
                                    type="text"
                                    placeholder="Ex: usuario"
                                    value={nome}
                                    onBlur={handleNomeBlur}
                                    onChange={(e) => handleInputChange(e, setNome)}
                                />
                            </div>
                            <div className={style["container-input"]}>
                                <div className={style["info-up-inputs"]}>
                                    <p>TELEFONE</p>
                                    {erroTelefone && <span>{erroTelefone}</span>}
                                </div>
                                <input
                                    className={style[inputValidTelefone]}
                                    type="text"
                                    placeholder="Ex: 11 999999999"
                                    maxLength={11}
                                    value={telefone}
                                    onBlur={handleTelefoneBlur}
                                    onChange={(e) => handleInputChange(e, setTelefone)}
                                />
                            </div>
                            <div className={style["container-input"]}>
                                <div className={style["info-up-inputs"]}>
                                    <p>SENHA</p>
                                    {erroSenha && <span>{erroSenha}</span>}
                                </div>
                                <input
                                    className={style[inputValidSenha]}
                                    type="password"
                                    placeholder="***********"
                                    value={senha}
                                    onBlur={handleSenhaBlur}
                                    onChange={(e) => handleInputChange(e, setSenha)}
                                />
                            </div>
                            <div className={style["container-input"]}>
                                <div className={style["info-up-inputs"]}>
                                    <p>CONFIRMAR SENHA</p>
                                    {erroConfSenha && <span>{erroConfSenha}</span>}
                                </div>
                                <input
                                    className={style[inputValidConfSenha]}
                                    type="password"
                                    placeholder="***********"
                                    value={confirmarSenha}
                                    onBlur={handleConfSenhaBlur}
                                    onChange={(e) => handleInputChange(e, setConfirmarSenha)}
                                />
                            </div>
                            <div className={style["container-btn"]}>
                                <button className={style["button-alterar"]} type="button"
                                    onClick={handleSave}>
                                    EDITAR
                                </button>
                                <button className={style["button-cancelar"]} type="button"
                                    onClick={handleCancel}>
                                    CANCELAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditarMeusDados;