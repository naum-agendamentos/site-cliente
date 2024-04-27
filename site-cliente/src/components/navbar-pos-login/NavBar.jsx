import React from 'react';
import styles from './NavBar.module.css';
import logoTmNav from '../../utils/assets/logo/LogoVetorizada-grande.png';
const NavBar = () => {
    return (
        <div className={styles["container-navbar"]} id='nav'>
            <img src={logoTmNav} className={styles["logo"]} alt="logo-tm"/>
            <ul className={styles["navbar"]}>
                <li className={styles["option"]}>Agendamentos</li>
                <li className={styles["option"]}>Meus Agendamentos</li>
                <li className={styles["option"]}>Mural</li>
                <li className={styles["option"]}>Meus Dados</li>
                <li className={styles["option"]}>Avaliar</li>
                <li className={styles["option"]}>Sair</li>
            </ul>

        </div>
    );

};
export default NavBar;