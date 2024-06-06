import React from 'react';
import styles from './CardBarbearia.module.css';
import imagemParceiro from '../../utils/assets/logo/logoHeader.png';

function CardBarbearia() {
    return (
        <div className={styles.card}>
            <img src={imagemParceiro} alt="Imagem da Barbearia" className={styles.imagem} />
            
        </div>
    );
}

export default CardBarbearia;