import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada.png';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const [rolagem, setRolagem] = useState(false);

    const home = () => {
        navigate("/");
    };
    const login = () => {
        navigate("/login");
    };
    const cadastroCliente = () => {
        navigate("/cadastro-cliente");
    };
    const voltarHome = () => {
        navigate("/");
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setRolagem(true);
        } else {
            setRolagem(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={rolagem ? styles["nav-movment"] : styles["nav"]} id='nav'>
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
