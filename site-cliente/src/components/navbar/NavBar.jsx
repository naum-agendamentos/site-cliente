import React from 'react';
import styles from './NavBar.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada.png';
const NavBar = () => {
    return (
        <nav className={styles["Nav"]} id='nav'>

            <div>
                <img src={logoTmNav} alt="logo-tm"/>
            </div>

            <ul className={styles["navbar-options"]}>
                <li><a href="#SobreNos">Sobre</a></li>
                <li><a href="#Servicos">Serviços</a></li>
                <li><a href="#NossoTrabalho">Nosso Trabalho</a></li>
                <li><a href="#Agendar">Agendar</a></li>
                <li><a href="#Localizacao">Localização</a></li>
                <p className={styles["line"]}>|</p>
                <div className={styles["botoes"]}>
                    <a href="./loginCliente.html" className={styles["navBottonLogin"]}>Login</a>
                    <a href="./cliente/cadastroCliente.html" className={styles["navBottonCadast"]}>Cadastro</a>
                </div>
            </ul>
        </nav>
    );

};
export default NavBar;