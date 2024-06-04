import React, { useState, useEffect } from "react";
import style from './MeusAgendamentos.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
//import ImgBarra from '../../utils/assets/barra-lateral.svg';

const MeusAgendamentos = () => {
    const navigate = useNavigate()
    const [meusAgendamentos, setMeusAgendamentos] = useState();

    function formatarData(dataString) {
        const meses = [
            "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
            "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
        ];
    
        const diasSemana = [
            "DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", 
            "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"
        ];
    
        const data = new Date(dataString);
    
        const diaSemana = diasSemana[data.getUTCDay()];
        const dia = data.getUTCDate();
        const mes = meses[data.getUTCMonth()];
        const ano = data.getUTCFullYear();
    
        return `${diaSemana}, ${dia} DE ${mes} ${ano}`;
    }
    
    function somaServicos(agendamento){
        var soma = 0;
        for(const servico of agendamento.servicos){
            soma += servico.preco;
        }

        return soma.toFixed(2);
    }


    function calculoDataFim(agendamento) {
    var dataVetor = (agendamento.dataHoraAgendamento).split("T");

    var dataInicio = new Date(dataVetor[0] + " " + dataVetor[1]);
    var dataFim = new Date(dataVetor[0] + " " + dataVetor[1]);

    for (const servico of agendamento.servicos) {
        dataFim.setMinutes(dataFim.getMinutes() + servico.tempoServico);
    }

    function formatTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        return hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
    }

    return formatTime(dataInicio) + " às " + formatTime(dataFim);
}

    function recuperarAgendamentosClientes() {
        const options = {
            method: 'GET',
            url: `http://localhost:8080/agendamentos/cliente/${sessionStorage.getItem("userId")}`,
            headers: {
              'User-Agent': 'insomnia/8.6.1',
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        
        axios.request(options)
            .then(function (response) {
                // Atualiza o estado cardsData com os dados recebidos da API
                setMeusAgendamentos(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    useEffect(() => {
        recuperarAgendamentosClientes();
    }, [])
    

    const editar = (agendamento) => {
        const agendamentoJson = JSON.stringify(agendamento);
        navigate(`/finalizar-agendamento/${encodeURIComponent(agendamentoJson)}`);
    };

    function excluir(idAgendamento) {
        const options = {
            method: 'DELETE',
            url: `http://localhost:8080/agendamentos/${idAgendamento}`,
            headers: {
              'User-Agent': 'insomnia/8.6.1',
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        
        axios.request(options)
            .then(function (response) {
                // Atualiza o estado cardsData com os dados recebidos da API
                toast.success("Agendamento cancelado com sucesso!");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const cancelar = (agendamento) => {

        var dataAtual = new Date();
        var dataAgendamentoVetor = agendamento.dataHoraAgendamento.split("T");
        var dataAgendamento = new Date(dataAgendamentoVetor[0] + " " + dataAgendamentoVetor[1]);
    
  
        
        if(dataAgendamento.getDate() == dataAtual.getDate() && dataAgendamento.getMonth() == dataAtual.getMonth()){
            var diferencaMilissegundos = dataAgendamento - dataAtual;
        

            var diferencaHoras = diferencaMilissegundos / (1000 * 60 * 60); 
        
            console.log("Diferença de horas:", diferencaHoras);

            if(diferencaHoras >= 3){
                console.log("id Agendamento "+agendamento.id);
                excluir(agendamento.id);
                
            }
            else{
                toast.error("Só é possível cancelar com 3 horas de antecedência");
            }
            
        }
        else{
            excluir(agendamento.id);
        }
        
       
    };

    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className="borda-gradiente-left">
                <div className="borda-gradiente-right">
                    <div className={style["container"]}>
                        <NavBar />
                        <div className={style["container-title"]}><h1 className={style["title"]}>MEUS AGENDAMENTOS</h1></div>
                        <div className={style["container-conteudo"]}>
                            <div className={style["container-scroll"]}>

                            {meusAgendamentos && meusAgendamentos.map((agendamento, index) => (
                                <div className={style["container-box"]}>
                                    <div className={style["container-conteudo-box-Agendamento"]}>
                                        {/* <h1 className={style["title-agendamento"]}>SERVIÇOS RESERVADOS:</h1> */}
                                        <div className={style["container-metade-box"]}>
                                            <div className={style["box-title"]}>
                                                <h1 className={style["title-agendamento"]}>SERVIÇOS RESERVADOS:</h1>
                                                {agendamento.servicos && agendamento.servicos.map((servico) =>(
                                                    <p className={style["subtitle-agendamento"]}>{servico.nomeServico}</p>
                                                ))}
                                            </div>
                                            <div className={style["box-data"]}>
                                                <h1 className={style["data-agendamento"]}>{formatarData(agendamento.dataHoraAgendamento)}</h1>
                                            </div>
                                        </div>
                                        <div className={style["container-metade-box"]} id={style["container-hour"]}>
                                            <h1 className={style["data-agendamento"]} >{calculoDataFim(agendamento)}</h1>
                                        </div>
                                        <div className={style["container-metade-box"]} id={style["container-day-total"]}>                                   
                                                <p className={style["subtitle-agendamento"]}>Total a Pagar: R$ {somaServicos(agendamento)}</p>
                                            <div>
                                                <button onClick={() => cancelar(agendamento)} className={style["btn-delete"]}>Cancelar</button>
                                                <button onClick={() => editar(agendamento)} className={style["btn-edit"]}>Editar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                                
                              
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MeusAgendamentos;