import React from 'react';
import styles from './NavbarBarbeiro.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada-grande.png';
import { useNavigate } from "react-router-dom";
const NavbarBarbeiros = () => {

    const navigate = useNavigate();

    const barbeiro = () => {
        navigate(`/barbeiros`);
    };

    const verBarbeiroAgend = () => {
        navigate(`/ver-barbeiros`);
    };
    
    const servicos = () => {
        navigate(`/lista-servico`);
    };

    const sair = () => {
        navigate(`/login`);
        sessionStorage.clear();
    };

    
    return (
        <div className={styles["container-navbar"]} id='nav'>
            <img src={logoTmNav} className={styles["logo"]} alt="logo-tm"/>
            <ul className={styles["navbar"]}>
                <li onClick={barbeiro} className={styles["option"]}>Barbeiros</li>
                <li onClick={verBarbeiroAgend} className={styles["option"]}>Agendamentos</li>
                <li className={styles["option"]}>Dashboard</li>
                <li onClick={servicos} className={styles["option"]}>Serviços</li>
                <li onClick={sair} className={styles["option"]}>Sair</li>
            </ul>

        </div>
    );

};
export default NavbarBarbeiros;