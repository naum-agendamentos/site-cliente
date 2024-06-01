import React, { useRef,useState, useEffect } from "react";
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
    

    //Listar Barbeiro chamada
    const [cardsData, setCardsData] = useState();
    const queryServicoString = useParams();
    const [servicosSelectedsJson,setServicoJson] = useState([{}]);


    useEffect(() => {
        const paramsServico = new URLSearchParams(queryServicoString);

        const jsonConvert = JSON.parse(paramsServico.get('servicos'));
        setServicoJson(jsonConvert);
    },[queryServicoString]);
    
    
    function recuperarValorBarbeiro() {
        const options = {
            method: 'GET',
            url: 'http://localhost:8080/barbeiros',
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
        console.log("Cancelar "+urlServicos)

        navigate(`/agendanento-horario/${urlServicos}`);
    };


    const [barberSelected, setBarberSelected] = useState(0);
    const [agendamentosExistentes,setAgendaementosExistentes] = useState();

    function recuperarAgendamentosExistentes(idBarber) {
        console.log("ID BARBER "+idBarber);
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
        setDateDisabled(false);
        setBarberSelected(idBarber);
        recuperarAgendamentosExistentes(idBarber);
    };


    const [isDateDisabled, setDateDisabled] = useState(true);
    const [isHourDisabled, setHourDisabled] = useState(true);
    const [daySelected, setDaySelected] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(true);
    const matrizHorariosAgendados = [];

    //DATE***********************************************************

    const buttonDay = (indexDay,dataCompleta) => {
        voltarSlide();
        setButtonsDisabled(true);
        setDaySelected(dataCompleta);
        setHourSelected(null);
        setHourDisabled(false);
    }

    var horariosProibidos = [];
    function verificarHoraDisabled(hour){
        if(agendamentosExistentes != null && daySelected != null){
            for(const agendamento of agendamentosExistentes){
                console.log("AGENDAMENTO DA VEZ => "+agendamento);
                const diaHoraAgendamento = agendamento.dataHoraAgendamento.split("T");
                if(diaHoraAgendamento[0] == daySelected){
                    const horarioReservado = diaHoraAgendamento[1].split(":");
                    const horarioReservadoConvertidoInicio = parseFloat(horarioReservado[0] +"."+ horarioReservado[1]);
    
                    horariosProibidos.push(horarioReservadoConvertidoInicio);
                    var soma = 0;
                    // var somaTempoServicoReservado = 0;
                    const dataAumentada = new Date(agendamento.dataHoraAgendamento);
                    for(const servico of agendamento.servicos){
                        var condicao = servico.tempoServico / 30;
                        while(condicao > 0){
                            const horarioConvertidoSoma = parseFloat(dataAumentada.getHours() +"."+ dataAumentada.getMinutes());
                            horariosProibidos.push(horarioConvertidoSoma);
                            dataAumentada.setMinutes(dataAumentada.getMinutes() + 30);
                            condicao --    
                        }
                    }

                }

                // const dataHoraInicioeFim = [dataCompleta,horarioReservadoConvertidoInicio,horarioReservadoConvertidoFim];
                // matrizHorariosAgendados.push(dataHoraInicioeFim);
                // console.log("Tamanho da matriz " + matrizHorariosAgendados.length);
                
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
          proximosDias.push({ diaSemanaAbreviado, dia, mes,ano,data });
          // console.log("ESSE É O ÚLTIMO DIA DO VETOR: "+proximosDias[proximosDias.length - 1].data)
        }
        return proximosDias;
    };

   
    //HOURS***********************************************************
    const oppeningHour = [9,9.30,10,10.30,11,11.30,12,12.30,13,13.30,14,14.30,15,15.30,16,16.30,17,17.30]; //horário funcionamento 
    // const oppeningHour = [9,9.30,10,10.30,11,11.30,12];
    const [hourSelected, setHourSelected] = useState(null);
    const buttonHour = (value) => {
        var horasSelecionadas = [];

        var hour = parseFloat(value).toFixed(2);
        var horaMinutosFormatado = hour.replace(".",":");

        var dataServicoEscolhida = new Date(daySelected+" "+horaMinutosFormatado+":00");

        for(var i = 0; i < servicosSelectedsJson.length; i++ ){
            dataServicoEscolhida.setMinutes(dataServicoEscolhida.getMinutes() + servicosSelectedsJson[i].tempo);
            
            const dataServicoEscolhidaConvertida = parseFloat(dataServicoEscolhida.getHours() + "." + dataServicoEscolhida.getMinutes());


            if(horariosProibidos.includes(dataServicoEscolhidaConvertida)){  

                const dataEscolhidaVerificacaoHorarioFloat = dataServicoEscolhidaConvertida.toFixed(2);
                const dataEscolhidaVerificacaoReplace  =  dataEscolhidaVerificacaoHorarioFloat.replace(".",":");


                const dataEscolhidaVerificacaoHorario = new Date(daySelected+" "+dataEscolhidaVerificacaoReplace+":00");

                dataEscolhidaVerificacaoHorario.setMinutes(dataEscolhidaVerificacaoHorario.getMinutes() - 30);

                const convercaoDataEscolhidaVerificacao = parseFloat(dataEscolhidaVerificacaoHorario.getHours() + "."+dataEscolhidaVerificacaoHorario.getMinutes());


                if(i != (servicosSelectedsJson.length - 1) || horariosProibidos.includes(convercaoDataEscolhidaVerificacao)){
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
            if(!oppeningHour.includes(dataEscolhidaConvertida) && !oppeningHour.includes(verificaHorarioConvertido)){
                return toast.warning("Selecione um horário que tenha a disponibilidade de " + somaTempoServico() + " minutos");
            }
            horasSelecionadas.push(dataEscolhidaConvertida.toFixed(2));
        }

        if(horasSelecionadas.length != 0 && horariosProibidos.some(num => num > horasSelecionadas[0] && num < horasSelecionadas[horasSelecionadas.length - 1])){
            return toast.warning("Selecione um horário que tenha a disponibilidade de " + somaTempoServico() + " minutos");
        }

        
        console.log("horasSelecionadas "+horasSelecionadas);
        setHourSelected(hour);
        setButtonsDisabled(false);  
    }
    
        function verificarHoraHabilited(value){
            if(hourSelected != null){
                var horasSelecionadas = [];
        
                var horaMinutosFormatado = hourSelected.replace(".",":");
        
                var dataServicoEscolhida = new Date(daySelected+" "+horaMinutosFormatado+":00")
        
                dataServicoEscolhida = new Date(daySelected+" "+horaMinutosFormatado+":00");
                var dataEscolhidaConvertida = parseFloat(dataServicoEscolhida.getHours() + "." + dataServicoEscolhida.getMinutes());
                horasSelecionadas.push(dataEscolhidaConvertida.toFixed(2));
                for(const service of servicosSelectedsJson){
                    dataServicoEscolhida.setMinutes(dataServicoEscolhida.getMinutes() + service.tempo);
                    dataEscolhidaConvertida = parseFloat(dataServicoEscolhida.getHours() + "." + dataServicoEscolhida.getMinutes());
                    horasSelecionadas.push(dataEscolhidaConvertida.toFixed(2));
                }


            if(parseFloat(parseFloat(value).toFixed(2)) >= parseFloat(horasSelecionadas[0]) && parseFloat(parseFloat(value).toFixed(2)) < parseFloat(horasSelecionadas[horasSelecionadas.length - 1])){
                return true;
            }
            else{
                return false;
            }
        }
        return false;
    }

    
    function somaTempoServico(){
        var soma = 0;

        for(const servico of servicosSelectedsJson){
            soma += servico.tempo;
        }
        console.log("Tempo de servico "+soma);

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

    function voltarSlide(){
        console.log("curren");
        if (carouselRefHours.current && currentSlideHours >= 3) { //verifica se já está no primeiro slide
            const previousSlide = currentSlideHours - currentSlideHours;
            carouselRefHours.current.goToSlide(previousSlide);
            setCurrentSlideHours(previousSlide);
        }
        
    }

    const goToNext7SlidesDays = () => {
        if (carouselRefDays.current && currentSlideDays < 53) { //verifica se já está no último slide
            const nextSlide = currentSlideDays + 7;
            carouselRefDays.current.goToSlide(nextSlide);
            setCurrentSlideDays(nextSlide);
        }
    };

    const goToPrevious7SlidesDays = () => {
        if (carouselRefDays.current && currentSlideDays >= 7) { //verifica se já está no primeiro slide
            const previousSlide = currentSlideDays - 7;
            carouselRefDays.current.goToSlide(previousSlide);
            setCurrentSlideDays(previousSlide);
        }
    };



    const carouselRefHours = useRef(null);

    const [currentSlideHours, setCurrentSlideHours] = useState(0);

    const goToNext7SlidesHours = () => {
        if (carouselRefHours.current && currentSlideHours < 14) { //verifica se já está no último slide
            const nextSlide = currentSlideHours + 3;
            carouselRefHours.current.goToSlide(nextSlide);
            setCurrentSlideHours(nextSlide);
        }
    };

    const goToPrevious7SlidesHours = () => {
        if (carouselRefHours.current && currentSlideHours >= 3) { //verifica se já está no primeiro slide
            const previousSlide = currentSlideHours - 3;
            carouselRefHours.current.goToSlide(previousSlide);
            setCurrentSlideHours(previousSlide);
        }
    };

    function salvar() {
        var hora = hourSelected;
        hora = hora.replace(".", ":");
        var data = new Date(daySelected + " " + hora + ":00");
    
        // Formatar a data no formato desejado
        var dataFormatada = data.getFullYear() + "-" +
                            ("0" + (data.getMonth() + 1)).slice(-2) + "-" +
                            ("0" + data.getDate()).slice(-2) + "T" +
                            ("0" + data.getHours()).slice(-2) + ":" +
                            ("0" + data.getMinutes()).slice(-2) + ":" +
                            ("0" + data.getSeconds()).slice(-2);
    
        const idServicos = [];
        for (const service of servicosSelectedsJson) {
            idServicos.push(service.id);
        }
    
        const options = {
            method: 'POST',
            url: `http://localhost:8080/agendamentos?barbeiroId=${barberSelected}&clienteId=${sessionStorage.getItem("userId")}&servicoIds=${idServicos}&inicio=${encodeURIComponent(dataFormatada)}`,
            headers: {
                'User-Agent': 'insomnia/8.6.1',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        };
    
        axios.request(options)
            .then(function (response) {
                toast.success("Agendado com Sucesso!");
                console.log("Agendamento criado com sucesso:", response.data);
            })
            .catch(function (error) {
                console.error("Erro ao criar agendamento:", error);
            });
    }
    

    const dias = gerarProximosDias(60);
    return (
        <>
            <div className={style["container"]}>
                <img src={ImgBarra} className={style["barraLeft"]} alt="" />
                <img src={ImgBarra} className={style["barraRight"]} alt="" />
                <NavBar />
                <div className={style["container-barbers"]}>
                    <div className={style["subcontainer-barber"]}>
                        {cardsData && cardsData.map((data, index) => (
                            <img key={index} onClick={() => buttonBarber(data.id)} className={`${style["asset-barber"]} 
                            ${barberSelected === 0 ? '' :
                            barberSelected === data.id ? style.barberSelected :
                            style.barberNotSelected}`} 
                            src={data.foto} alt="" 
                            />
                        ))}
                        
                    </div>
                </div>
                <div className={`${style["container-date"]} ${isDateDisabled ? style.daysDisabled : ''}`}>
                    <div className={style["container-monthday"]}>
                        <div className={style["subcontainer-monthday"]}>
                            <p className={style["monthday"]}>MÊS DIA</p>
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
                                    dias.map((data,index) => (
                                        <React.Fragment key={index}>
                                            <button className={`
                                                ${
                                                    daySelected === null ? style.boxDays:
                                                    daySelected === (data.ano+"-"+data.mes+"-"+data.dia) ? style.daySelected:
                                                    style.daysNotSelected
                                                }
                                            `} 
                                                //
                                                onClick={() => buttonDay(index,(data.ano+"-"+data.mes+"-"+data.dia))}>
                                                <p>{data.diaSemanaAbreviado.slice(0,3)}</p>
                                                <p>{data.dia}/{data.mes}</p>
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
                <div className={`${isHourDisabled === true ? style.containerTimerDesabilited:''}`}>
                    <div className={style["container-monthday"]}>
                        <div className={style["subcontainer-monthday"]}>
                            <p className={style["monthday"]}>HORÁRIO DE INÍCIO</p>
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
                                    // const [data, hora] = dataHoraAgendamento.split('T');

                                    // // Dividir a data nos componentes ano, mês e dia
                                    // const [ano, mes, dia] = data.split('-');
                                    oppeningHour.map((hour,index) => ( // Remova o segundo parâmetro "oppeningHour"
                                    <React.Fragment key={hour}> {/* Use oppeningHour como chave */}
                                        <button disabled={verificarHoraDisabled(hour)} id={"idBtnHour"+index}className={`
                                            ${
                                                verificarHoraDisabled(hour) ? style.daysNotSelected:   
                                                verificarHoraHabilited(hour) ? style.daySelected:
                                                style.boxDays
                                                
                                                
                                            }
                                        `} 
                                            onClick={ () => buttonHour(hour)}> 
                                            <p>{ verificarHoraDisabled(hour) ? "Reservado" : hour.toFixed(2).replace(".",":")}</p>
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
                        <div className={style["subcontainer-btns"]}>
                            <button className={`${ buttonsDisabled === true ? style["btnSalvarDisabled"] : style["btnSalvar"]}`} onClick={salvar}>Salvar</button>
                            <button onClick={cancelar} className={style["btn-cancelar"]}>Cancelar</button>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default MeusAgendamentos;