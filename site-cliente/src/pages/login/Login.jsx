import api from "../../api";
import React, { useState } from "react";
import style from "./login.module.css"
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [inputValidEmail, setInputValidEmail] = useState("input-form");

    const [inputValidSenha, setInputValidSenha] = useState("input-form");
    

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }
    const handleLogin = () => {

        if (email === "" || senha === "") {
            toast.error("Preencha todos os campos");
            if (email === "") {
                setInputValidEmail("input-error");
            } else {
                setInputValidEmail("input-form");
            }
            if (senha === "") {
                setInputValidSenha("input-error");
            } else {
                setInputValidSenha("input-form");
            }
        } else {
            setInputValidEmail("input-form");
            setInputValidSenha("input-form");

        api.post("usuarios/login", {
            email,
            senha
        }).then((response) => {
            const { data } = response;
            const { userId, token, tipo } = data;

            console.log(tipo)
            console.log(token)
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('userId', userId)

            if (tipo === "BARBEIRO") {
                sessionStorage.setItem("token", response.data.token);
                toast.success("Login realizado com sucesso!")
                navigate("/barbeiros");
            }
            else {
                sessionStorage.setItem("token", response.data.token);
                toast.success("Login realizado com sucesso!")
                navigate(`/meus-dados/${sessionStorage.getItem("userId")}`);
            }


        }).catch(() => {
            toast.error("Email ou senha inválidos");
        })
    }
    }
    return (
        <>
            <div class="borda-gradiente-left">
                <div class="borda-gradiente-right">
                    <div className={style["container"]}>

                        <NavBar />
                        <div className={style["container-title"]}><h1 className={style["title"]}>LOGIN</h1></div>
                        <div className={style["container-form"]}>
                            <div className={style["container-input"]}>
                                <p>EMAIL</p>
                                <input
                                    className={style[inputValidEmail]}
                                    type="text"
                                    placeholder="usuario@gmail.com"
                                    value={email}
                                    onChange={(e) => handleInputChange(e, setEmail)}
                                />
                                <div className={style["container-input"]}>
                                    <p>SENHA</p>
                                    <input
                                        className={style[inputValidSenha]}
                                        type="password"
                                        placeholder="***********"
                                        value={senha}
                                        onChange={(e) => handleInputChange(e, setSenha)}
                                    />
                                </div>
                                <h5 className={style["h5-txt"]}>Não tem uma conta? <a className={style["h4-txt"]} href="../cadastro-cliente">clique aqui</a></h5>
                                <div className={style["container-btn"]}>
                                    <button className={style["button-alterar"]} type="button"
                                        onClick={handleLogin}>ENTRAR</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login;