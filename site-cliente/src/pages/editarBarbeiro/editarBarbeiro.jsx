import React, { useState } from 'react';
import './EditarBarbeiro.module.css';
import NavbarComponent from './NavbarComponent';
import FormComponent from './FormComponent';
import ButtonComponent from './ButtonComponent';
import BannerComponent from './BannerComponent';
import FileInputComponent from './FileInputComponent';
import LayoutComponent from './LayoutComponent';

function EditarBarbeiro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ nome, email, telefone, descricao, foto });
    };

    const handleFileChange = (event) => {
        setFoto(event.target.files[0]);
        mostrarNomeImagem();
    };

    return (
        <LayoutComponent>
            <NavbarComponent />
            <BannerComponent />
            <div className="validarconta">
                <FormComponent
                    nome={nome}
                    email={email}
                    telefone={telefone}
                    descricao={descricao}
                    foto={foto}
                    handleSubmit={handleSubmit}
                    handleFileChange={handleFileChange}
                />
                <FileInputComponent handleFileChange={handleFileChange} />
                <ButtonComponent
                    onClickSalvar={handleSubmit}
                    onClickCancelar={() => {} }
                />
            </div>
        </LayoutComponent>
    );
}

export default EditarBarbeiro;
