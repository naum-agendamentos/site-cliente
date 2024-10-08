import style from './ModalSemana.module.css';
import { IoWarning } from "react-icons/io5";
import useSemanaCheckboxes from './ControleModal';
import api from '../../api';
import { toast } from 'react-toastify';


const ModalSemana = ({barbeiroSelecionado}) => {
    const {
        segundaChecked, tercaChecked, quartaChecked, quintaChecked,
        sextaChecked, sabadoChecked, domingoChecked, controleCheckbox
    } = useSemanaCheckboxes(barbeiroSelecionado);

    function salvar(){
        barbeiroSelecionado.semana.segunda["Segunda"] = segundaChecked;
        barbeiroSelecionado.semana.terca["Terca"] = tercaChecked;
        barbeiroSelecionado.semana.quarta["Quarta"] = quartaChecked;
        barbeiroSelecionado.semana.quinta["Quinta"] = quintaChecked;
        barbeiroSelecionado.semana.sexta["Sexta"] = sextaChecked;
        barbeiroSelecionado.semana.sabado["Sabado"] = sabadoChecked;
        barbeiroSelecionado.semana.domingo["Domingo"] = domingoChecked;

        console.log("Barbeiro pra salvar: "+ JSON.stringify(barbeiroSelecionado));
        const options = {
            method: 'PUT',
            url: `barbeiros/${barbeiroSelecionado.id}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(barbeiroSelecionado)
        };
    

        api.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Dias redefinidos com sucesso!");
        }).catch(function (error) {
            console.error(error);
            toast.error("Erro ao redefinir dias, contate o suporte");
        });

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    return(
        

        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className={style["container-title-modal"]}>
                <h2>Dias da semana</h2>
            </div>
            <div className={style["container-body-modal"]}>
                <div className={style["container-dia-modal"]}>
                    <div className={style["dia-da-semana"]}>
                        <h3>SEG</h3>
                        <input type="checkbox" value="Segunda" checked={segundaChecked} onClick={(e) => controleCheckbox(e.target.value)}  />
                    </div>
                    <div className={style["dia-da-semana"]}>
                        <h3>TER</h3>
                        <input type="checkbox" value="Terca" onClick={(e) => controleCheckbox(e.target.value)}  checked={tercaChecked} />
                    </div>
                    <div className={style["dia-da-semana"]}>
                        <h3>QUA</h3>
                        <input type="checkbox" value="Quarta" onClick={(e) => controleCheckbox(e.target.value)}  checked={quartaChecked} />
                    </div>
                </div>
                <div className={style["container-dia-modal-maior"]}>
                    <div className={style["dia-da-semana"]}>
                        <h3>QUI</h3>
                        <input type="checkbox" value="Quinta" onClick={(e) => controleCheckbox(e.target.value)}  checked={quintaChecked} />
                    </div>
                    <div className={style["dia-da-semana"]}>
                        <h3>SEX</h3>
                        <input type="checkbox" value="Sexta" onClick={(e) => controleCheckbox(e.target.value)}  checked={sextaChecked} />
                    </div>
                    <div className={style["dia-da-semana"]}>
                        <h3>SAB</h3>
                        <input type="checkbox" value="Sabado" onClick={(e) => controleCheckbox(e.target.value)}  checked={sabadoChecked} />
                    </div>
                    <div className={style["dia-da-semana"]}>
                        <h3>DOM</h3>
                        <input type="checkbox" onClick={(e) => controleCheckbox(e.target.value)}  value="Domingo" checked={domingoChecked} />
                    </div>
                </div>
            </div>

            <div className={style["container-aviso"]}>
                <div>
                    <IoWarning className={style["icon"]}/> 
                </div>
                <div className={style["aviso"]}>                    
                    <p>O barbeiro {barbeiroSelecionado == null || barbeiroSelecionado.nome == null ? "" :  barbeiroSelecionado.nome.length > 15 ? (barbeiroSelecionado.nome.slice(0,12) + "...") : barbeiroSelecionado.nome} não receberá agendamento nos dias selecionados.</p>
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

}

export default ModalSemana;