import React, { useState, useEffect } from 'react';
import styles from './Mural.module.css';
import Navbar from '../../components/navbarBarbeiro/NavbarBarbeiro';
import NavBarCliente from '../../components/navbar-pos-login/NavBar';
import CardMural from '../../components/cardMural/CardMural';
import axios from "axios";
import CloudinaryUploader from '../../components/uploadImg/CloudinaryUploader';
import { toast } from "react-toastify";

function Mural() {
    const [imageSrc, setImageSrc] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [nomeBarb] = useState(sessionStorage.getItem("nomeUser"));
    const currentDateTime = new Date().toISOString();
    const [userBarbeiro, setUserBarbeiro] = useState(false);
    const tipoUsuario = sessionStorage.getItem("tipoUser");
    const [tipo, setTipo] = useState('');

    const [apiMock] = useState("https://66d5c026f5859a70426752fb.mockapi.io/mural/aviso");
    const [aviso, setAviso] = useState([]);
    const [cardAtivo, setCardAtivo] = useState(false);
    const [visibleDates, setVisibleDates] = useState(2); // Controla quantas datas são exibidas

    useEffect(() => {
        recuperarValorDoCard();
        if (tipoUsuario === "BARBEIRO") {
            setUserBarbeiro(true);
        }
    }, []);


    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Imagem selecionada:', file.name);
            setSelectedFile(file);
        }
    }

    const ativarCard = () => {
        setCardAtivo(!cardAtivo);
    }

    const recuperarValorDoCard = () => {
        axios.get(apiMock)
            .then(function (response) {
                const { data } = response;
                setAviso(data);
            })
            .catch(function (error) {
                console.error(error);
            });
    };




    const handleSave = async () => {
       
        
        if (title.length < 3) {
            toast.warn('O título deve ter pelo menos 3 caracteres.');
            return;
        }
        if (description.length < 10) {
            toast.warn('A descrição deve ter pelo menos 10 caracteres.');
            return;
        }

        if (tipo === '') {
            toast.warn("Selecione o tipo do aviso");
            return;
        }

        if (tipoUsuario !== "BARBEIRO") {
            return;
        }
    
       
        const finalImageSrc = imageSrc || "https://res.cloudinary.com/dmgfyyioo/image/upload/v1724806186/vadpxfbqw7pnhhsogzvj.png";
    
        const postData = {
            titulo: title,
            descricao: description,
            imagem: finalImageSrc,
            nome: nomeBarb,
            datahora: currentDateTime,
            tipo: tipo
        };
    
        axios.post(apiMock, postData)
            .then(function (response) {
                const { data } = response;
                setAviso(prevAviso => [...prevAviso, data]);
                setCardAtivo(false);
                setTitle('');
                setDescription('');
                setImageSrc('');
                setTipo('');
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    

    const agruparPorData = (avisos) => {
        return avisos.reduce((acc, aviso) => {
            // Obtém a data e a hora separadas
            const data = new Date(aviso.datahora).toLocaleDateString("pt-BR");
            const hora = new Date(aviso.datahora).toLocaleTimeString("pt-BR", {
                hour: '2-digit',
                minute: '2-digit'
            });

            if (!acc[data]) {
                acc[data] = [];
            }
            // Adiciona a hora ao aviso para ordenação
            acc[data].push({ ...aviso, hora });
            return acc;
        }, {});
    }

    // Ordena os avisos dentro de cada grupo por hora e minuto
    const ordenarPorHora = (avisosAgrupados) => {
        const datasOrdenadas = Object.keys(avisosAgrupados).sort((a, b) => {
            const dateA = new Date(a.split('/').reverse().join('-'));
            const dateB = new Date(b.split('/').reverse().join('-'));
            return dateB - dateA;
        });

        return datasOrdenadas.reduce((acc, data) => {
            acc[data] = avisosAgrupados[data].sort((a, b) => {
                const [horaA, minutoA] = a.hora.split(':').map(Number);
                const [horaB, minutoB] = b.hora.split(':').map(Number);
                return horaB - horaA || minutoB - minutoA;
            });
            return acc;
        }, {});
    }

    const avisosAgrupados = agruparPorData(aviso);
    const avisosOrdenados = ordenarPorHora(avisosAgrupados);
    const datasOrdenadas = Object.keys(avisosOrdenados);

    // Função para mostrar mais datas
    const mostrarMais = () => {
        setVisibleDates(prev => prev + 2);
    }

    const handleDeleteAviso = (id) => {
        setAviso(aviso.filter(aviso => aviso.id !== id));
    };

    return (
        <div>
            <div className="borda-gradiente-left">
                <div className="borda-gradiente-right">
                    <div className={styles["container"]}>
                        {userBarbeiro ? <Navbar /> : <NavBarCliente />}

                        <div className={styles["container-mural"]}>

                            <div className={styles["adicionar-aviso"]}>
                                <button className={userBarbeiro ? styles["Btn"] : styles["Btn-off"]} onClick={ativarCard}>
                                    <div className={styles.sign}>+</div>
                                    <div className={styles.text}>Criar</div>
                                </button>
                            </div>

                            <div className={styles["parte-aviso"]}>


                                {datasOrdenadas.slice(0, visibleDates).map(data => (
                                    <div key={data} className={styles["data-group"]}>
                                        <h3>{data}</h3>
                                        <div className={styles["cardsContainer"]}>
                                            <div className={cardAtivo ? styles["card"] : styles["card-off"]}>
                                                <div className={styles["card-image"]}>
                                                    <label htmlFor="image-upload">
                                                        <img
                                                            src={imageSrc || "https://cdn3.iconfinder.com/data/icons/photo-tools/65/upload-1024.png"}
                                                            alt="Card"
                                                            style={{ cursor: "pointer" }}
                                                        />

                                                        <div className={styles["url-none"]}>
                                                            <CloudinaryUploader
                                                                file={selectedFile}
                                                                onUploadComplete={(url) => {
                                                                    setImageSrc(url);
                                                                }}
                                                            />
                                                        </div>

                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="image-upload"
                                                        accept="image/*"
                                                        style={{ display: "none" }}
                                                        onChange={handleImageUpload}
                                                    />
                                                </div>

                                                <div className={styles["form"]}>
                                                    <input className={styles["input"]} value={title} placeholder="Titulo" maxLength={50} onChange={(e) => setTitle(e.target.value)} required="" type="text" />
                                                    <span className={styles["input-border"]}></span>
                                                </div>

                                                <textarea
                                                    className={styles["card-body"]}
                                                    value={description}
                                                    placeholder="Digite o assunto aqui..."
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    style={{
                                                        marginLeft: "-2px",
                                                        width: "100%",
                                                        padding: "12px 6px",
                                                        borderRadius: "8px",
                                                        resize: "none",
                                                        color: "#fff",
                                                        height: "96px",
                                                        border: "1px solid #414141",
                                                        backgroundColor: "transparent",
                                                        fontFamily: "inherit",
                                                    }}
                                                />
                                                <p className={styles["footer"]}>
                                                    <div className={styles['radio-input']}>
                                                        <label>
                                                            <input value="URGENTE" name="value-radio" id="URGENTE" type="radio" onChange={(e) => setTipo(e.target.value)} />
                                                            <span>URGENTE</span>
                                                        </label>
                                                        <label>
                                                            <input value="ALERTA" name="value-radio" id="ALERTA" type="radio" onChange={(e) => setTipo(e.target.value)} />
                                                            <span>ALERTA</span>
                                                        </label>
                                                        <label>
                                                            <input value="INFO" name="value-radio" id="INFO" type="radio" onChange={(e) => setTipo(e.target.value)} />
                                                            <span>INFO</span>
                                                        </label>
                                                        <span className={styles['selection']}></span>
                                                    </div>
                                                    <button onClick={handleSave}>
                                                        <div className={styles["svg-wrapper-1"]}>
                                                            <div className={styles["svg-wrapper"]}>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    height="24"
                                                                >
                                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <span>ENVIAR</span>
                                                    </button>
                                                </p>
                                            </div>
                                            {avisosOrdenados[data].map((aviso, index) => (
                                                <CardMural
                                                    key={index}
                                                    id={aviso.id}
                                                    imageSrc={aviso.imagem}
                                                    title={aviso.titulo}
                                                    body={aviso.descricao}
                                                    author={aviso.nome}
                                                    date={aviso.datahora}
                                                    type={aviso.tipo}
                                                    user={tipoUsuario}
                                                    onDelete={handleDeleteAviso}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}


                            </div>

                            <div className={styles["part-ver-mais"]}>
                                {datasOrdenadas.length > visibleDates && (
                                    <button onClick={mostrarMais} className={styles["cta"]}>
                                        <span className={styles["hover-underline-animation"]}>Ver Mais</span>
                                        <svg
                                            id="arrow-horizontal"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="10"
                                            viewBox="0 0 46 16"
                                        >
                                            <path
                                                id="Path_10"
                                                data-name="Path 10"
                                                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                                transform="translate(30)"
                                            ></path>
                                        </svg>
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Mural;
