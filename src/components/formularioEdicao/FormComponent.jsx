import React from 'react';

function FormComponent({ nome, email, telefone, descricao, foto, handleSubmit, handleFileChange }) {
    return (
        <form onSubmit={handleSubmit}>
            <p>NOME:</p>
            <input id="input_nome" placeholder="NOME" value={nome} onChange={(e) => setNome(e.target.value)} />
            <p>EMAIL:</p>
            <input id="input_email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>TELEFONE:</p>
            <input id="input_telefone" placeholder="TELEFONE" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            <p>DESCRIÇÃO:</p>
            <input id="input_descricao" placeholder="DESCRIÇÃO" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            <p>FOTO:</p>
            <label htmlFor="input_foto" id="nome_imagem">Clique aqui para selecionar uma imagem</label>
            <input className="foto" type="file" id="input_foto" style={{ display: 'none' }} onChange={handleFileChange} />
            <div className="btn-salvar-editar">
                <button type="submit" className="btn-salvar">SALVAR</button>
                <button type="button" onClick={() => { /* Aqui você pode adicionar lógica para cancelar */ }}>CANCELAR</button>
            </div>
        </form>
    );
}

export default FormComponent;
