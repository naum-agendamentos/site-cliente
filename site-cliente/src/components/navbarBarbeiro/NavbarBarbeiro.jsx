import React from 'react';
import styles from './NavbarBarbeiro.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada-grande.png';
const NavbarBarbeiros = () => {
    return (
        <div className={styles["container-navbar"]} id='nav'>
            <img src={logoTmNav} className={styles["logo"]} alt="logo-tm"/>
            <ul className={styles["navbar"]}>
                <li className={styles["option"]}>Barbeiros</li>
                <li className={styles["option"]}>Agendamentos</li>
                <li className={styles["option"]}>Dashboard</li>
                <li className={styles["option"]}>Serviços</li>
                <li className={styles["option"]}>Sair</li>
            </ul>

        </div>
    );

};
export default NavbarBarbeiros;