import React from "react";
import style from './MeusAgendamentos.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
//import ImgBarra from '../../utils/assets/barra-lateral.svg';

const meusAgendamentos = () => {
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
                                <div className={style["container-box"]}>
                                    <div className={style["container-conteudo-box-Agendamento"]}>
                                        {/* <h1 className={style["title-agendamento"]}>SERVIÇOS RESERVADOS:</h1> */}
                                        <div className={style["container-metade-box"]}>
                                            <div className={style["box-title"]}>
                                                <h1 className={style["title-agendamento"]}>SERVIÇOS RESERVADOS:</h1>
                                                <p className={style["subtitle-agendamento"]}>Corte Lindo demais</p>
                                                <p className={style["subtitle-agendamento"]}>Degradê</p>
                                                <p className={style["subtitle-agendamento"]}>Cortesinho mais ou menos</p>
                                            </div>
                                            <div className={style["box-data"]}>
                                                <h1 className={style["data-agendamento"]}>QUARTA-FEIRA,20 DE OUTUBRO 2024</h1>
                                            </div>
                                        </div>
                                        <div className={style["container-metade-box"]} id={style["container-hour"]}>
                                            <h1 className={style["data-agendamento"]} >10:00 ÀS 11:00</h1>
                                        </div>
                                        <div className={style["container-metade-box"]} id={style["container-day-total"]}>
                                            <p className={style["subtitle-agendamento"]}>Total a Pagar: R$ 120,00</p>
                                            <button className={style["btn-edit"]}>Editar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={style["container-box"]}>
                                    <div className={style["container-conteudo-box-Agendamento"]}>
                                        {/* <h1 className={style["title-agendamento"]}>SERVIÇOS RESERVADOS:</h1> */}
                                        <div className={style["container-metade-box"]}>
                                            <div className={style["box-title"]}>
                                                <h1 className={style["title-agendamento"]}>SERVIÇOS RESERVADOS:</h1>
                                                <p className={style["subtitle-agendamento"]}>Corte Lindo demais</p>
                                                <p className={style["subtitle-agendamento"]}>Degradê</p>
                                                <p className={style["subtitle-agendamento"]}>Cortesinho mais ou menos</p>
                                            </div>
                                            <div className={style["box-data"]}>
                                                <h1 className={style["data-agendamento"]}>QUARTA-FEIRA,20 DE OUTUBRO 2024</h1>
                                            </div>
                                        </div>
                                        <div className={style["container-metade-box"]} id={style["container-hour"]}>
                                            <h1 className={style["data-agendamento"]} >10:00 ÀS 11:00</h1>
                                        </div>
                                        <div className={style["container-metade-box"]} id={style["container-day-total"]}>
                                            <p className={style["subtitle-agendamento"]}>Total a Pagar: R$ 120,00</p>
                                            <button className={style["btn-edit"]}>Editar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={style["container-box"]}>
                                    <div className={style["container-conteudo-box-Agendamento"]}>
                                        {/* <h1 className={style["title-agendamento"]}>SERVIÇOS RESERVADOS:</h1> */}
                                        <div className={style["container-metade-box"]}>
                                            <div className={style["box-title"]}>
                                                <h1 className={style["title-agendamento"]}>SERVIÇOS RESERVADOS:</h1>
                                                <p className={style["subtitle-agendamento"]}>Corte Lindo demais</p>
                                                <p className={style["subtitle-agendamento"]}>Degradê</p>
                                                <p className={style["subtitle-agendamento"]}>Cortesinho mais ou menos</p>
                                            </div>
                                            <div className={style["box-data"]}>
                                                <h1 className={style["data-agendamento"]}>QUARTA-FEIRA,20 DE OUTUBRO 2024</h1>
                                            </div>
                                        </div>
                                        <div className={style["container-metade-box"]} id={style["container-hour"]}>
                                            <h1 className={style["data-agendamento"]} >10:00 ÀS 11:00</h1>
                                        </div>
                                        <div className={style["container-metade-box"]} id={style["container-day-total"]}>
                                            <p className={style["subtitle-agendamento"]}>Total a Pagar: R$ 120,00</p>
                                            <button className={style["btn-edit"]}>Editar</button>
                                        </div>
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
export default meusAgendamentos;