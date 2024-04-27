import React from "react";
import Home from "./pages/home/Home";
import MeusDados from "./pages/meusDados/MeusDados";
import EditarMeusDados from "./pages/editarMeusDados/EditarMeusDados"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/meus-dados" element={<MeusDados/>}/>
                    <Route path="/editar-meus-dados" element={<EditarMeusDados/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;