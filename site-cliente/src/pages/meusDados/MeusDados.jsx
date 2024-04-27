import React from "react";
import style from './MeuDados.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import ImgBarra from '../../utils/assets/barra-lateral.svg';

const meusDados = () => {
    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className={style["container"]}>
            <img src={ImgBarra} className={style["barraLeft"]} alt="" srcset="" />
            <img src={ImgBarra} className={style["barraRight"]} alt="" srcset="" />
            <NavBar />
                <div className={style["container-title"]}><h1 className={style["title"]}>MEUS DADOS</h1></div>
                <div className={style["container-boxdata"]}>
                    <div className={style["box-data"]}>
                        <div className={style["container-conteudo-box-data"]}>
                            <p className={style["title-box-data"]}>EMAIL</p>
                        </div>
                        <div className={style["container-conteudo-box-data"]}>
                            <p className={style["text-box-data"]}>USUARIO@GMAIL.COM</p>
                        </div>

                        <div className={style["container-conteudo-box-data"]}>
                            <p className={style["title-box-data"]}>NOME</p>
                        </div>
                        <div className={style["container-conteudo-box-data"]}>
                            <p className={style["text-box-data"]}>USUARIO</p>
                        </div>

                        <div className={style["container-conteudo-box-data"]}>
                            <p className={style["title-box-data"]}>TELEFONE</p>
                        </div>
                        <div className={style["container-conteudo-box-data"]}>
                            <p className={style["text-box-data"]}>11 99999999</p>
                        </div>

                        <div className={style["container-button-box-data"]}>
                            <button className={style["button-edit-box-data"]}>Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default meusDados;