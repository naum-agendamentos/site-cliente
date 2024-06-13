import React from 'react';
import styles from './NavbarBarbeiro.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada-grande.png';
import { useNavigate } from "react-router-dom";
const NavbarBarbeiros = () => {

    const navigate = useNavigate();

    const barbeiro = () => {
        localStorage.setItem("pagAtual","barbeiro");
        navigate(`/barbeiros`);
    };

    const verBarbeiroAgend = () => {
        localStorage.setItem("pagAtual","verBarbAgend");
        navigate(`/ver-barbeiros`);
    };

    const dashboard = () => {
        localStorage.setItem("pagAtual","dashboard");
        navigate(`/dashboard`);
    };
    
    const servicos = () => {
        localStorage.setItem("pagAtual","servicos");
        navigate(`/lista-servico`);
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
                <li onClick={barbeiro}  className={localStorage.getItem("pagAtual") === "barbeiro" ? styles["option-selected"] : styles["option"]}>Barbeiros</li>
                <li onClick={verBarbeiroAgend} className={localStorage.getItem("pagAtual") === "verBarbAgend" ? styles["option-selected"] : styles["option"]}>Agendamentos</li>
                <li onClick={dashboard} className={localStorage.getItem("pagAtual") === "dashboard" ? styles["option-selected"] : styles["option"]}>Dashboard</li>
                <li onClick={servicos} className={localStorage.getItem("pagAtual") === "servicos" ? styles["option-selected"] : styles["option"]}>Serviços</li>
                <li onClick={sair} className={styles["option"]}>Sair</li>
            </ul>

        </div>
    );

};
export default NavbarBarbeiros;