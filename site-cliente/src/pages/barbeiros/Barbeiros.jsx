import React, { useState, useEffect } from "react";
import styles from "./Barbeiros.module.css";
import NavbarBarbeiros from "../../components/navbarBarbeiro/NavbarBarbeiro";
import CardBarbeiros from "../../components/cardBarbeiros/CardBarbeiros";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PilhaObj } from '../../utils/pilha';
import { toast } from "react-toastify";
import Loading from '../../utils/assets/loading-gif-transparent-10.gif';
import api from "../../api";

const Barbeiros = () => {
    const [cardsData, setCardsData] = useState([]);
    const pilha = new PilhaObj(10);
    const navigate = useNavigate();

    const [botaoSalvar, setBotaoSalvar] = useState(false);

    useEffect(() => {
        recuperarValorDoCard();

        if (sessionStorage.getItem("AtivarToast") === "ativar") {
            setTimeout(() => {
                toast.info("Para desfazer a ação clique em CTRL + Z");
            }, 1000);
        }

        sessionStorage.setItem("AtivarToast", "desativar");

        const serializedPilha = sessionStorage.getItem("pilha");
        if (serializedPilha) {
            pilha.deserialize(serializedPilha);
        }

        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                desfazerDelete();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const recuperarValorDoCard = () => {
        const options = {
            method: 'GET',
            url: 'barbeiros',
            headers: {
                'User-Agent': 'insomnia/8.6.1',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        api.request(options)
            .then(function (response) {
                const { data } = response;
                if (data.length > 0) {
                    sessionStorage.setItem("idBarbearia", data[0].barbearia.id);
                } else {
                    console.error("A resposta da API está vazia");
                }
                setCardsData(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const CadasBarbeiro = () => {
        navigate("/cadastro-barbeiro");
    };

    const ativarPilha = (id) => {
        if (pilha.getTopo() < pilha.tamanho) {
            pilha.push(id);
            sessionStorage.setItem("pilha", pilha.serialize());
        } else {
            toast.error("A pilha está cheia. Não é possível adicionar mais IDs.");
        }
    };

    const desfazerDelete = () => {
        const verificarVazio = pilha.isEmpty() ? null : pilha.pop();
        if (verificarVazio) {
            const options = {
                method: 'PUT',
                url: `barbeiros/reativar/${verificarVazio}`,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            };

            api.request(options).then(function (response) {
                console.log(response.data);
                toast.success("Barbeiro reativado!");
            }).catch(function (error) {
                console.error(error);
                toast.error("Erro ao reativar o Barbeiro");
            });
            sessionStorage.setItem("pilha", pilha.serialize());
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            toast.warning("Não há ações para desfazer");
        }
    };

    const handleDelete = (id) => {
        ativarPilha(id);
    };

    const gerarCsv = async () => {
        setBotaoSalvar(true);
        const options = {
            method: 'GET',
            url: 'barbeiros/gerar-csv-barbeiros',
            headers: {
                'User-Agent': 'insomnia/9.2.0',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            },
            responseType: 'blob' // Importante: indica que a resposta será um blob (binary data)
        };

        api.request(options)
            .then(function (response) {
                setBotaoSalvar(false);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'barbeiros.csv');
                document.body.appendChild(link);
                link.click();
                toast.success("CSV gerado com sucesso!");
            })
            .catch(function (error) {
                setBotaoSalvar(false);
                console.log(error);
                toast.error("Não foi possível gerar o CSV");
            });
    }

    return (
        <>
            <div className="borda-gradiente-left">
                <div className="borda-gradiente-right">
                    <NavbarBarbeiros />

                    <section className={styles["barbeiros"]} id="barbeiros">
                        <h1 className={styles["section-title"]}>BARBEIROS:</h1>
                        <div className={styles["add-barb"]}>
                            <div className={styles["botoes-up-right"]}>
                                <button className={styles["button-alterar"]} onClick={gerarCsv}> {botaoSalvar ? <img className={styles["gif-loading"]} src={Loading} alt="Loading" /> : "CSV"}</button>
                                <a onClick={CadasBarbeiro} href="#adicionar">+</a>
                            </div>
                        </div>
                    </section>
                    <div className={styles["content-barbeiros"]}>
                        {cardsData && cardsData.map((data, index) => (
                            <div key={index}>
                                <CardBarbeiros
                                    id={data.id}
                                    foto={data.foto}
                                    nome={data.nome}
                                    email={data.email}
                                    telefone={data.telefone}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Barbeiros;
