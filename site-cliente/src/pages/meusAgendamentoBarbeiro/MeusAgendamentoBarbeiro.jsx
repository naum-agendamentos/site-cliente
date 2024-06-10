// src/pages/SchedulePage.js
import React from 'react';
import AgendBarb from '../../components/AgendBarb/AgendBarb';
import NavBar from '../../components/navbarBarbeiro/NavbarBarbeiro';
import styles from './MeusAgendamentoBarbeiro.module.css';

const MeusAgendamentosBarbeiro = () => {

    return (
        <div class="borda-gradiente-left">
            <div class="borda-gradiente-right">
                <NavBar />
                <div className={styles["container-calendario"]}>
                    <div>
                        <h1>Agenda de Barbeiros</h1>
                        <AgendBarb />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MeusAgendamentosBarbeiro;