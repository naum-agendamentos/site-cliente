//import api from "../../api";
import { toast } from "react-toastify";
import styles from './EditarServico.module.css';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import ImgBarra from '../../utils/assets/barra-lateral.svg'
import NavBar from '../../components/navbarBarbeiro/NavbarBarbeiro';
import axios from "axios";
import Loading from '../../utils/assets/loading-gif-transparent-10.gif';
import api from "../../api";

function EditarServico() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [tempoDuracao, setTempoDuracao] = useState('');

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    const [erroNome, setErroNome] = useState("");
    const [inputValidNome, setInputValidNome] = useState("input-form");

    const [erroPreco, setErroPreco] = useState("");
    const [inputValidPreco, setInputValidPreco] = useState("input-form");

    const [erroTempo, setErroTempo] = useState("");
    const [inputValidTempo, setInputValidTempo] = useState("input-form");

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

    const handlePrecoBlur = (event) => {
        const value = event.target.value;

        if (value === "" || value <= 0) {
            setErroPreco("Preço tem que ser maior que 0");
            setInputValidPreco("input-error");
        } else {
            setErroPreco("");
            setInputValidPreco("input-form");
        }
    }

    const handleTempoBlur = (event) => {
        const value = event.target.value;

        if (value === "" || value <= 0) {
            setErroTempo("Tempo tem que ser maior que 0");
            setInputValidTempo("input-error");
        } else {
            setErroTempo("");
            setInputValidTempo("input-form");
        }
    }

    const handleSave = async () => {
        handleNomeBlur({ target: { value: nome } });
        handlePrecoBlur({ target: { value: preco } });
        handleTempoBlur({ target: { value: tempoDuracao } });

        const todosCamposVazios = !nome && !preco && !tempoDuracao;
        if (erroNome || erroPreco || erroTempo || todosCamposVazios) {
            toast.error("Preencha todos os campos corretamente.");
        } else {
            setBotaoSalvar(true);
            const options = {
                method: 'PUT',
                url: `servicos/${id}`,
                params: { idBarbearia: sessionStorage.getItem("idBarbearia") },
                data: {
                    nomeServico: nome,
                    tempoServico: tempoDuracao,
                    preco: preco
                },
                headers: {
                    'User-Agent': 'insomnia/9.2.0',
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            };

            api.request(options)
                .then(function (response) {
                    toast.success('Dados editados com sucesso!');
                    console.log(response.data);
                    navigate("/lista-servico")
                })
                .catch((error) => {
                    setBotaoSalvar(false);
                    const mensagem = error.response ? error.response.data : error.message;
                    toast.error(`Ocorreu um erro ${mensagem}, por favor, tente novamente.`);
                });

        }
    };
    const handleCancel = () => {
        navigate('/lista-servico');
    };
    useEffect(() => {
        const options = {
            method: 'GET',
            url: `servicos/${id}`,
            params: { idBarbearia: sessionStorage.getItem("idBarbearia") },
            headers: {
                'User-Agent': 'insomnia/9.2.0',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        api.request(options)
            .then(function (response) {
                const { data } = response;
                const { nomeServico, tempoServico, preco } = data;
                setNome(nomeServico);
                setTempoDuracao(tempoServico);
                setPreco(preco);
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [id]);

    return (
        <div class="borda-gradiente-left">
            <div class="borda-gradiente-right">
                <div className={styles.container}>
                    <NavBar />
                    <div className={styles['container-title']}><h1 className={styles.title}>EDITAR SERVIÇO</h1></div>
                    <div className={styles['container-form']}>
                        <div className={styles['container-input']}>
                            <div className={styles["info-up-inputs"]}>
                                <p>NOME</p>
                                {erroNome && <span>{erroNome}</span>}
                            </div>
                            <input
                                className={styles[inputValidNome]}
                                type="text"
                                placeholder="Ex: Corte de cabelo"
                                value={nome}
                                onBlur={handleNomeBlur}
                                onChange={(e) => handleInputChange(e, setNome)}
                            />
                        </div>

                        <div className={styles['container-input']}>
                            <div className={styles["info-up-inputs"]}>
                                <p>TEMPO DE DURAÇÃO</p>
                                {erroTempo && <span>{erroTempo}</span>}
                            </div>
                            <select
                                className={styles[inputValidTempo]}
                                value={tempoDuracao}
                                onChange={(e) => setTempoDuracao(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="30">30 Minutos</option>
                                <option value="60">60 Minutos</option>
                                <option value="90">90 Minutos</option>
                            </select>
                        </div>{(e) => handleInputChange(e, setTempoDuracao)}

                        <div className={styles['container-input']}>
                            <div className={styles["info-up-inputs"]}>
                                <p>PREÇO</p>
                                {erroPreco && <span>{erroPreco}</span>}
                            </div>
                            <input
                                className={styles[inputValidPreco]}
                                type="decimal"
                                placeholder="R$ 40,00"
                                value={preco}
                                onBlur={handlePrecoBlur}
                                onChange={(e) => handleInputChange(e, setPreco)}
                            />
                            <div className={styles['tesoura']} ></div>
                        </div>

                        <div className={styles['container-btn']}>

                        <button className={styles["button-alterar"]} onClick={handleSave}> {botaoSalvar ? <img className={styles["gif-loading"]} src={Loading} alt="Loading" /> : "SALVAR"}</button>
                            <button className={styles["button-cancelar"]} type="button"
                                onClick={handleCancel}>
                                CANCELAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarServico;

