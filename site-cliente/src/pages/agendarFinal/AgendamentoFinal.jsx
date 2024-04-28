import React from "react";
import style from './AgendamentoFinal.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import ImgBarra from '../../utils/assets/barra-lateral.svg';
import Mapa from '../../utils/assets/MapsLocalizacao.png';

const meusAgendamentos = () => {
    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className={style["container"]}>
                <img src={ImgBarra} className={style["barraLeft"]} alt="" srcset="" />
                <img src={ImgBarra} className={style["barraRight"]} alt="" srcset="" />
                <NavBar />
                <div className={style["container-title"]}><h1 className={style["title"]}>SERVIÇOS</h1></div>
                <div className={style["container-conteudo"]}>
                    <div className={style["container-subconteudo"]}>
                        <div className={style["container-left"]}>
                            <div className={style["container-service"]}>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" checked="checked" />
                                        </div>
                                    </div>
                                </div>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" checked="checked" />
                                        </div>
                                    </div>
                                </div>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" checked="checked" />
                                        </div>
                                    </div>
                                </div>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" checked="checked" />
                                        </div>
                                    </div>
                                </div>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" checked="checked" />
                                        </div>
                                    </div>
                                </div>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                                <div className={style["box-service"]}>
                                    <div className={style["container-conteudo-service"]}>
                                        <div className={style["box-name-service"]}>
                                            <p className={style["text-service"]}>Corte Muito Lindo  - R$ 25,00</p>
                                        </div>
                                        <div className={style["container-time"]}>
                                            <p className={style["text-service"]}>30 min</p>
                                        </div>
                                        <div className={style["container-checkbox"]}>
                                            <input className={style["checkbox"]} type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <button className={style["btn-finalizar-agendamento"]}>Finalizar Agendamento</button>
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

                            </div>

                            <div className={style["container-title-map"]}>
                                <h1 className={style["title-map"]}>NOSSA LOCALIZAÇÃO</h1>
                            </div>
                            <img className={style["map"]} src={Mapa} alt="" srcset="" />
                            <div className={style["container-title-map"]}>
                                <p className={style["subtitle-map"]}>ENDEREÇO: R. Castanho da Silva, 331 - Vila Abc</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
};
export default meusAgendamentos;