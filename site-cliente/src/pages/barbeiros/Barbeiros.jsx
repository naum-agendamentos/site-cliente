// Importa as dependências necessárias, incluindo React, estilos específicos, componentes e a imagem do logotipo.
import api from "../../api"; // Importa a instância da API para fazer chamadas HTTP
import styles from "./Barbeiros.module.css"; // Importa o arquivo de estilos CSS para este componente
import React, { useState, useEffect } from "react"; // Importa React, useState e useEffect de 'react'
import NavbarBarbeiros from "../../components/navbarBarbeiro/NavbarBarbeiro"; // Importa o componente NavBar
import CardBarbeiros from "../../components/cardBarbeiros/CardBarbeiros"; // Importa o componente CardBarbeiros
import { useNavigate } from "react-router-dom";

const Barbeiros = () => {
    const [cardsData, setCardsData] = useState();

    function recuperarValorDoCard() {
        api.get().then((response) => {
            const { data } = response;
            console.log(response)
            setCardsData(data)
        }).catch(() => {
            console.log("Deu erro, tente novamente!") // Caso haja um erro na requisição, exibe uma mensagem no console
        })
    }

    const navigate = useNavigate(); // Inicializa o hook de navegação

    const CadasBarbeiro = () => { // Função chamada ao clicar em cancelar
        navigate("/cadastro-barbeiro"); // Redireciona para a página de músicas
    };

    /*
    EXEMPLO DE POST 
        const novaMusica = {
        nomeMusica: "Nova Música",
        artista: "Novo Artista",
        genero: "Novo Gênero",
        ano: "2024-01-01T00:00:00.000Z",
        imagem: "https://exemplo.com/nova-imagem.jpg"
    };

    api.post('/caminhoParaMusica', novaMusica)
        .then((response) => {
            console.log('Música adicionada com sucesso', response.data);
            // Atualizar a UI aqui, se necessário
        })
        .catch((erro) => {
            console.error('Erro ao adicionar música', erro);
        });

    EXEMPLO DE PUT
    function atualizarMusica() {
    const musicaAtualizada = {
        nomeMusica: "Música Atualizada",
        artista: "Artista Atualizado",
        genero: "Gênero Atualizado",
        ano: "2024-01-02T00:00:00.000Z",
        imagem: "https://exemplo.com/imagem-atualizada.jpg"
    };

    const musicaId = "1"; // ID da música a ser atualizada

    api.put(`/caminhoParaMusica/${musicaId}`, musicaAtualizada)
        .then((response) => {
            console.log('Música atualizada com sucesso', response.data);
            // Atualizar a UI aqui, se necessário
        })
        .catch((erro) => {
            console.error('Erro ao atualizar música', erro);
        });
    }

    EXEMPLO DE DELETE
    function deletarMusica() {
    const musicaId = "1"; // ID da música a ser deletada

    api.delete(`/caminhoParaMusica/${musicaId}`)
        .then((response) => {
            console.log('Música deletada com sucesso', response.data);
            // Atualizar a UI aqui, se necessário
        })
        .catch((erro) => {
            console.error('Erro ao deletar música', erro);
        });
    }

    */

    // useEffect para chamar a função recuperarValorDoCard() quando o componente é montado
    useEffect(() => {
        recuperarValorDoCard();
    }, []) // O array vazio como segundo argumento significa que o efeito será executado apenas uma vez, após a montagem inicial do componente

    // Renderiza o componente
    return (
        // Fragmento React para agrupar os elementos retornados
        <>

            <div class="borda-gradiente-left">
                <div class="borda-gradiente-right">
                    <NavbarBarbeiros />

                    <section className={styles["barbeiros"]} id="barbeiros">

                        <h1 className={styles["section-title"]}>BARBEIROS:</h1>

                        <div className={styles["add-barb"]}>
                            <a onClick={CadasBarbeiro} href="#adicionar">+</a>
                        </div>
                    </section>
                    <div className={styles["content-barbeiros"]}>
                        {cardsData && cardsData.map((data, index) => (
                            <div key={index}>
                                <CardBarbeiros
                                    id={data.id}
                                    foto={data.foto}
                                    nome={data.nome}
                                    email={data.email}
                                    celular={data.celular}
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
export default Barbeiros;