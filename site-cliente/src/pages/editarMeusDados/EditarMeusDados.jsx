import React from "react";
import style from './EditarMeuDados.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import ImgBarra from '../../utils/assets/barra-lateral.svg';

const editarMeusDados = () => {
    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className={style["container"]}>
            <img src={ImgBarra} className={style["barraLeft"]} alt="" srcset="" />
            <img src={ImgBarra} className={style["barraRight"]} alt="" srcset="" />
            <NavBar />
            <div className={style["container-title"]}><h1 className={style["title"]}>EDITAR DADOS</h1></div>
                <div className={style["container-form"]}>
                    <div className={style["container-input"]}>
                        <p>EMAIL</p>
                        <input className={style["input-form"]} type="text" placeholder="EX: usuario@gmail.com"/>
                    </div>
                    <div className={style["container-input"]}>
                        <p>NOME</p>
                        <input className={style["input-form"]} type="text" placeholder="EX: usuario"/>
                    </div>
                    <div className={style["container-input"]}>
                        <p>TELEFONE</p>
                        <input className={style["input-form"]} type="text" placeholder="EX: 11 999999999"/>
                    </div>
                    <div className={style["container-input"]}>
                        <p>SENHA</p>
                        <input className={style["input-form"]} type="password" placeholder=""/>
                    </div>
                    <div className={style["container-input"]}>
                        <p>CONFIRMAR SENHA</p>
                        <input className={style["input-form"]} type="password" placeholder=""/>
                    </div>
                    <div className={style["container-btn"]}>
                        <button className={style["button-alterar"]}>SALVAR</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default editarMeusDados;