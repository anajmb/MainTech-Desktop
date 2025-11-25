import { useEffect, useState } from "react";
import { Clock, } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { api } from "../../lib/axios";
import "../../styles/tarefas.css";
import { Link, useNavigate } from "react-router-dom";


export default function OrdemServico() {

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 className="tituloPage">Ordem de Serviço</h2>
                </div>

                {/* Filtros */}
                
                <div className="containerCards" style={{ justifyContent: "left" }}>

                </div>
            </div>
        </div>
    );
}
