import React from "react";
import style from './ListaServico.module.css';
import NavBar from '../../components/navbar-pos-login/NavBar';
import ImgBarra from '../../utils/assets/barra-lateral.svg';
import BtnEdit from '../../utils/assets/btn-edit.png';
import BtnDelete from '../../utils/assets/btn-delete.png';

const listaServico = () => {
    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className={style["container"]}>
                <img src={ImgBarra} className={style["barraLeft"]} alt="" srcset="" />
                <img src={ImgBarra} className={style["barraRight"]} alt="" srcset="" />
                <NavBar />
                <div className={style["container-title"]}><h1 className={style["title"]}>SERVIÇOS CADASTRADOS</h1></div>
                <div className={style["container-table"]}>
                    <div className={style["box-table"]}>
                        <table className="table">
                            <thead className={style["title-table"]}>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Preço</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr>
                                <th scope="row">1</th>
                                <td className={style["txt-td"]}>Mark</td>
                                <td className={style["txt-td"]}>Otto</td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnEdit} alt="" /></button></td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnDelete} alt="" /></button></td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td className={style["txt-td"]}>Jacob</td>
                                <td className={style["txt-td"]}>Thornton</td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnEdit} alt="" /></button></td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnDelete} alt="" /></button></td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnEdit} alt="" /></button></td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnDelete} alt="" /></button></td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnEdit} alt="" /></button></td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnDelete} alt="" /></button></td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnEdit} alt="" /></button></td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnDelete} alt="" /></button></td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnEdit} alt="" /></button></td>
                                <td className={style["txt-td"]}><button className={style["btn"]}><img className={style["img-btn"]} src={BtnDelete} alt="" /></button></td>
                                </tr>
                                
                            </tbody>
                        </table>

                    </div>


                    <div className={style["container-adicionar"]}>
                        <button className={style["btn-adicionar"]}>+</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default listaServico;