import api from "../../api";
import { toast } from "react-toastify";
import styles from './EditarServico.module.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ImgBarra from '../../utils/assets/barra-lateral.svg'
import NavBar from '../../components/navbar-pos-login/NavBar';

function EditarServico() {
    const navigate = useNavigate();
    const { idServico } = { idServico: 1 };
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const[tempoDuracao, setTempoDuracao ]= useState('');

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };
    const handleSave = async () => {
        if (preco === '' || preco <= 0) {
            toast.error('O campo preço não pode ser vazio ou menor que 0.');
            return;
        } else if (nome === '') {
            toast.error('O campo nome é obrigatório.');
            return;
        } else if (tempoDuracao === ''|| tempoDuracao <= 0) {
            toast.error('O campo tempo de duração não pode ser vazio ou menor que 0.');
            return;
        }
        try {
            await api.put(`/${idServico}`, {
                nome,
                preco,
                tempoDuracao
            });
            toast.success('Serviço editado com sucesso!');
            navigate('/login');
        } catch (error) {
            toast.error('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
        }
    };
    const handleCancel = () => {
        navigate('/login');
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/${idServico}`);
                const { data } = response;
                const { nome, preco, tempoDuracao } = data;
                setNome(nome);
                setPreco(preco);
                setTempoDuracao(tempoDuracao);
            } catch (error) {
                toast.error('Ocorreu um erro ao buscar os dados. Por favor, tente novamente.');
            }
        };
        fetchData();
    }, [idServico]);

    return (
        <div className={styles.container}>
            <img src={ImgBarra} className={styles.barraLeft} alt="" />
            <img src={ImgBarra} className={styles.barraRight} alt="" />
            <NavBar />
            <div className={styles['container-title']}><h1 className={styles.title}>EDITAR SERVIÇO</h1></div>
            <div className={styles['container-form']}>
                <div className={styles['container-input']}>
                    <p>NOME</p>
                    <input
                        className={styles['input-form']}
                        type="text"
                        placeholder="Ex: Corte de cabelo"
                        value={nome}
                        onChange={(e) => handleInputChange(e, setNome)}
                    />
                </div>
                <div className={styles['container-input']}>
                    <p>Tempo de Duração</p>
                    <input
                        className={styles['input-form']}
                        type="text"
                        placeholder="Ex: Corte de cabelo"
                        value={tempoDuracao}
                        onChange={(e) => handleInputChange(e, setTempoDuracao)}
                    />
                </div>
                <div className={styles['container-input']}>
                    <p>PREÇO</p>
                    <input
                        className={styles['input-form']}
                        type="decimal"
                        placeholder="R$ 40,00"
                        value={preco}
                        onChange={(e) => handleInputChange(e, setPreco)}
                    />
                    <div className={styles['tesoura']} ></div>
                </div>
            
                <div className={styles['container-btn']}>
                    <button className={styles['button-alterar']} type="button" onClick={handleSave}>
                        SALVAR
                    </button>
                    <button className={styles["button-cancelar"]} type="button"
                        onClick={handleCancel}>
                            CANCELAR
                            </button>
                </div>
            </div>
        </div>
    
    );
}

export default EditarServico;
