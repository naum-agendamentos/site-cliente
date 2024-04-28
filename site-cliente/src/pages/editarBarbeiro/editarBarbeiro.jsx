import api from "../../api";
import { toast } from "react-toastify";
import styles from './editarBarbeiro.module.css'
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ImgBarra from '../../utils/assets/barra-lateral.svg'
import NavBar from '../../components/navbar-pos-login/NavBar';

function EditarBarbeiro() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState(''); 
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [celular, setCelular] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState(null);
    
    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    const handleSave = async () => {
        if (senha !== confirmarSenha) {
            toast.error('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        try {
            await api.put(`/${id}`, {
                nome,
                email,
                senha,
                confirmarSenha,
                celular,
                descricao,
                foto
            });
            toast.success('Dados editados com sucesso!');
            navigate("/barbeiros");
        } catch (error) {
            toast.error('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
        }
    };

    const handleCancel = () => {
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/${id}`);
                const { data } = response;
                const { nome, email, senha, confirmarSenha, celular, descricao, foto } = data;
                setNome(nome);
                setEmail(email);
                setSenha(senha);
                setConfirmarSenha(confirmarSenha);
                setCelular(celular);
                setDescricao(descricao);
                setFoto(foto);
            } catch (error) {
                console.log("Erro ao buscar os detalhes do barbeiro: ", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div className={styles["container"]}>
                    <img src={ImgBarra} className={styles["barraLeft"]} alt="" srcSet="" />
                    <img src={ImgBarra} className={styles["barraRight"]} alt="" srcSet="" />
                    <NavBar />
                    <div className={styles["container-title"]}><h1 className={styles["title"]}>EDITAR BARBEIRO</h1></div>
                    <div className={styles["container-form"]}>
                        <div className={styles["container-input"]}>
                        <p>EMAIL</p>
                        <input className={styles["input-form"]}
                            type="text"
                            placeholder="usuario@gmail.com"
                            value={email}
                            onChange={(e) => handleInputChange(e, setEmail)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                        <p>NOME</p>
                        <input className={styles["input-form"]}
                            type="text"
                            placeholder="Ex: usuario"
                            value={nome}
                            onChange={(e) => handleInputChange(e, setNome)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                        <p>celular</p>
                        <input className={styles["input-form"]}
                            type="text"
                            placeholder="Ex: 11 999999999"
                            value={celular}
                            onChange={(e) => handleInputChange(e, setCelular)}
                        />
                    </div>
                    <div className="container-input"><div className={styles["container-input"]}>      <p>SENHA</p>
                    <input className={styles["input-form"]}
                            type="password"
                            placeholder="***********"
                            value={senha}
                            onChange={(e) => handleInputChange(e, setSenha)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                        <p>CONFIRMAR SENHA</p>
                        <input className={styles["input-form"]}
                            type="password"
                            placeholder="***********"
                            value={confirmarSenha}
                            onChange={(e) => handleInputChange(e, setConfirmarSenha)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                        <p>Descrição</p>
                        <textarea
                            className={styles["input-form"]}
                            placeholder="Digite uma descrição"
                            value={descricao}
                            onChange={(e) => handleInputChange(e, setDescricao)}
                        />
                    </div>
                    <div className={styles["container-input"]}>
                            <p>Foto</p>
                            <input className={styles["input-form"]} 
                            type="text" 
                            value={foto}
                            placeholder="URL da Imagem"
                            onChange={(e) => handleInputChange(e,setFoto)} />
                        </div>
                        <div className={styles["container-btn"]}>
                        <button className={styles["button-alterar"]} type="button"
                        onClick={handleSave}>
                            SALVAR
                            </button>
                        <button className={styles["button-cancelar"]} type="button"
                        onClick={handleCancel}>
                            CANCELAR
                            </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
    
    export default EditarBarbeiro;