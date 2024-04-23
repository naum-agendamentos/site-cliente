import React from 'react';
import styles from './Footer.module.css';

import logoFooter from '../../utils/assets/logo/LogoVetorizadaFooter.png';
import setaFooter from '../../utils/assets/arrow-climb-up.png';

const Footer = () => {
    return (
        <footer className={styles["footer"]} id="Footer">
            <div className={styles["container-content"]}>

                <img src={logoFooter} alt="Logo"/>
                <div className={styles["footer-content"]}>
                    <ul>
                        <li>SESSÕES DO SITE</li>
                        <li><a href="#SobreNos">Sobre </a></li>
                        <li><a href="#Servicos">Tipos de Serviço</a></li>
                        <li><a href="#NossoTrabalho">Nosso Trabalho</a></li>
                        <li><a href="#Agendar">Agendar</a></li>
                        <li><a href="#Localizacao">Localização</a></li>
                    </ul>
                    <ul>
                        <li></li>
                        <li><a href="#Login">Login</a></li>
                        <li><a href="#Cadastro">Cadastro</a></li>
                        <li></li>
                        <li></li>
                        <li></li>

                    </ul>
                    <ul>
                        <li>CONTATO</li>
                        <li>(+55) 11 9999-9999</li>
                        <li>barbeariatm@hotmail.com</li>
                        <li>SITE FEITO POR: NA.UM</li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>


                <a href="#subir"> <img className={styles["select-disable"]} src={setaFooter} alt="Seta para subir"/>
                </a>

            </div>
        </footer>
    );

 };
 export default Footer;