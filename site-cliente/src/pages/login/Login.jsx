import api from "../../api";
import React, { useState, useEffect } from "react";
import style from "./login.module.css"
import { useNavigate } from "react-router-dom";
import ImgBarra from "../../utils/assets/barra-lateral.svg";
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
        api.post("/login", {
            email,
            senha
        }).then((response) => {
            sessionStorage.setItem("token", response.data.token);
            navigate("/home");
        }).catch(() => {
            toast.error("Email ou senha inválidos!");
        })
    }
    return (
        <>
            <div className={style["container"]}>
                <img src={ImgBarra} className={style["barraLeft"]} alt="" srcSet="" />
                <img src={ImgBarra} className={style["barraRight"]} alt="" srcSet="" />
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
        </>
    )
}

export default Login;