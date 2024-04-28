import React, { useState } from 'react';
import './CadastrarBarbeiro.module.css';

function CadastrarBarbeiro() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [celular, setCelular] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log({ email, nome, senha, confirmarSenha, celular, descricao, foto });
    };

    const handleFileChange = (event) => {
        setFoto(event.target.files[0]);
    };

    return (
        <div className="container">
            <h1>CADASTRAR BARBEIRO</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    E-mail:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>
                <label>
                    Senha:
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </label>
                <label>
                    Confirmar senha:
                    <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                </label>
                <label>
                    Celular:
                    <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} />
                </label>
                <label>
                    Descrição:
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </label>
                <label>
                    Foto:
                    <input type="file" onChange={handleFileChange} />
                </label>
                <button type="submit">CADASTRAR</button>
            </form>
        </div>
    );
}

export default CadastrarBarbeiro;