import React from "react";
import style from './FinalizarAgendamento.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import ImgBarra from '../../utils/assets/barra-lateral.svg';
import Barber from '../../utils/assets/barbeiroAgendamento.png';

const meusAgendamentos = () => {
    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className={style["container"]}>
                <img src={ImgBarra} className={style["barraLeft"]} alt="" srcset="" />
                <img src={ImgBarra} className={style["barraRight"]} alt="" srcset="" />
                <NavBar />
                <div className={style["container-barbers"]}>
                    <div className={style["subcontainer-barber"]}>
                        <img className={style["asset-barber"]} src={Barber} alt="" />
                        <img className={style["asset-barber"]} src={Barber} alt="" />
                        <img className={style["asset-barber"]} src={Barber} alt="" />
                    </div>
                </div>
                <div className={style["container-monthday"]}>
                    <div className={style["subcontainer-monthday"]}>
                        <p className={style["monthday"]}>MÊS DIA</p>
                    </div>
                </div>
                <div className={style["container-days"]}>
                    <div className={style["subcontainer-days"]}>
                        <div className={style["container-arrow"]}>
                            <button className={style["btn-arrow"]}>{'<'}</button>
                        </div>
                        <div className={style["container-box-days"]}>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            
                        </div>
                        <div className={style["container-arrow"]}>
                            <button className={style["btn-arrow"]}>{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={style["container-monthday"]}>
                    <div className={style["subcontainer-monthday"]}>
                        <p className={style["monthday"]}>HORÁRIO DE INÍCIO</p>
                    </div>
                </div>
                <div className={style["container-days"]}>
                    <div className={style["subcontainer-days"]}>
                        <div className={style["container-arrow"]}>
                            <button className={style["btn-arrow"]}>{'<'}</button>
                        </div>
                        <div className={style["container-box-days"]}>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            <div className={style["box-days"]}>
                                <p className={style["dayText"]}>Seg</p>
                                <p className={style["dayText"]}>01</p>
                            </div>
                            
                        </div>
                        <div className={style["container-arrow"]}>
                            <button className={style["btn-arrow"]}>{'>'}</button>
                        </div>
                    </div>
                </div>


                <div className={style["container-btns"]}>
                    <div className={style["subcontainer-btns"]}>
                        <button className={style["btn-salvar"]}>Salvar</button>
                        <button className={style["btn-cancelar"]}>Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default meusAgendamentos;