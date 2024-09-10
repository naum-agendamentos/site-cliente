import React, { useState } from 'react';
import styles from './NavBar.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada-grande.png';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const meusDados = () => {
        localStorage.setItem("pagAtual","meusDados");

        navigate(`/meus-dados/${sessionStorage.getItem("userId")}`);
    };

    const servicos = () => {
        localStorage.setItem("pagAtual","servicos");
        navigate(`/agendanento-horario/null`);
    };

    const meusAgendamento = () => {
        localStorage.setItem("pagAtual","meusAgendamentos");
        navigate(`/meus-agendamentos`);
    };

    const avaliacao = () => {
        localStorage.setItem("pagAtual","avaliacao");
        navigate(`/avaliacao-barbearia`);
    };

    const mural = () => {
        localStorage.setItem("pagAtual","mural");
        navigate(`/mural`);
    };

    const sair = () => {
        navigate(`/login`);
        sessionStorage.clear();
    };
    const home = () => {
        navigate(`/`);
        sessionStorage.clear();
    }

    return (
        <div className={styles["container-navbar"]} id='nav'>
            <img onClick={home} src={logoTmNav} className={styles["logo"]} alt="logo-tm"/>
            <ul className={styles["navbar"]}>
                <li onClick={servicos} className={localStorage.getItem("pagAtual") === "servicos" ? styles["option-selected"] : styles["option"]}>Serviços</li>
                <li onClick={meusAgendamento} className={localStorage.getItem("pagAtual") === "meusAgendamentos" ? styles["option-selected"] : styles["option"]}>Meus Agendamentos</li>
                <li onClick={meusDados} className={localStorage.getItem("pagAtual") === "meusDados" ? styles["option-selected"] : styles["option"]}>Meus Dados</li>
                <li onClick={avaliacao} className={localStorage.getItem("pagAtual") === "avaliacao" ? styles["option-selected"] : styles["option"]}>Avaliar</li>
                <li onClick={mural} className={localStorage.getItem("pagAtual") === "mural" ? styles["option-selected"] : styles["option"]}>Mural</li>
                <li onClick={sair} className={styles["option"]}>Sair</li>
            </ul>
        </div>
    );
};

export default NavBar;
