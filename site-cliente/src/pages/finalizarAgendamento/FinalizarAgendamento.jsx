import React, { useRef,useState, useEffect } from "react";
import style from './FinalizarAgendamento.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import ImgBarra from '../../utils/assets/barra-lateral.svg';
import Barber from '../../utils/assets/barbeiroAgendamento.png';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { format, addDays } from 'date-fns';
import { da, ptBR } from 'date-fns/locale';


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


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


    const [isDateDisabled, setDateDisabled] = useState(true);
    const [barberSelected, setBarberSelected] = useState(0);
    const [isHourDisabled, setHourDisabled] = useState(true);
    const [daySelected, setDaySelected] = useState(null);
    const [hourSelected, setHourSelected] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(true);
    

    //DATE***********************************************************
    const buttonBarber = (idBarber) => {
        setDateDisabled(false);
        setBarberSelected(idBarber);
    };

    const buttonDay = (day) => {
        setDaySelected(day)
        setHourDisabled(false)
        console.log("dayselected: "+daySelected)
        console.log("Day enviado: "+ day)
        console.log("DIA DA VEZ: "+daySelected === day)
    }

    const buttonHour = (hour) => {
        setHourSelected(hour)
        setButtonsDisabled(false)
    }
    

    const gerarProximosDias = (dias) => {
        const hoje = new Date();
        const proximosDias = [];
    
        for (let i = 0; i < dias; i++) {
          const data = addDays(hoje, i);
          const diaSemanaAbreviado = format(data, 'EEE', { locale: ptBR });
        //   console.log("DIAS ABREVIADO "+diaSemanaAbreviado)
          const diaMes = format(data, 'dd');
          const mes = format(data, 'MM');
          proximosDias.push({ diaSemanaAbreviado, mes,diaMes,data });
        // console.log("ESSE É O ÚLTIMO DIA DO VETOR: "+proximosDias[proximosDias.length - 1].data)
        }
    
        return proximosDias;
      };

    //HOURS***********************************************************
    const oppeningHour = [9,9.30,10,10.30,11,11.30,12,12.30,14,14.30,15,15.30,16,16.30,17,17.30]; //horário funcionamento 
    

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
                                    dias.map((dia,index) => (
                                        <React.Fragment key={index}>
                                            <button className={`
                                                ${
                                                    daySelected === null ? style.boxDays:
                                                    daySelected === index ? style.daySelected:
                                                    style.daysNotSelected
                                                }
                                            `} 
                                                onClick={() => buttonDay(index)}>
                                                <p>{dia.diaSemanaAbreviado.slice(0,3)}</p>
                                                <p>{dia.diaMes}/{dia.mes}</p>
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
                                    oppeningHour.map((hour) => ( // Remova o segundo parâmetro "oppeningHour"
                                    <React.Fragment key={hour}> {/* Use oppeningHour como chave */}
                                        <button className={`
                                            ${
                                                hourSelected === null ? style.boxDays :
                                                hourSelected === hour ? style.daySelected :
                                                style.daysNotSelected
                                            }
                                        `} 
                                            onClick={() => buttonHour(hour)}> {/* Use hour como argumento da função buttonHour */}
                                            <p>{hour.toFixed(2).replace(".",":")}</p>
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
                            <button className={`${ buttonsDisabled === true ? style["btnSalvarDisabled"] : style["btnSalvar"]}`}>Salvar</button>
                            <button onClick={cancelar} className={style["btn-cancelar"]}>Cancelar</button>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default MeusAgendamentos;
