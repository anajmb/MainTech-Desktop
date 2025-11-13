import { Clock, Plus } from "lucide-react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import "../../styles/tarefas.css"
import { Link } from "react-router-dom";
import CardBranco from "../../components/cardBranco";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { api } from "../../lib/axios";

// add a O.S.

type Task = {
    id: number;
    title: string;
    description?: string;
    inspectorId?: number;
    machineId?: number;
    status: "PENDING" | "COMPLETED" | string;
    updateDate?: string;
};

export default function Tarefas() {

    const { user } = useAuth();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filtro, setFiltro] = useState<"todas" | "pendente" | "concluida">("todas");
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        async function fetchTasks() {
            if (!user) return;
            setLoading(true);

            try {
                const params: any = {};

                if (filtro === "pendente") params.status = "PENDING";
                if (filtro === "concluida") params.status = "COMPLETED";

                // se inspector (ou manutentor), traz só as tarefas dele
                if (user.role === "INSPECTOR" || user.role === "MANUTENTOR") {
                    params.inspectorId = (user as any).id;
                }

                if (query.trim()) params.q = query.trim(); // seu backend pode suportar 'q' ou 'title' — ajuste conforme API

                const res = await api.get("/tasks/get", { params });
                setTasks(res.data || []);
            } catch (err) {
                console.error("Erro ao buscar tarefas:", err);
                setTasks([]);
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, [filtro, query, user]);


    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="tituloPage">Tarefas </h2>

                    {user?.role === "ADMIN" && (
                        <Link to="/tarefas/nova" style={{ textDecoration: 'none' }}>
                            <div className="divNovaTarefa">
                                <Plus size={22} color="#fff" />
                                <h3 className="buttonTitulo">Nova Tarefa</h3>
                            </div>
                        </Link>
                    )}
                </div>

                <div className="filtrosRow">
                    <button
                        className={`filtroBtn ${filtro === "todas" ? "ativo" : ""}`}
                        onClick={() => setFiltro("todas")}
                    >
                        Todas
                    </button>
                    <button
                        className={`filtroBtn ${filtro === "pendente" ? "ativo" : ""}`}
                        onClick={() => setFiltro("pendente")}
                    >
                        Pendentes
                    </button>
                    <button
                        className={`filtroBtn ${filtro === "concluida" ? "ativo" : ""}`}
                        onClick={() => setFiltro("concluida")}
                    >
                        Concluídas
                    </button>
                </div>

                <div className="containerCards">
                    {loading ? (
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: 40 }}>
                            <div className="spinner" />
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="emptyState">Nenhuma tarefa encontrada.</div>
                    ) : (
                        // <div className="cardsGrid">
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1.2em', justifyContent: 'flex-start'}}>
                            {tasks.map((task) => (
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', justifyContent: 'left', alignItems: 'flex-start' }}> */}
                                        <CardBranco>
                                            <div className="itemCardInner">
                                                <div className="itemCard">
                                                    <div className="infoCard">
                                                        <h3 className="tituloCardMenor">{task.title}</h3>
                                                        <p className="descricaoCard">{task.description ?? "Sem descrição"}</p>
                                                    </div>

                                                    <div className="metaCard">
                                                        {/* <Minus strokeWidth={5} color={task.status === "COMPLETED" ? "#28A745" : "#FFD240"} /> */}
                                                    <div className="etiquetaCard" style={{ backgroundColor: task.status === "COMPLETED" ? "#28A745" : "#FFD240", padding: "0.25em 1em", borderRadius: "20px" }} ></div>

                                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                            <Clock size={16} color="#FF9705" />
                                                            <span className="dataText">{task.updateDate ? new Date(task.updateDate).toLocaleDateString() : ""}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBranco>
                                    </div>
                                // </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}