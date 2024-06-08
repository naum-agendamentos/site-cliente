import React, { useState } from 'react';
import styles from './AvaliacaoBarbearia.module.css';
import Navbar from '../../components/navbar-pos-login/NavBar';
import CardBarbearia from '../../components/cardBarbearia/CardBarbearia';
import axios from "axios";
import { toast } from "react-toastify";

function AvaliacaoBarbearia() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const handleSave = () => {
        const options = {
            method: 'POST',
            url: `http://localhost:8080/avaliacoes/1`,
            params: { idCliente: sessionStorage.getItem("idCliente") },
            data: {
                qtdEstrela: rating
            },
            headers: {
                'User-Agent': 'insomnia/9.2.0',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        axios.request(options).then(function (response) {
            toast.success("Barbearia avaliada! Obrigado");
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
            toast.error(error);
        });
    };
    return (
        <div>

            <div class="borda-gradiente-left">
                <div class="borda-gradiente-right">
                    <div className={styles["container-avaliacao"]}>

                        <Navbar />
                        <div className={styles["container-avalia"]}>

                            <div className={styles["avaliacao"]}>
                                <h2 className={styles["h2-avaliacao"]}>Avaliação da Barbearia</h2>
                                <CardBarbearia />
                                <div className={styles["stars"]}>
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={index <= (hover || rating) ? styles["on"] : styles["off"]}
                                                onClick={() => setRating(index)}
                                                onMouseEnter={() => setHover(index)}
                                                onMouseLeave={() => setHover(rating)}
                                            >
                                                <span className={styles["star"]}>&#9733;</span>
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
        </div>
    );
}

export default AvaliacaoBarbearia;