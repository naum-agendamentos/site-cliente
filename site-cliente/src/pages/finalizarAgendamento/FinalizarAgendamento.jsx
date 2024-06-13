import React, { useRef, useState, useEffect } from "react";
import style from './FinalizarAgendamento.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import ImgBarra from '../../utils/assets/barra-lateral.svg';
import Barber from '../../utils/assets/barbeiroAgendamento.png';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { format, addDays } from 'date-fns';
import { da, ptBR, tr } from 'date-fns/locale';


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";


const MeusAgendamentos = () => {
    const HOJE = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, "0") + '-' + new Date().getDate().toString().padStart(2, "0");
    const HORAATUAL = parseFloat(new Date().getHours() + "." + new Date().getMinutes());

    // var HORAATUAL = parseFloat(Date().getHours().toFixed(2));

    //Listar Barbeiro chamada
    const [cardsData, setCardsData] = useState([]);
    const queryServicoString = useParams();
    const queryAgendamentoString = useParams();
    const [agendamentoSelectedsJson, setAgendamentoJson] = useState([{}]);
    const [servicosSelectedsJson, setServicoJson] = useState([{}]);
    let agendamentoProibidoCalled = false;




    useEffect(() => {
        const paramsServico = new URLSearchParams(queryAgendamentoString);
        const jsonStr = paramsServico.get('servicos');
        if (jsonStr != null) {
            const jsonConvert = JSON.parse(jsonStr);
            if (jsonConvert != null) {
                // Verifica se é um JSON de agendamento ou de serviço com base em uma chave específica
                if (jsonConvert.dataHoraAgendamento != null) {
                    setAgendamentoJson(jsonConvert);
                    const servicosArray = jsonConvert.servicos.map(servico => ({
                        id: servico.id,
                        nome: servico.nomeServico,
                        tempo: servico.tempoServico,
                        preco: servico.preco
                    }));
                    setServicoJson(servicosArray);

                    setBarberSelected(jsonConvert.barbeiro.id);

                    avancarSlideBarber(jsonConvert.barbeiro.id);

                    recuperarAgendamentosExistentes(jsonConvert.barbeiro.id);
                    setDateDisabled(false);
                    setButtonsDisabled(false);
                    var dataCompleta = jsonConvert.dataHoraAgendamento.split("T");

                    setDaySelected(dataCompleta[0]);
                    setHourDisabled(false);
                    var hora = dataCompleta[1].split(":");
                    hora = parseFloat(hora[0] + "." + hora[1]).toFixed(2);

                    var dataAgendamento = new Date(dataCompleta[0] + " " + dataCompleta[1]);

                    var dataAtual = new Date();
                    var dataHoraAgendamento = new Date(dataCompleta[0] + " " + dataCompleta[1]);

                    var timeDiff = Math.abs(dataHoraAgendamento - dataAtual); // Subtrai as duas datas

                    // Converta a diferença de milissegundos em dias
                    var diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                    if (diffDays < 7) {
                        diaAgendamentoSlide(0);
                    }
                    else {
                        var soma = 0;

                        while (soma < diffDays) {
                            soma += 7;
                            if ((soma + 7) >= diffDays) {
                                diaAgendamentoSlide(soma);
                            }
                        }
                    }



                    agendamentoProibido(hora, dataCompleta, servicosArray, dataHoraAgendamento, jsonConvert.barbeiro.id, jsonConvert.id)



                    for (var i = 0; i < oppeningHour.length; i++) {
                        if (oppeningHour[i + 3] >= hora) {
                            horaAgendamentoSlide(i);
                            break;
                        }
                    }


                } else {
                    setServicoJson(jsonConvert);
                    console.log("SERVICO");
                }
            }
        }
    }, [queryAgendamentoString]);

    function avancarSlideBarber(idBarberSelected) {
        const options = {
            method: 'GET',
            url: 'http://localhost:8080/barbeiros/listar?idBarbearia=1',
            headers: {
                'User-Agent': 'insomnia/8.6.1',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        axios.request(options)
            .then(function (response) {
                var numBarbers = response.data.length;

                for (const i = 0; i < numBarbers; i++) {
                    console.log("Dentro do for " + i);
                    if (response.data[i].id < idBarberSelected) {
                        const nextSlide = currentSlideBarber + 1;
                        carouselBarberRef.current.goToSlide(nextSlide);
                        setCurrentSlideBarber(nextSlide);
                    }
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function agendamentoProibido(hora, dataCompleta, servicosArray, dataHoraAgendamentoDaVez, barbeiro, idAgendamento) {

        if (!agendamentoProibidoCalled) {
            const options = {
                method: 'GET',
                url: `http://localhost:8080/agendamentos/barbeiro/${barbeiro}`,
                headers: {
                    'User-Agent': 'insomnia/8.6.1',
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            };

            axios.request(options)
                .then(function (response) {
                    var retornados = response.data;
                    var datasOcupadas = [];
                    for (const agendamento of retornados) {
                        var dataAgendamentoExistente = agendamento.dataHoraAgendamento.split("T");
                        var dataHoraAgendamentoExistente = new Date(dataAgendamentoExistente[0] + " " + dataAgendamentoExistente[1]);

                        if (dataAgendamentoExistente[0] == dataCompleta[0] && agendamento.id != idAgendamento) {

                            for (const servico of agendamento.servicos) {

                                var dataAgendamentoConvertida = parseFloat(dataHoraAgendamentoExistente.getHours() + "." + dataHoraAgendamentoExistente.getMinutes());
                                var condicao = servico.tempoServico / 30;

                                if (condicao == 1) {

                                    dataHoraAgendamentoExistente.setMinutes(dataHoraAgendamentoExistente.getMinutes() + servico.tempoServico);
                                    dataAgendamentoConvertida = parseFloat(dataHoraAgendamentoExistente.getHours() + "." + dataHoraAgendamentoExistente.getMinutes());

                                    datasOcupadas.push(dataAgendamentoConvertida);
                                }
                                else {
                                    while (condicao > 0) {
                                        dataHoraAgendamentoExistente.setMinutes(dataHoraAgendamentoExistente.getMinutes() + 30);
                                        condicao--;
                                        dataAgendamentoConvertida = parseFloat(dataHoraAgendamentoExistente.getHours() + "." + dataHoraAgendamentoExistente.getMinutes());
                                        datasOcupadas.push(dataAgendamentoConvertida);

                                    }
                                }
                            }



                        }

                    }
                    for (const servico of servicosArray) {

                        var condicao = servico.tempo / 30;

                        while (condicao >= 1) {


                            dataHoraAgendamentoDaVez.setMinutes(dataHoraAgendamentoDaVez.getMinutes() + 30);
                            dataAgendamentoConvertida = parseFloat(dataHoraAgendamentoDaVez.getHours() + "." + dataHoraAgendamentoDaVez.getMinutes());


                            if (datasOcupadas.includes(dataAgendamentoConvertida)) {
                                setHourSelected(null);
                                setButtonsDisabled(true);

                                if (!agendamentoProibidoCalled) {
                                    agendamentoProibidoCalled = true;
                                    return toast.warning("Selecione um novo horário com disponibilidade");
                                }
                            }

                            condicao--;
                        }

                    }

                    if (!agendamentoProibidoCalled) {
                        setHourSelected(hora);
                    }

                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }

    function recuperarValorBarbeiro() {
        const options = {
            method: 'GET',
            url: 'http://localhost:8080/barbeiros/listar?idBarbearia=1',
            headers: {
                'User-Agent': 'insomnia/8.6.1',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        axios.request(options)
            .then(function (response) {
                const { data } = response;
                if (data.length > 0) {
                    // Armazena o ID da barbearia do primeiro barbeiro na sessão
                    sessionStorage.setItem("idBarbearia", data[0].barbearia.id);
                } else {
                    console.error("A resposta da API está vazia");
                }
                // Atualiza o estado cardsData com os dados recebidos da API
                setCardsData(response.data);
                return response.data.length;
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    useEffect(() => {
        recuperarValorBarbeiro();
    }, [])


    const navigate = useNavigate();
    const cancelar = () => {
        const urlServicos = encodeURIComponent(JSON.stringify(servicosSelectedsJson));
        console.log("Cancelar " + urlServicos)
        if (agendamentoSelectedsJson.length <= 1) {
            navigate(`/agendanento-horario/${urlServicos}`);
        }
        else {
            navigate(`/meus-agendamentos`);
        }
    };

    const editarServico = () => {
        const urlServicos = encodeURIComponent(JSON.stringify(agendamentoSelectedsJson));

        navigate(`/agendanento-horario/${urlServicos}`);

    };

    const [barberSelected, setBarberSelected] = useState(0);
    const [agendamentosExistentes, setAgendaementosExistentes] = useState();

    function recuperarAgendamentosExistentes(idBarber) {
        const options = {
            method: 'GET',
            url: `http://localhost:8080/agendamentos/barbeiro/${idBarber}`,
            headers: {
                'User-Agent': 'insomnia/8.6.1',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        axios.request(options)
            .then(function (response) {
                setAgendaementosExistentes(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    const buttonBarber = (idBarber) => {
        voltarSlide();
        setDateDisabled(false);
        setHourSelected(null);
        setButtonsDisabled(true);
        console.log("BARBEIRO ID: " + idBarber);
        setBarberSelected(idBarber);
        recuperarAgendamentosExistentes(idBarber);
    };


    const [isDateDisabled, setDateDisabled] = useState(true);
    const [isHourDisabled, setHourDisabled] = useState(true);
    const [daySelected, setDaySelected] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(true);
    const matrizHorariosAgendados = [];

    //DATE***********************************************************

    const buttonDay = (indexDay, dataCompleta) => {
        setSomaHour(false);
        voltarSlide();
        setButtonsDisabled(true);
        setDaySelected(dataCompleta);
        setHourSelected(null);
        setHourDisabled(false);
    }

    var horariosProibidos = [];
    function verificarHoraDisabled(hour) {
        if (agendamentoSelectedsJson.length <= 1) {
            if (agendamentosExistentes != null && daySelected != null) {
                for (const agendamento of agendamentosExistentes) {
                    const diaHoraAgendamento = agendamento.dataHoraAgendamento.split("T");
                    if (diaHoraAgendamento[0] == daySelected) {
                        const horarioReservado = diaHoraAgendamento[1].split(":");
                        const horarioReservadoConvertidoInicio = parseFloat(horarioReservado[0] + "." + horarioReservado[1]);

                        horariosProibidos.push(horarioReservadoConvertidoInicio);
                        var soma = 0;
                        // var somaTempoServicoReservado = 0;
                        const dataAumentada = new Date(agendamento.dataHoraAgendamento);
                        for (const servico of agendamento.servicos) {
                            var condicao = servico.tempoServico / 30;
                            while (condicao > 0) {
                                const horarioConvertidoSoma = parseFloat(dataAumentada.getHours() + "." + dataAumentada.getMinutes());
                                horariosProibidos.push(horarioConvertidoSoma);
                                dataAumentada.setMinutes(dataAumentada.getMinutes() + 30);
                                condicao--;
                            }
                        }

                    }


                }
            }
        }
        else {

            if (agendamentosExistentes != null && daySelected != null) {
                for (const agendamento of agendamentosExistentes) {
                    const diaHoraAgendamento = agendamento.dataHoraAgendamento.split("T");
                    if (diaHoraAgendamento[0] == daySelected) {
                        const horarioReservado = diaHoraAgendamento[1].split(":");
                        const horarioReservadoConvertidoInicio = parseFloat(horarioReservado[0] + "." + horarioReservado[1]);


                        var dataCompleta = agendamentoSelectedsJson.dataHoraAgendamento.split("T");
                        var hora = dataCompleta[1].split(":");
                        hora = parseFloat(hora[0] + "." + hora[1]);
                        if (hora != horarioReservadoConvertidoInicio) {

                            horariosProibidos.push(horarioReservadoConvertidoInicio);
                            var soma = 0;
                            // var somaTempoServicoReservado = 0;
                            const dataAumentada = new Date(agendamento.dataHoraAgendamento);
                            for (const servico of agendamento.servicos) {
                                var condicao = servico.tempoServico / 30;
                                while (condicao > 0) {
                                    const horarioConvertidoSoma = parseFloat(dataAumentada.getHours() + "." + dataAumentada.getMinutes());
                                    horariosProibidos.push(horarioConvertidoSoma);
                                    dataAumentada.setMinutes(dataAumentada.getMinutes() + 30);
                                    condicao--;
                                }
                            }
                        }

                    }

                }
            }
        }
        return horariosProibidos.includes(hour);
    }


    const gerarProximosDias = (dias) => {
        const hoje = new Date();
        const proximosDias = [];

        for (let i = 0; i < dias; i++) {
            const data = addDays(hoje, i);
            const diaSemanaAbreviado = format(data, 'EEE', { locale: ptBR });
            //   console.log("DIAS ABREVIADO "+diaSemanaAbreviado)
            const dia = format(data, 'dd');
            const mes = format(data, 'MM');
            const ano = format(data, 'yyyy');
            proximosDias.push({ diaSemanaAbreviado, dia, mes, ano, data });
            // console.log("ESSE É O ÚLTIMO DIA DO VETOR: "+proximosDias[proximosDias.length - 1].data)
        }
        return proximosDias;
    };


    //HOURS***********************************************************
    const oppeningHour = [8, 8.30, 9, 9.30, 10, 10.30, 11, 11.30, 12, 12.30, 13, 13.30, 14, 14.30, 15, 15.30, 16, 16.30, 17, 17.30, 18, 18.30, 19, 19.30]; //horário funcionamento 

    const [hourSelected, setHourSelected] = useState(null);
    const buttonHour = (value) => {
        var horasSelecionadas = [];

        var hour = parseFloat(value).toFixed(2);
        var horaMinutosFormatado = hour.replace(".", ":");

        var dataServicoEscolhida = new Date(daySelected + " " + horaMinutosFormatado + ":00");
        for (var i = 0; i < servicosSelectedsJson.length; i++) {
            dataServicoEscolhida.setMinutes(dataServicoEscolhida.getMinutes() + servicosSelectedsJson[i].tempo);

            const dataServicoEscolhidaConvertida = parseFloat(dataServicoEscolhida.getHours() + "." + dataServicoEscolhida.getMinutes());


            if (horariosProibidos.includes(dataServicoEscolhidaConvertida)) {

                const dataEscolhidaVerificacaoHorarioFloat = dataServicoEscolhidaConvertida.toFixed(2);
                const dataEscolhidaVerificacaoReplace = dataEscolhidaVerificacaoHorarioFloat.replace(".", ":");


                const dataEscolhidaVerificacaoHorario = new Date(daySelected + " " + dataEscolhidaVerificacaoReplace + ":00");

                dataEscolhidaVerificacaoHorario.setMinutes(dataEscolhidaVerificacaoHorario.getMinutes() - 30);

                const convercaoDataEscolhidaVerificacao = parseFloat(dataEscolhidaVerificacaoHorario.getHours() + "." + dataEscolhidaVerificacaoHorario.getMinutes());


                if (i != (servicosSelectedsJson.length - 1) || horariosProibidos.includes(convercaoDataEscolhidaVerificacao)) {
                    console.log("HORA PROIBIDAS " + horariosProibidos);
                    return toast.warning("Selecione um horário que tenha a disponibilidade de " + somaTempoServico() + " minutos");

                }
            }
        }

        dataServicoEscolhida = new Date(daySelected + " " + horaMinutosFormatado + ":00");
        var dataEscolhidaConvertida = parseFloat(dataServicoEscolhida.getHours() + "." + dataServicoEscolhida.getMinutes());
        horasSelecionadas.push(dataEscolhidaConvertida.toFixed(2));

        for (const service of servicosSelectedsJson) {
            dataServicoEscolhida.setMinutes(dataServicoEscolhida.getMinutes() + service.tempo);
            dataEscolhidaConvertida = parseFloat(dataServicoEscolhida.getHours() + "." + dataServicoEscolhida.getMinutes());

            // Cria uma cópia do objeto dataServicoEscolhida antes de modificar os minutos
            var verificaHorario = new Date(dataServicoEscolhida);
            verificaHorario.setMinutes(verificaHorario.getMinutes() - 30);

            var verificaHorarioConvertido = parseFloat(verificaHorario.getHours() + "." + verificaHorario.getMinutes());
            if (!oppeningHour.includes(dataEscolhidaConvertida) && !oppeningHour.includes(verificaHorarioConvertido)) {
                return toast.warning("Selecione um horário que tenha a disponibilidade de " + somaTempoServico() + " minutos");
            }
            horasSelecionadas.push(dataEscolhidaConvertida.toFixed(2));
        }

        if (horasSelecionadas.length != 0 && horariosProibidos.some(num => num > horasSelecionadas[0] && num < horasSelecionadas[horasSelecionadas.length - 1])) {
            return toast.warning("Selecione um horário que tenha a disponibilidade de " + somaTempoServico() + " minutos");
        }


        console.log("horasSelecionadas " + horasSelecionadas);
        setHourSelected(hour);
        setButtonsDisabled(false);
    }

    function verificarHoraHabilited(value) {
        if (hourSelected != null) {
            var horasSelecionadas = [];

            var horaMinutosFormatado = hourSelected.replace(".", ":");

            var dataServicoEscolhida = new Date(daySelected + " " + horaMinutosFormatado + ":00")

            dataServicoEscolhida = new Date(daySelected + " " + horaMinutosFormatado + ":00");
            var dataEscolhidaConvertida = parseFloat(dataServicoEscolhida.getHours() + "." + dataServicoEscolhida.getMinutes());
            horasSelecionadas.push(dataEscolhidaConvertida.toFixed(2));
            for (const service of servicosSelectedsJson) {
                dataServicoEscolhida.setMinutes(dataServicoEscolhida.getMinutes() + service.tempo);
                dataEscolhidaConvertida = parseFloat(dataServicoEscolhida.getHours() + "." + dataServicoEscolhida.getMinutes());
                horasSelecionadas.push(dataEscolhidaConvertida.toFixed(2));
            }


            if (parseFloat(parseFloat(value).toFixed(2)) >= parseFloat(horasSelecionadas[0]) && parseFloat(parseFloat(value).toFixed(2)) < parseFloat(horasSelecionadas[horasSelecionadas.length - 1])) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }


    function somaTempoServico() {
        var soma = 0;

        for (const servico of servicosSelectedsJson) {
            soma += servico.tempo;
        }
        console.log("Tempo de servico " + soma);

        return soma;
    }




    //CAROUSEL***********************************************************
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 7
        }
    };



    const carouselRefDays = useRef(null);

    const [currentSlideDays, setCurrentSlideDays] = useState(0);

    function voltarSlide() {
        console.log("VOLTARR SLIDEER : " + currentSlideHours);
        if (carouselRefHours.current && currentSlideHours >= 3) { //verifica se já está no primeiro slide
            //const previousSlide = currentSlideHours - currentSlideHours;
            carouselRefHours.current.goToSlide(0);
            setCurrentSlideHours(0);
        }


    }


    const goToNext7SlidesDays = () => {
        if (carouselRefDays.current && currentSlideDays < 53) { //verifica se já está no último slide
            const nextSlide = currentSlideDays + 7;
            carouselRefDays.current.goToSlide(nextSlide);
            setCurrentSlideDays(nextSlide);
        }
    };



    function diaAgendamentoSlide(diferencaDias) {
        console.log();
        if (carouselRefDays.current && currentSlideDays < 53) { //verifica se já está no último slide
            const nextSlide = currentSlideDays + diferencaDias;
            carouselRefDays.current.goToSlide(nextSlide);
            setCurrentSlideDays(nextSlide);
        }
    }

    const goToPrevious7SlidesDays = () => {
        if (carouselRefDays.current && currentSlideDays >= 7) { //verifica se já está no primeiro slide
            const previousSlide = currentSlideDays - 7;
            carouselRefDays.current.goToSlide(previousSlide);
            setCurrentSlideDays(previousSlide);
        }
    };

    const responsiveBarber = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        }
    };
    const goToPrevious3SlidesBarber = () => {
        if (carouselBarberRef.current && currentSlideBarber >= 3) { // Verifica se não está no primeiro slide
            const previousSlide = currentSlideBarber - 3;
            carouselBarberRef.current.goToSlide(previousSlide);
            setCurrentSlideBarber(previousSlide);
        }
    };

    const goToNext3SlidesBarber = () => {
        if (carouselBarberRef.current && currentSlideBarber + 3 < cardsData.length) { // Verifica se não está no último slide
            const nextSlide = currentSlideBarber + 3;
            carouselBarberRef.current.goToSlide(nextSlide);
            setCurrentSlideBarber(nextSlide);
        }
    };

    const carouselBarberRef = useRef(null);
    const [currentSlideBarber, setCurrentSlideBarber] = useState(0);




    const carouselRefHours = useRef(null);

    const [currentSlideHours, setCurrentSlideHours] = useState(0);

    const goToNext7SlidesHours = () => {
        if (carouselRefHours.current && currentSlideHours < 14) { //verifica se já está no último slide
            setSomaHour(false);
            const nextSlide = currentSlideHours + 6;
            carouselRefHours.current.goToSlide(nextSlide);
            setCurrentSlideHours(nextSlide);
        }
    };

    function horaAgendamentoSlide(diferencaHora) {
        if (carouselRefHours.current && currentSlideHours < 14) { //verifica se já está no último slide
            const nextSlide = currentSlideHours + diferencaHora;
            carouselRefHours.current.goToSlide(nextSlide);
            setCurrentSlideHours(nextSlide);
        }
    }

    const goToPrevious7SlidesHours = () => {
        console.log("VOLTEEEI 1 : " + currentSlideHours);
        if (carouselRefHours.current && currentSlideHours >= 6 && somaHour != true) { //verifica se já está no primeiro slide
            console.log("VOLTEEEI 2");
            const previousSlide = currentSlideHours - 6;
            carouselRefHours.current.goToSlide(previousSlide);
            setCurrentSlideHours(previousSlide);
        }
    };

    function salvar() {
        var hora = hourSelected.replace(".", ":");
        var data = new Date(daySelected + " " + hora + ":00");

        let ano = data.getFullYear();
        let mes = (data.getMonth() + 1).toString().padStart(2, '0');
        let dia = data.getDate().toString().padStart(2, '0');
        let horas = data.getHours().toString().padStart(2, '0');
        let minutos = data.getMinutes().toString().padStart(2, '0');
        let segundos = data.getSeconds().toString().padStart(2, '0');

        let dataFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

        const idServicos = [];
        for (const service of servicosSelectedsJson) {
            idServicos.push(service.id);
        }

        console.log("Sericos " + idServicos)

        if (agendamentoSelectedsJson.length <= 1) {
            console.log("Barbeiro Id " + barberSelected);
            console.log("Cliente Id " + sessionStorage.getItem("idCliente"));
            console.log("Servicos Ids " + idServicos.toString());
            console.log("inicio " + dataFormatada);

            const options = {
                method: 'POST',
                url: `http://localhost:8080/agendamentos`,
                params: {
                    barbeiroId: barberSelected,
                    clienteId: sessionStorage.getItem("idCliente"),
                    servicoIds: idServicos.toString(),
                    inicio: dataFormatada
                },
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            };

            axios.request(options)
                .then(function (response) {
                    toast.success("Agendado com Sucesso!");
                    navigate(`/meus-agendamentos`);
                    console.log("Agendamento criado com sucesso:", response.data);
                })
                .catch(function (error) {
                    toast.error("Erro ao agendar, contate o administrador!");
                    console.error("Erro ao criar agendamento:", error);
                });
        }
        else {
            console.log("AGENDAMENTO SELECIONADO " + agendamentoSelectedsJson.id);
            const options = {
                method: 'PUT',
                url: `http://localhost:8080/agendamentos/${agendamentoSelectedsJson.id}`,
                params: {
                    barbeiroId: barberSelected,
                    clienteId: sessionStorage.getItem("idCliente"),
                    servicoIds: idServicos.toString(),
                    inicio: dataFormatada
                },
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            };

            axios.request(options)
                .then(function (response) {
                    toast.success("Agendamento Atualizado com sucesso!");
                    navigate(`/meus-agendamentos`);
                    console.log("Agendamento atualizado com sucesso:", response.data);
                })
                .catch(function (error) {
                    toast.error("Erro ao agendar, contate o administrador!");
                    console.error("Erro ao atualizar agendamento:", error);
                });
        }

    }

    function bloqueioHorasDataAlert() {
        toast.error("Não é possível selecionar um horário do passado!");
    }


    const [somaHour, setSomaHour] = useState(false);
    useEffect(() => {
        if (!somaHour) {
            if (daySelected === HOJE) {
                for (var i = 0; i < oppeningHour.length; i++) {
                    if (oppeningHour[i] > HORAATUAL) {
                        setSomaHour(true);
                        horaAgendamentoSlide(i);
                        console.log("CURRENTEEEEE : " + currentSlideHours);
                        break;
                    }
                }

            }

        }
    }, [daySelected])





    const dias = gerarProximosDias(60);
    return (
        <>
            <div className="borda-gradiente-left">
                <div className="borda-gradiente-right">
                    <div className={style["container"]}>
                        <div className={style["containerServicos"]}></div>
                        <NavBar />
                        <div className={style["container-barbers"]}>
                            <p className={style["monthday"]}>SELECIONE UM BARBEIRO</p>
                            <div className={style["subcontainer-barber"]}>
                                <div className={style["container-arrow"]}>
                                    <button className={cardsData.length <= 3 ? style["btn-invisible"] : style["btn-arrow"]} onClick={goToPrevious3SlidesBarber}>{'<'}</button>
                                </div>
                                <Carousel
                                    ref={carouselBarberRef}
                                    responsive={responsiveBarber}
                                    arrows={false}
                                    renderButtonGroupOutside={true}
                                    className={style["carousel-barber"]}
                                    afterChange={(previousSlide, { currentSlide }) => {
                                        setCurrentSlideBarber(currentSlide);
                                    }}
                                >
                                    {cardsData && cardsData.map((data, index) => (
                                        <div key={index} className={style["container-asset-barber-Name"]}>
                                            <img
                                                onClick={() => buttonBarber(data.id)}
                                                className={`${style["asset-barber"]} ${barberSelected === 0 ? '' :
                                                    barberSelected === data.id ? style.barberSelected : style.barberNotSelected}`}
                                                src={data.foto} alt=""
                                            />
                                            <p className={`${barberSelected === 0 ? style.nomeBarbeiro :
                                                barberSelected === data.id ? style.nomeBarbeiroSelecionado : style.nomeBarbeiroNaoSelecionado}`}
                                            >
                                                {data.nome.slice(0, 14) + "..."}
                                            </p>
                                        </div>
                                    ))}
                                </Carousel>
                                <div className={style["container-arrow"]}>
                                    <button className={cardsData.length <= 3 ? style["btn-invisible"] : style["btn-arrow"]} onClick={goToNext3SlidesBarber}>{'>'}</button>
                                </div>
                            </div>
                        </div>
                        <div className={`${style["container-date"]} ${isDateDisabled ? style.daysDisabled : ''}`}>
                            <div className={style["container-monthday"]}>
                                <div className={style["subcontainer-monthday"]}>
                                    <p className={style["monthday"]}>SELECIONE UM DIA DO MÊS</p>
                                </div>
                            </div>
                            <div className={style["container-days"]}>
                                <div className={style["subcontainer-days"]}>
                                    <div className={style["container-arrow"]}>
                                        <button className={style["btn-arrow"]} onClick={goToPrevious7SlidesDays}>{'<'}</button>
                                    </div>
                                    <Carousel
                                        ref={carouselRefDays}
                                        responsive={responsive}
                                        arrows={false}
                                        renderButtonGroupOutside={true}
                                        className={style["container-box-days"]}
                                        afterChange={(previousSlide, { currentSlide }) => {
                                            setCurrentSlideDays(currentSlide);
                                        }}
                                    >
                                        {
                                            dias.map((data, index) => (
                                                <React.Fragment key={index}>
                                                    <button className={`
                                                ${daySelected === null ? style.boxDays :
                                                            daySelected === (data.ano + "-" + data.mes + "-" + data.dia) ? style.daySelected :
                                                                style.daysNotSelected
                                                        }
                                            `}
                                                        //
                                                        onClick={() => buttonDay(index, (data.ano + "-" + data.mes + "-" + data.dia))}>
                                                        <p>{index === 0 ? "Hoje" : data.diaSemanaAbreviado.slice(0, 3)}</p>
                                                        <p>{index === 0 ? "" : data.dia + "/" + data.mes}</p>
                                                    </button>
                                                </React.Fragment>
                                            ))
                                        }


                                    </Carousel >
                                    <div className={style["container-arrow"]}>
                                        <button className={style["btn-arrow"]} onClick={goToNext7SlidesDays}>{'>'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${isHourDisabled === true ? style.containerTimerDesabilited : ''}`}>
                            <div className={style["container-monthday"]}>
                                <div className={style["subcontainer-monthday"]}>
                                    <p className={style["monthday"]}>SELECIONE UM HORÁRIO DE INÍCIO</p>
                                </div>
                            </div>
                            <div className={style["container-days"]}>
                                <div className={style["subcontainer-days"]}>
                                    <div className={style["container-arrow"]}>
                                        <button className={style["btn-arrow"]} onClick={goToPrevious7SlidesHours}>{'<'}</button>
                                    </div>
                                    <Carousel
                                        ref={carouselRefHours}
                                        responsive={responsive}
                                        arrows={false}
                                        renderButtonGroupOutside={true}
                                        className={style["container-box-days"]}
                                        afterChange={(previousSlide, { currentSlide }) => {

                                            setCurrentSlideHours(currentSlide);

                                        }}
                                    >

                                        {

                                            oppeningHour.map((hour, index) => ( // Remova o segundo parâmetro "oppeningHour"
                                                <React.Fragment key={hour}> {/* Use oppeningHour como chave */}

                                                    <button disabled={verificarHoraDisabled(hour)} id={"idBtnHour" + index} className={`
                                                         ${
                                                        HOJE === daySelected && HORAATUAL >= hour ? style.daysNotSelected :
                                                        verificarHoraDisabled(hour) ? style.daysNotSelected :
                                                            verificarHoraHabilited(hour) ? style.daySelected :
                                                                style.boxDays


                                                        }
                                        `}
                                                        onClick={HOJE == daySelected && HORAATUAL >= hour ? () => bloqueioHorasDataAlert() : () => buttonHour(hour)}>
                                                        <p>{HOJE == daySelected && HORAATUAL >= hour ? "Bloqueado" : verificarHoraDisabled(hour) ? "Reservado" : hour.toFixed(2).replace(".", ":")}</p>
                                                    </button>
                                                </React.Fragment>
                                            ))
                                        }
                                    </Carousel>
                                    <div className={style["container-arrow"]}>
                                        <button className={style["btn-arrow"]} onClick={goToNext7SlidesHours}>{'>'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style["container-btns"]}>
                            <div className={`
                            ${agendamentoSelectedsJson.length <= 1 ? style["subcontainer-btns"] :
                                    style["subcontainer-btns-alterar"]
                                }`}>
                                <button className={`${buttonsDisabled === true ? style["btnSalvarDisabled"] : style["btnSalvar"]}`} onClick={salvar}>Salvar</button>
                                <button onClick={cancelar} className={style["btn-cancelar"]}>Cancelar</button>
                                <button onClick={editarServico} className={`${agendamentoSelectedsJson.length <= 1 ? style["btnAlterarServicosDisabled"] :
                                    style["btnEditar"]

                                    }`}>Editar Serviço</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeusAgendamentos;