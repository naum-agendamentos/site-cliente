import React from "react";
import style from './Home.module.css';
import NavBar from './../../components/navbar/NavBar';
import Footer from "../../components/footer/Footer";

//Import Home
import LogoHome from '../../utils/assets/logo/LogoVetorizada-home.png';

//Import sobre
import ImagemSobre from '../../utils/assets/imagemBarbeiroSobre.png';

//Import serviços
import CorteServico from '../../utils/assets/corte.png';

//Import trabalho
import Corte1 from '../../utils/assets/cortes/corte1.png';
import Corte2 from '../../utils/assets/cortes/corte2.png';
import Corte3 from '../../utils/assets/cortes/corte3.png';
import Corte4 from '../../utils/assets/cortes/corte4.png';
import Corte5 from '../../utils/assets/cortes/corte5.png';
import Corte6 from '../../utils/assets/cortes/corte6.png';

//Import Agendar
import ImagemAgendar from '../../utils/assets/agendar.png';

//Import Localizacao
import ImagemLocalizacao from '../../utils/assets/barbeariaLocalizacao.png';




const homePage = () => {
    return (
        // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM
        <>

            <NavBar />
            <header>
                <div className={style["header-content"]}>
                    <img src={LogoHome} alt="Barbearia-tm" />
                    <div className={style["text-home"]}>
                        <h1 element-anime="center">BARBEARIA
                        </h1>
                        <p element-anime="center">Um novo conceito de barbearia<br />
                            Agende agora o seu corte e eleve o seu visual<br />
                            para outro nível!
                        </p>
                    </div>
                </div>
            </header>

            <div class="borda-gradiente-left">
                <div class="borda-gradiente-right">
                    <section className={style["SobreNos"]} id="SobreNos">
                        <div className={style["section-title"]}>
                            <h1 element-anime="appear">AGENDE SEU CORTE A QUALQUER<br /> MOMENTO
                            </h1>
                            <p element-anime="center">Conveniência e elegância em um só lugar.<br />
                                Nosso sistema de agendamento online permite que você agende<br /> seu corte de
                                maneira <span>fácil e rápido</span>!</p>

                            <div>
                                <br /><br />
                                <a href="#agendar" element-anime="center">AGENDAR</a>
                            </div>
                        </div>
                        <div className={style["img-barbeiro"]}>
                            <img src={ImagemSobre} alt="barb-sobre" />
                        </div>
                    </section>
                </div>
            </div>



            <section className={style["Servicos"]} id="Servicos">
                <h1 className={style["section-title-servicos"]} element-anime="left">TIPOS DE SERVIÇO
                </h1>
                <div className={style["cards"]}>
                    <div className={style["servicos-info"]}>
                        <div className={style["info-card"]}>
                            <div>
                                <img src={CorteServico} alt="agenda" />
                            </div>
                            <h2>Luzes
                                <br />R$ 20,00
                            </h2>
                            <p>
                                Mechas bem finas espalhadas ao longo de<br /> todos os fios da cabeça,
                                mesclando-as<br /> com a
                                cor natural<br /> do cabelo

                            </p>
                        </div>
                    </div>
                    <div className={style["servicos-info"]}>
                        <div>
                            <img src={CorteServico} alt="estrela" />
                        </div>
                        <div className={style["info-card"]}>
                            <h2>Platinado
                                <br />R$ 40,00
                            </h2>
                            <p>
                                Transforme-se com nosso serviço de platinado,<br /> onde o ouro encontra o estilo e a
                                ousadia se une<br /> ao brilho. Deixe-nos elevar seu visual a um nov<br />o patamar de
                                sofisticação
                            </p>
                        </div>
                    </div>
                    <div className={style["servicos-info"]}>
                        <div>
                            <img src={CorteServico} alt="grafico" />
                        </div>
                        <div className={style["info-card"]}>
                            <h2>Barba
                                <br />R$ 20,00
                            </h2>
                            <p>
                                Redefina sua identidade com cada fio da<br /> sua barba. Nosso serviço não é apenas
                                um<br /> corte, é uma assinatura de estilo, uma<br /> declaração de elegância
                            </p>
                        </div>
                    </div>
                </div>
                <div className={style["cards"]}>
                    <div className={style["servicos-info"]}>
                        <div>
                            <img src={CorteServico} alt="sino" />
                        </div>
                        <div className={style["info-card"]}>
                            <h2>Progressiva
                                <br />R$ 35,00
                            </h2>
                            <p>
                                Alise seu caminho para a perfeição. Com<br /> nossa progressiva, oferecemos mais
                                do<br /> que cabelos lisos; oferecemos a liberdade<br /> de ser quem você quer ser
                            </p>
                        </div>
                    </div>
                    <div className={style["servicos-info"]}>
                        <div>
                            <img src={CorteServico} alt="barbeiro" />
                        </div>
                        <div className={style["info-card"]}>
                            <h2>Pigmentação
                                <br />R$ 30,00
                            </h2>
                            <p>
                                Preencha as lacunas da expressão com<br /> nossa pigmentação de barba. É mais do<br />
                                que cor; é a confiança de um visual<br /> completo e definido
                            </p>
                        </div>
                    </div>
                    <div className={style["servicos-info"]}>
                        <div>
                            <img src={CorteServico} alt="barbeiro" />
                        </div>
                        <div className={style["info-card"]}>
                            <h2>Colometria
                                <br />R$ 40,00
                            </h2>
                            <p>
                                Pinte sua personalidade em cada mecha<br /> com nossa colometria. Não é apenas
                                sobre<br /> mudar a cor, é sobre criar a sua própria<br /> paleta de cores
                            </p>
                        </div>
                    </div>
                </div>
                <div className={style["final"]}>
                    <h1>E MUITO MAIS . . .</h1>
                </div>
            </section>


            <section className={style["NossoTrabalho"]} id="NossoTrabalho">
                <h1 className={style["section-title-trabalho"]} element-anime="center">NOSSO TRABALHO
                </h1>
                <br />
                <div className={style["cards-trabalho"]}>
                    <div className={style["trabalho-info"]}>
                        <div className={style["info-card-trabalho"]}>
                            <div>
                                <img src={Corte1} alt="corte1" />
                            </div>
                        </div>
                    </div>
                    <div className={style["trabalho-info"]}>
                        <div className={style["info-card-trabalho"]}>
                            <div>
                                <img src={Corte2} alt="corte2" />
                            </div>
                        </div>
                    </div>
                    <div className={style["trabalho-info"]}>
                        <div className={style["info-card-trabalho"]}>
                            <div>
                                <img src={Corte3} alt="corte3" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style["cards-trabalho"]}>
                    <div className={style["trabalho-info"]}>
                        <div className={style["info-card-trabalho"]}>
                            <div>
                                <img src={Corte4} alt="corte4" />
                            </div>
                        </div>
                    </div>
                    <div className={style["trabalho-info"]}>
                        <div className={style["info-card-trabalho"]}>
                            <div>
                                <img src={Corte5} alt="corte5" />
                            </div>
                        </div>
                    </div>
                    <div className={style["trabalho-info"]}>
                        <div className={style["info-card-trabalho"]}>
                            <div>
                                <img src={Corte6} alt="corte6" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className={style["Agendar"]}>

                <h1 className={style["agendar-title"]}>FAÇA SEU AGENDAMENTO AGORA
                    <br /><span>E GARANTA SUA VAGA</span>
                </h1>

                <div className={style["card-agendar"]} id="Agendar">
                    <div class="agendar-info">
                        <div>
                            <img src={ImagemAgendar} alt="Agendar" />
                        </div>
                    </div>
                    <div>
                        <a href="#agendar">AGENDAR</a>
                    </div>
                </div>


            </section>


            <section className={style["Localizacao"]} id="Localizacao">

                <div className={style["section-title"]}>
                    <h1>NOSSA LOCALIZAÇÃO
                    </h1>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d270.43141581466153!2d-46.40381648824315!3d-23.55258583302399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce65a8f2ab6373%3A0x7f46e5f281cff8f3!2sBarbearia%20Tm!5e0!3m2!1spt-BR!2sbr!4v1713023772249!5m2!1spt-BR!2sbr"
                        className={style["info-localizacao"]}  allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade" title="Localização barbearia">

                    </iframe>
                    <p element-anime="center">ENDEREÇO: R. Castanho da Silva, 331 - Vila Abc</p>
                </div>
                <div className={style["img-local-barber"]}>
                    <img src={ImagemLocalizacao} alt="localizacao" />
                </div>


            </section>


            <Footer />

        </>
    );
};
// Exporta o componente Home para que possa ser usado em outras partes da aplicação
export default homePage;