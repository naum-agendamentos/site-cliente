import { useState, useEffect } from 'react';

const useSemanaCheckboxes = (barbeiroSelecionado) => {
    const [diasChecked, setDiasChecked] = useState({
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false
    });

    useEffect(() => {
        if (barbeiroSelecionado && barbeiroSelecionado.semana) {
            setDiasChecked({
                segunda: barbeiroSelecionado.semana.segunda?.["Segunda"] || false,
                terca: barbeiroSelecionado.semana.terca?.["Terca"] || false,
                quarta: barbeiroSelecionado.semana.quarta?.["Quarta"] || false,
                quinta: barbeiroSelecionado.semana.quinta?.["Quinta"] || false,
                sexta: barbeiroSelecionado.semana.sexta?.["Sexta"] || false,
                sabado: barbeiroSelecionado.semana.sabado?.["Sabado"] || false,
                domingo: barbeiroSelecionado.semana.domingo?.["Domingo"] || false,
            });
        }
    }, [barbeiroSelecionado]);

    const controleCheckbox = (dia) => {
        setDiasChecked((prevState) => ({
            ...prevState,
            [dia.toLowerCase()]: !prevState[dia.toLowerCase()]
        }));
    };

    return {
        ...diasChecked,
        controleCheckbox
    };
};

export default useSemanaCheckboxes;
