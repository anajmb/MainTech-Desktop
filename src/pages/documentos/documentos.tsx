import { useEffect, useState } from "react";
import { Clock, } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { api } from "../../lib/axios";
import "../../styles/tarefas.css";
import { Link, useNavigate } from "react-router-dom";

// add a O.S.
// quando a O.S for recusada, onde ela vai aparecer?

// Tipagem da resposta da API
interface OrdemServico {
    id: number;
    machineId: number;
    priority: "low" | "medium" | "high";
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    payload: any;
    createdAt: string;
}

// Função para formatar datas
function formatarData(isoString: string) {
    try {
        const data = new Date(isoString);
        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0");
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    } catch {
        return "Data     inválida";
    }
}

export default function Documentos() {
    const [ordens, setOrdens] = useState<OrdemServico[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("todas");

    useEffect(() => {
        async function fetchOrdens() {
            try {
                const response = await api.get("/serviceOrders/get");
                setOrdens(response.data || []);
            } catch (error) {
                console.error("Erro ao buscar ordens:", error);
                alert("Erro ao carregar documentos.");
            } finally {
                setLoading(false);
            }
        }
        fetchOrdens();
    }, []);

    // Filtro dinâmico
    const ordensFiltradas = ordens.filter((ordem) => {
        if (filtro === "todas") return true;
        if (filtro === "analise") return ordem.status === "PENDING" || ordem.status === "IN_PROGRESS";
        if (filtro === "concluida") return ordem.status === "COMPLETED";
        return true;
    });

    // Função para definir cor da etiqueta conforme status
    const getEtiquetaCor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "#FFD240"; // laranja
            case "IN_PROGRESS":
                return "#FFD240"; // azul
            case "COMPLETED":
                return "#28A745"; // verde
            default:
                return "#ccc";
        }
    };

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 className="tituloPage">Documentos</h2>
                </div>

                {/* Filtros */}
                <div className="filtrosRow">
                    <button
                        onClick={() => setFiltro("todas")}
                        className={filtro === "todas" ? "filtroBtn ativo" : "filtroBtn"}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setFiltro("analise")}
                        className={filtro === "analise" ? "filtroBtn ativo" : "filtroBtn"}
                    >
                        Em análise
                    </button>
                    <button
                        onClick={() => setFiltro("concluida")}
                        className={filtro === "concluida" ? "filtroBtn ativo" : "filtroBtn"}
                    >
                        Concluídas
                    </button>
                </div>

                {/* Lista de documentos */}
                <div className="containerCards" style={{ justifyContent: "left" }}>
                    {loading ? (
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: 40 }}>
                            <div className="spinner" />
                        </div>
                    ) : ordensFiltradas.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#888" }}> Nenhum documento encontrado para este filtro. </p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "row", gap: "2em 2em", flexWrap: "wrap" }} >
                            {ordensFiltradas.map((ordem) => (
                                <Link to={'/documentos/ordem-servico'}>
                                    <div>
                                        <CardBranco key={ordem.id}>
                                            <div className="itemCard" style={{ cursor: 'pointer', justifyContent: 'center' }}>
                                                <div className="infoCard">

                                                    <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                                                        {/* <FileText size={18} color="#CF0000" /> */}
                                                        <h3 className="tituloCardMenor" >Ordem de Serviço #{ordem.id}</h3>
                                                    </div>

                                                    <div className="metaCard" style={{ marginTop: '0.5em' }}>
                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} >
                                                            <div className="etiquetaCard" style={{ backgroundColor: getEtiquetaCor(ordem.status), padding: "0.25em 1em", borderRadius: "20px", }} ></div>
                                                        </div>

                                                        <div style={{ display: "flex", alignItems: "center", }}>
                                                            <Clock size={16} color="#FF9705" />
                                                            <p style={{ display: 'flex', alignItems: 'center', margin: 0, fontSize: '0.8em', paddingLeft: '0.4em', color: '#858585' }}>
                                                                {formatarData(ordem.createdAt)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </CardBranco>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
