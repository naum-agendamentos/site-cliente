import React, { useEffect, useState } from "react";
import style from './AgendamentoHorario.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import Mapa from '../../utils/assets/MapsLocalizacao.png';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MeusAgendamentos = () => {
    const [servicos, setServicos] = useState();
    const [servicoSelectedsJson, setServicosSelecteds] = useState([{}]);
    const [agendamentoSelectedsJson, setAgendamentosSelecteds] = useState([{}]);
    const navigate = useNavigate();
    var listaServico = [];


    //quando retornar da finalizar agendamento recupera o valo em json dos servicos selecionados anteriormente
    const queryServicoString = useParams();

    useEffect(() => {
        const paramsServico = new URLSearchParams(queryServicoString);

        const jsonConvert = JSON.parse(paramsServico.get('servicos'));
        if(jsonConvert != null){
            if (jsonConvert.dataHoraAgendamento != null) {
                const servicosArray = jsonConvert.servicos.map(servico => ({
                    id: servico.id,
                    nome: servico.nomeServico,
                    tempo: servico.tempoServico,
                    preco: servico.preco
                }));
                setAgendamentosSelecteds(jsonConvert);
                setServicosSelecteds(servicosArray);
            }
            else{
                setServicosSelecteds(jsonConvert);

            }
        }
    }, [queryServicoString]);




    useEffect(() => {
        recuperarServicos();
    }, []);

    function recuperarServicos() {
        const options = {
            method: 'GET',
            url: 'https://api-rest-naum.azurewebsites.net/servicos?idBarbearia=1',
            headers: {
                'User-Agent': 'insomnia/8.6.1',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        axios.request(options)
            .then(function (response) {
                const { data } = response;
                if (data.length > 0) {
                    console.log("Servicos "+ data[0]);
                    sessionStorage.setItem("idBarbearia", data[0].barbearia.id);
                } else {
                    console.error("A resposta da API está vazia");
                }
                setServicos(data);
                // console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function servicosSelecteds(servico, isSelected) {
        if (isSelected) {
            listaServico.push({
                id: servico.id,
                nome: servico.nomeServico,
                tempo: servico.tempoServico,
                preco: servico.preco
            });
        } else {
            const indexRemovido = listaServico.findIndex(item => item.id === servico.id);
            if (indexRemovido !== -1) {
                listaServico.splice(indexRemovido, 1);
            }
        }
        console.log("servicos ", listaServico);
    }

    const finalizar = () => {
        if (listaServico.length === 0) {
            toast.warning("Selecione algum serviço para conseguir finalizar o agendamento");
        } else {
            if(agendamentoSelectedsJson.length <= 1){
                const listaServicoString = JSON.stringify(listaServico);
                navigate(`/finalizar-agendamento/${listaServicoString}`);
            }
            else{

                const novoAgendamento = {
                    ...agendamentoSelectedsJson,
                    servicos: listaServico.map(servico => ({
                        id: servico.id,
                        nomeServico: servico.nome,
                        preco: servico.preco,
                        tempoServico: servico.tempo
                    }))
                };
    
        

        

                navigate(`/finalizar-agendamento/${encodeURIComponent(JSON.stringify(novoAgendamento))}`);
            }

        }
    };

    function isServiceChecked(id) {
        if (servicoSelectedsJson != null) {
            for (const servico of servicoSelectedsJson) {

                if (servico.id === id) {
                    listaServico.push(servico);

                    console.log("Lista "+listaServico)
                    return true;
                }
            }
        }
        return false; // Retorna false se o serviço não for encontrado
    }
    




    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className="borda-gradiente-left">
                <div className="borda-gradiente-right">
                    <div className={style["container"]}>

                        <NavBar />
                        <div className={style["container-title"]}><h1 className={style["title"]}>SERVIÇOS</h1></div>
                        <div className={style["container-conteudo"]}>
                            <div className={style["container-subconteudo"]}>
                                <div className={style["container-left"]}>
                                    <div className={style["container-service"]}>
                                        {servicos && servicos.map((servico, index) => (
                                            <div key={servico.id} className={style["box-service"]}>
                                                <div className={style["container-conteudo-service"]}>
                                                    <div className={style["box-name-service"]}>
                                                        <p className={style["text-service"]}>{servico.nomeServico}</p>
                                                    </div>
                                                    <div className={style["container-money"]}>
                                                        <p className={style["text-service"]}>R$ {servico.preco.toFixed(2)}</p>
                                                    </div>
                                                    <div className={style["container-time"]}>
                                                        <p className={style["text-service"]}>{servico.tempoServico} min</p>
                                                    </div>
                                                    <div className={style["container-checkbox"]}>
                                                        <input id={servico.id} className={style["checkbox"]} type="checkbox"
                                                         defaultChecked={isServiceChecked(servico.id)}
                                                         onClick={(event) => {
                                                            if (event.target.checked) {
                                                                servicosSelecteds(servico, true);
                                                            } else {
                                                                servicosSelecteds(servico, false);
                                                            }
                                                        }} />

                                                        {/* { servico.id.target.checked = isServiceChecked(servico.id) ? true: false} */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <button onClick={finalizar} className={style["btn-finalizar-agendamento"]}>Finalizar Agendamento</button>
                                </div>
                                <div className={style["container-right"]}>
                                    <div className={style["container-funcionamento"]}>
                                        <div className={style["container-title-funcionamento"]}>
                                            <p className={style["title-funcionamento"]}>Horário de Funcionamento</p>
                                        </div>
                                        <div className={style["container-dayhour"]}>
                                            <p className={style["dayhour"]}>Segundo-Feira</p>
                                            <p className={style["dayhour"]}>8h as 20h</p>
                                        </div>
                                        <div className={style["container-dayhour"]}>
                                            <p className={style["dayhour"]}>Terça-Feira</p>
                                            <p className={style["dayhour"]}>8h as 20h</p>
                                        </div>
                                        <div className={style["container-dayhour"]}>
                                            <p className={style["dayhour"]}>Quarta-Feira</p>
                                            <p className={style["dayhour"]}>8h as 20h</p>
                                        </div>
                                        <div className={style["container-dayhour"]}>
                                            <p className={style["dayhour"]}>Quinta-Feira</p>
                                            <p className={style["dayhour"]}>8h as 20h</p>
                                        </div>
                                        <div className={style["container-dayhour"]}>
                                            <p className={style["dayhour"]}>Sexta-Feira</p>
                                            <p className={style["dayhour"]}>8h as 20h</p>
                                        </div>
                                        <div className={style["container-dayhour"]}>
                                            <p className={style["dayhour"]}>Sábado</p>
                                            <p className={style["dayhour"]}>8h as 20h</p>
                                        </div>
                                        <div className={style["container-dayhour"]}>
                                            <p className={style["dayhour"]}>Domingo</p>
                                            <p className={style["dayhour"]}>8h as 20h</p>
                                        </div>

                                    </div>

                                    
                                    <iframe className={style["map"]} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1828.7215274025448!2d-46.403833!3d-23.552526000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce65a8f2ab6373%3A0x7f46e5f281cff8f3!2sBarbearia%20Tm!5e0!3m2!1spt-BR!2sbr!4v1717911257810!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Nossa localização"></iframe>
                                    
                                    <div className={style["container-title-map"]}>
                                        <p className={style["subtitle-map"]}>Nossa Localização: R. Castanho da Silva, 331 - Vila Abc</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
export default MeusAgendamentos;