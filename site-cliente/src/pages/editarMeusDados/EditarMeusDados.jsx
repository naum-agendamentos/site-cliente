import api from '../../api';
import { toast } from 'react-toastify';
import style from './EditarMeuDados.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import NavBar from '../../components/navbar-pos-login/NavBar';
import ImgBarra from '../../utils/assets/barra-lateral.svg';

const EditarMeusDados = () => {
    const navigate = useNavigate();
    const { idUser } = { idUser: 1 };
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };
    const handleSave = async () => {
        if (senha !== confirmarSenha) {
            toast.error('As senhas não coincidem. Por favor, verifique.');
            return;
        }
        try {
            await api.put(`/${idUser}`, {
                email,
                nome,
                telefone,
                senha,
                confirmarSenha
            });
            toast.success('Dados editados com sucesso!');
            navigate("/login");
        } catch (error) {
            toast.error('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
        }
    };
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/${idUser}`);
                const { data } = response;
                const { email, nome, telefone, senha, confirmarSenha } = data;
                setEmail(email);
                setNome(nome);
                setTelefone(telefone);
                setSenha(senha);
                setConfirmarSenha(confirmarSenha);
            } catch (error) {
                toast.error('Ocorreu um erro ao buscar os dados. Por favor, tente novamente.');
            }
        };
        fetchData();
    }, [idUser]);

    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>
            <div className={style["container"]}>
            <img src={ImgBarra} className={style["barraLeft"]} alt="" srcset="" />
            <img src={ImgBarra} className={style["barraRight"]} alt="" srcset="" />
            <NavBar />
            <div className={style["container-title"]}><h1 className={style["title"]}>EDITAR DADOS</h1></div>
                <div className={style["container-form"]}>
                    <div className={style["container-input"]}>
                        <p>EMAIL</p>
                        <input className={style["input-form"]} 
                        type="text" 
                        placeholder="EX: usuario@gmail.com"
                        value={email}
                        onChange={(e) => handleInputChange(e, setEmail)}
                        />
                    </div>
                    <div className={style["container-input"]}>
                        <p>NOME</p>
                        <input className={style["input-form"]} 
                        type="text" 
                        placeholder="EX: usuario"
                        value={nome}
                        onChange={(e) => handleInputChange(e, setNome)}
                        />
                    </div>
                    <div className={style["container-input"]}>
                        <p>TELEFONE</p>
                        <input className={style["input-form"]}
                         type="text"
                        placeholder="EX: 11 999999999"
                        value={telefone}
                        onChange={(e) => handleInputChange(e, setTelefone)}
                        />
                    </div>
                    <div className={style["container-input"]}>
                        <p>SENHA</p>
                        <input className={style["input-form"]}
                         type="password"
                          placeholder="*********"
                            value={senha}
                            onChange={(e) => handleInputChange(e, setSenha)}
                          />
                    </div>
                    <div className={style["container-input"]}>
                        <p>CONFIRMAR SENHA</p>
                        <input className={style["input-form"]} 
                        type="password" 
                        placeholder="*********"
                        value={confirmarSenha}
                        onChange={(e) => handleInputChange(e, setConfirmarSenha)}
                        />
                    </div>
                    <div className={style["container-btn"]}>
                       <button className={style["button-alterar"]} type="button"
                        onClick={handleSave}>
                            SALVAR
                            </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditarMeusDados;