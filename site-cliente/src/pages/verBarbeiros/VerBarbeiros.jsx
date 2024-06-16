// Importa as dependências necessárias, incluindo React, estilos específicos, componentes e a imagem do logotipo.
//import api from "../../api"; // Importa a instância da API para fazer chamadas HTTP
import styles from "./VerBarbeiros.module.css"; // Importa o arquivo de estilos CSS para este componente
import React, { useState, useEffect } from "react"; // Importa React, useState e useEffect de 'react'
import NavbarBarbeiros from "../../components/navbarBarbeiro/NavbarBarbeiro"; // Importa o componente NavBar
import CardBarbeiros from "../../components/cardBarbeiros/CardVerBarbeiro"; // Importa o componente CardBarbeiros
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerBarbeiros = () => {
    const [cardsData, setCardsData] = useState();

    function recuperarValorDoCard() {
        const options = {
            method: 'GET',
            url: 'https://api-rest-naum.azurewebsites.net/barbeiros',
            headers: {
              'User-Agent': 'insomnia/8.6.1',
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        
        axios.request(options)
            .then(function (response) {
                // Atualiza o estado cardsData com os dados recebidos da API
                setCardsData(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // const navigate = useNavigate(); // Inicializa o hook de navegação

    // useEffect para chamar a função recuperarValorDoCard() quando o componente é montado
    useEffect(() => {
        recuperarValorDoCard();
    }, []) // O array vazio como segundo argumento significa que o efeito será executado apenas uma vez, após a montagem inicial do componente


    const token = sessionStorage.getItem('token');

    console.log(token);
    // Renderiza o componente
    return (
        // Fragmento React para agrupar os elementos retornados
        <>

            <div class="borda-gradiente-left">
                <div class="borda-gradiente-right">
                    <NavbarBarbeiros />

                    <section className={styles["barbeiros"]} id="barbeiros">

                        <h1 className={styles["section-title"]}>SELECIONE O BARBEIRO:</h1>
                    </section>
                    <div className={styles["content-barbeiros"]}>
                        {cardsData && cardsData.map((data, index) => (
                            <div key={index}>
                                <CardBarbeiros
                                    id={data.id}
                                    foto={data.foto}
                                    nome={data.nome}
                                    email={data.email}
                                    telefone={data.telefone}
                                    descricao={data.descricao}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
// Exporta o componente Musicas para uso em outras partes da aplicação
export default VerBarbeiros;