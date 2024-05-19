import React from "react";
import Home from "./pages/home/Home";
import MeusDados from "./pages/meusDados/MeusDados";
import Agendamento from "./pages/agendarHorario/AgendamentoHorario";
import EditarMeusDados from "./pages/editarMeusDados/EditarMeusDados";
import MeusAgendamentos from "./pages/meus-agendamentos/MeusAgendamentos";
import FinalizarAgendamento from './pages/finalizarAgendamento/FinalizarAgendamento';
import ListaServico from "./pages/listaServicos/ListaServico";
import CadastroBarbeiro from "./pages/cadastroBarbeiro/CadastroBarbeiro";
import EditarBarbeiro from "./pages/editarBarbeiro/editarBarbeiro";

import VisualizarBarbeiros from "./pages/barbeiros/Barbeiros";
import VerBarbeiros from "./pages/verBarbeiros/VerBarbeiros";
import NotFound from "./pages/notFound/NotFound";

import Login from "./pages/login/Login";
import CadastroCliente from "./pages/cadastroCliente/CadastroCliente";
import CadastroServiço from "./pages/cadastrarServico/CadastroServico";
import EditarServico from "./pages/editarServico/EditarServico";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/meus-dados/:id" element={<MeusDados/>}/>
                    <Route path="/agendanento-horario" element={<Agendamento/>}/>
                    <Route path="/editar-meus-dados/:id" element={<EditarMeusDados/>}/>
                    <Route path="/meus-agendamentos" element={<MeusAgendamentos/>}/>
                    <Route path="/finalizar-agendamento" element={<FinalizarAgendamento/>}/>
                    <Route path="/cadastro-barbeiro" element={<CadastroBarbeiro/>}/>
                    <Route path="/editar-barbeiro/:id" element={<EditarBarbeiro/>}/>
                    <Route path="/login" element={<Login/>}/>

                    <Route path="/barbeiros" element={<VisualizarBarbeiros/>}/>
                    <Route path="/ver-barbeiros" element={<VerBarbeiros/>}/>
                    <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
                    <Route path="/cadastro-servico" element={<CadastroServiço/>}/> 
                    <Route path="/editar-servico/:id" element={<EditarServico/>}/>
                    <Route path="/lista-servico" element={<ListaServico/>}/>
                    <Route path="/*" element={<NotFound/>}/>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;
