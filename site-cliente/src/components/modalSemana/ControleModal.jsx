import { useState, useEffect } from 'react';

const useSemanaCheckboxes = (barbeiroSelecionado) => {
    const [segundaChecked, setSegundaChecked] = useState(false);
    const [tercaChecked, setTercaChecked] = useState(false);
    const [quartaChecked, setQuartaChecked] = useState(false);
    const [quintaChecked, setQuintaChecked] = useState(false);
    const [sextaChecked, setSextaChecked] = useState(false);
    const [sabadoChecked, setSabadoChecked] = useState(false);
    const [domingoChecked, setDomingoChecked] = useState(false);

    useEffect(() => {
        if (barbeiroSelecionado) {
            setSegundaChecked(barbeiroSelecionado.semana.segunda["Segunda"]);
            setTercaChecked(barbeiroSelecionado.semana.terca["Terca"]);
            setQuartaChecked(barbeiroSelecionado.semana.quarta["Quarta"]);
            setQuintaChecked(barbeiroSelecionado.semana.quinta["Quinta"]);
            setSextaChecked(barbeiroSelecionado.semana.sexta["Sexta"]);
            setSabadoChecked(barbeiroSelecionado.semana.sabado["Sabado"]);
            setDomingoChecked(barbeiroSelecionado.semana.domingo["Domingo"]);
        }
    }, [barbeiroSelecionado]);

    function controleCheckbox(dia) {
        if(dia === "Segunda"){
            if(segundaChecked === true){
                setSegundaChecked(false);
            }
            else{
                setSegundaChecked(true);
            }
        }
        else if(dia === "Terca"){
            if(tercaChecked === true){
                setTercaChecked(false);
            }
            else{
                setTercaChecked(true);
            }
        }
        else if(dia === "Quarta"){
            if(quartaChecked === true){
                setQuartaChecked(false);
            }
            else{
                setQuartaChecked(true);
            }
        }
        else if(dia === "Quinta"){
            if(quintaChecked === true){
                setQuintaChecked(false);
            }
            else{
                setQuintaChecked(true);
            }
        }
        else if(dia === "Sexta"){
            if(sextaChecked === true){
                setSextaChecked(false);
            }
            else{
                setSextaChecked(true);
            }
        }
        else if(dia === "Sabado"){
            if(sabadoChecked === true){
                setSabadoChecked(false);
            }
            else{
                setSabadoChecked(true);
            }
        }
        else if(dia === "Domingo"){
            if(domingoChecked === true){
                setDomingoChecked(false);
            }
            else{
                setDomingoChecked(true);
            }
        }
    }
    return {
        segundaChecked, tercaChecked, quartaChecked, quintaChecked,
        sextaChecked, sabadoChecked, domingoChecked, controleCheckbox
    };
}
export default useSemanaCheckboxes;