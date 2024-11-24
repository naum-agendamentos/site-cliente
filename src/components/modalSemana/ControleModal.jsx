import { useState, useEffect } from 'react';

const useSemanaCheckboxes = (barbeiroSelecionado) => {
    const [diasChecked, setDiasChecked] = useState({
        segundaChecked: false,
        tercaChecked: false,
        quartaChecked: false,
        quintaChecked: false,
        sextaChecked: false,
        sabadoChecked: false,
        domingoChecked: false
    });

    useEffect(() => {
        if (barbeiroSelecionado && barbeiroSelecionado.semana) {
            setDiasChecked({
                segundaChecked: !barbeiroSelecionado.semana.segunda,
                tercaChecked: !barbeiroSelecionado.semana.terca,
                quartaChecked: !barbeiroSelecionado.semana.quarta,
                quintaChecked: !barbeiroSelecionado.semana.quinta,
                sextaChecked: !barbeiroSelecionado.semana.sexta,
                sabadoChecked: !barbeiroSelecionado.semana.sabado,
                domingoChecked: !barbeiroSelecionado.semana.domingo,
            });
        }
    }, [barbeiroSelecionado]);
    

    const controleCheckbox = (dia) => {
        setDiasChecked((prevState) => ({
            ...prevState,
            [dia + 'Checked']: !prevState[dia + 'Checked'] // Atualiza dinamicamente a chave correta
        }));
    };
    

    return {
        ...diasChecked,
        controleCheckbox
    };
};

export default useSemanaCheckboxes;
