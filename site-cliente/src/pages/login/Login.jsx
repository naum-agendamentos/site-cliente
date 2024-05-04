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

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }
    const handleLogin = () => {
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
                navigate("/barbeiros");
            }
            else {
                sessionStorage.setItem("token", response.data.token);
                navigate("/finalizar-agendamento");
            }


        }).catch(() => {
            toast.error("Email ou senha inválidos!");
        })
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
                                    className={style["input-form"]}
                                    type="text"
                                    placeholder="usuario@gmail.com"
                                    value={email}
                                    onChange={(e) => handleInputChange(e, setEmail)}
                                />
                                <div className={style["container-input"]}>
                                    <p>SENHA</p>
                                    <input
                                        className={style["input-form"]}
                                        type="password"
                                        placeholder="***********"
                                        value={senha}
                                        onChange={(e) => handleInputChange(e, setSenha)}
                                    />
                                </div>
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