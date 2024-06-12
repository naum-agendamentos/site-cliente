import React from 'react';
import styles from './NavBar.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada-grande.png';
import { useNavigate } from "react-router-dom";
const NavBar = () => {

    const navigate = useNavigate();

    const meusDados = () => {
        navigate(`/meus-dados/${sessionStorage.getItem("userId")}`);
    };

    const servicos = () => {
        navigate(`/agendanento-horario/null`);
    };

    const meusAgendamento = () => {
        navigate(`/meus-agendamentos`);
    };
    const Avaliacao = () => {
    navigate(`/avaliacao-barbearia`)
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
                <li onClick={servicos} className={styles["option"]}>Serviços</li>
                <li onClick={meusAgendamento} className={styles["option"]}>Meus Agendamentos</li>
                <li onClick={meusDados} className={styles["option"]}>Meus Dados</li>
                <li onClick={Avaliacao} className={styles["option"]}>Avaliar</li>
                <li onClick={sair} className={styles["option"]}>Sair</li>
            </ul>

        </div>
    );

};
export default NavBar;