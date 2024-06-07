import React, { useState } from 'react';
import styles from './AvaliacaoBarbearia.module.css';
import NavbarBarbeiros from '../../components/navbarBarbeiro/NavbarBarbeiro';
import CardBarbearia from '../../components/cardBarbearia/CardBarbearia';

function AvaliacaoBarbearia() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const handleSave = () => {
        alert(`Avaliação salva: ${rating} estrelas`);
    };
    return (
        <div>

            <div class="borda-gradiente-left">
                <div class="borda-gradiente-right">
                    <NavbarBarbeiros />
                    <div className={styles.container}>

                        <div className={styles.avaliacao}>
                            <h2 className={styles["h2-avaliacao"]}>Avaliação da Barbearia</h2>
                            <CardBarbearia />
                            <div className={styles.stars}>
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= (hover || rating) ? styles.on : styles.off}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                            <span className="star">&#9733;</span>
                                        </button>
                                    );
                                })}
                            </div>
                            <p className={styles["p-avaliacao"]}>Sua avaliação: {rating} estrelas</p>
                            <div className={styles["container-btn"]}>
                                <button className={styles["button-cadastrar"]} type="button"
                                    onClick={handleSave}>CADASTRAR AVALIAÇÃO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AvaliacaoBarbearia;