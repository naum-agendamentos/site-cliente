import React from 'react';

function ButtonComponent({ onClickSalvar, onClickCancelar }) {
    return (
        <div className="btn-salvar-editar">
            <button type="submit" className="btn-salvar" onClick={onClickSalvar}>SALVAR</button>
            <button type="button" onClick={onClickCancelar}>CANCELAR</button>
        </div>
    );
}

export default ButtonComponent;
