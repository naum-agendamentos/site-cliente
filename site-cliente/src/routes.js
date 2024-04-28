import React from "react";
import Home from "./pages/home/Home";
import MeusDados from "./pages/meusDados/MeusDados";
import EditarMeusDados from "./pages/editarMeusDados/EditarMeusDados";
import CadastroBarbeiro from "./pages/cadastroBarbeiro/CadastroBarbeiro";
import EditarBarbeiro from "./pages/editarBarbeiro/EditarBarbeiro";
import Login from "./pages/login/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/meus-dados" element={<MeusDados/>}/>
                    <Route path="/editar-meus-dados" element={<EditarMeusDados/>}/>
                    <Route path="/cadastro-barbeiro" element={<CadastroBarbeiro/>}/>
                    <Route path="/editar-barbeiro" element={<EditarBarbeiro/>}/>
                    <Route path="/login" element={<Login/>}/>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;