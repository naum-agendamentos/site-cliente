import React from 'react';
import styles from './NavBar.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada.png';
import { useNavigate } from "react-router-dom";
const NavBar = () => {


    const navigate = useNavigate(); // Inicializa o hook de navegação

    const home = () => { // Função chamada ao clicar em cancelar
        navigate("/"); // Redireciona para a página de músicas
    };
    const login = () => { // Função chamada ao clicar em cancelar
        navigate("/login"); // Redireciona para a página de músicas
    };
    const cadastroCliente = () => { // Função chamada ao clicar em cancelar
        navigate("/cadastro-cliente"); // Redireciona para a página de músicas
    };

    const voltarHome = () => { 
        navigate("/");
    };



    return (
        <nav className={styles["Nav"]} id='nav'>

            <div>
                <img onClick={voltarHome} src={logoTmNav} className={styles["imagem-logo"]} alt="logo-tm"/>
            </div>

            <ul className={styles["navbar-options"]}>
                <li><a onClick={home} href="#SobreNos">Sobre</a></li>
                <li><a onClick={home} href="#Servicos">Serviços</a></li>
                <li><a onClick={home} href="#NossoTrabalho">Nosso Trabalho</a></li>
                <li><a onClick={home} href="#Agendar">Agendar</a></li>
                <li><a onClick={home} href="#Localizacao">Localização</a></li>
                <p className={styles["line"]}>|</p>
                <div className={styles["botoes"]}>
                    <a onClick={login} href="#Login" className={styles["navBottonLogin"]}>Login</a>
                    <a onClick={cadastroCliente} href="#cadClient" className={styles["navBottonCadast"]}>Cadastro</a>
                </div>
            </ul>
        </nav>
    );

};
export default NavBar;