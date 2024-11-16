import style from './ModalSemana.module.css';
import { IoWarning } from "react-icons/io5";
import useSemanaCheckboxes from './ControleModal';
import api from '../../api';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ModalSemana = ({ barbeiroSelecionado }) => {
    const {
        segundaChecked, tercaChecked, quartaChecked, quintaChecked,
        sextaChecked, sabadoChecked, domingoChecked, controleCheckbox
    } = useSemanaCheckboxes(barbeiroSelecionado);

    const salvar = () => {
        if (barbeiroSelecionado && barbeiroSelecionado.semana) {
            barbeiroSelecionado.semana.segunda = segundaChecked;
            barbeiroSelecionado.semana.terca = tercaChecked;
            barbeiroSelecionado.semana.quarta = quartaChecked;
            barbeiroSelecionado.semana.quinta = quintaChecked;
            barbeiroSelecionado.semana.sexta = sextaChecked;
            barbeiroSelecionado.semana.sabado = sabadoChecked;
            barbeiroSelecionado.semana.domingo  = domingoChecked;
        }

        console.log("Barbeiro para salvar: " + JSON.stringify(barbeiroSelecionado));
        const options = {
            method: 'PUT',
            url: `barbeiros/${barbeiroSelecionado.id}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(barbeiroSelecionado)
        };

        api.request(options).then(response => {
            console.log(response.data);
            toast.success("Dias redefinidos com sucesso!");
        }).catch(error => {
            console.error(error);
            toast.error("Erro ao redefinir dias, contate o suporte");
        });

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };


    return (
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className={style["container-title-modal"]}>
                        <h2>Dias da semana</h2>
                    </div>
                    <div className={style["container-body-modal"]}>
                        <div className={style["container-dia-modal"]}>
                            <div className={style["dia-da-semana"]}>
                                <h3>SEG</h3>
                                <input
                                    type="checkbox"
                                    value="segunda"
                                    checked={segundaChecked}
                                    onChange={(e) => controleCheckbox(e.target.value)}
                                />
                            </div>
                            <div className={style["dia-da-semana"]}>
                                <h3>TER</h3>
                                <input
                                    type="checkbox"
                                    value="terca"
                                    checked={tercaChecked}
                                    onChange={(e) => controleCheckbox(e.target.value)}
                                />
                            </div>
                            <div className={style["dia-da-semana"]}>
                                <h3>QUA</h3>
                                <input
                                    type="checkbox"
                                    value="quarta"
                                    checked={quartaChecked}
                                    onChange={(e) => controleCheckbox(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={style["container-dia-modal-maior"]}>
                            <div className={style["dia-da-semana"]}>
                                <h3>QUI</h3>
                                <input
                                    type="checkbox"
                                    value="quinta"
                                    checked={quintaChecked}
                                    onChange={(e) => controleCheckbox(e.target.value)}
                                />
                            </div>
                            <div className={style["dia-da-semana"]}>
                                <h3>SEX</h3>
                                <input
                                    type="checkbox"
                                    value="sexta"
                                    checked={sextaChecked}
                                    onChange={(e) => controleCheckbox(e.target.value)}
                                />
                            </div>
                            <div className={style["dia-da-semana"]}>
                                <h3>SAB</h3>
                                <input
                                    type="checkbox"
                                    value="sabado"
                                    checked={sabadoChecked}
                                    onChange={(e) => controleCheckbox(e.target.value)}
                                />
                            </div>
                            <div className={style["dia-da-semana"]}>
                                <h3>DOM</h3>
                                <input
                                    type="checkbox"
                                    value="domingo"
                                    checked={domingoChecked}
                                    onChange={(e) => controleCheckbox(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={style["container-aviso"]}>
                        <div>
                            <IoWarning className={style["icon"]} />
                        </div>
                        <div className={style["aviso"]}>
                            <p>O barbeiro {barbeiroSelecionado == null || barbeiroSelecionado.nome == null ? "" : barbeiroSelecionado.nome.length > 15 ? (barbeiroSelecionado.nome.slice(0, 12) + "...") : barbeiroSelecionado.nome} não receberá agendamento nos dias selecionados.</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" onClick={salvar}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSemana;
