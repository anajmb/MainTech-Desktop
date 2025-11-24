import { Calendar, CheckCircle, ClockFading, FileText, Grid2X2Plus, ListCheck, PlusIcon, UserPlus } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, } from "chart.js";
import Card from "../../components/card";
import Sidebar from "../../components/sidebar";
import "../../styles/home.css"
import Header from "../../components/header";
import CardBranco from "../../components/cardBranco";
import { Link } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import AtividadesRecentes from "../../components/ativRecente";
import { useAuth } from "../../contexts/authContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface Task {
    id: number;
    status: "PENDING" | "COMPLETED";
    updateDate: string;
}
// falta os gráficos de tempo medio, O.S. e o grande de dashboards
// falta o dashboard principal

export default function Home() {

    const { user } = useAuth()
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        api
            .get("/tasks/get")
            .then((res) => setTasks(res.data))
            .catch((err) => console.error("Erro ao buscar tarefas:", err));
    }, []);

    const completedTasks = tasks.filter((t) => t.status === "COMPLETED");
    const totalTasks = tasks.length;
    const percentageCompleted = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

    const completedByDay = new Array(7).fill(0);
    completedTasks.forEach((task) => {
        const dayIndex = new Date(task.updateDate).getDay();
        completedByDay[dayIndex] += 1;
    });

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloBemVindo">Bem-Vindo, {user?.name?.split(" ")[0] || "Usuário"}</h2>

                <div className="containerCards">

                    {/* bloco 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', flex: 1 }}>

                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Dashboards</h3>
                            </div>
                        </CardBranco>

                        <div>
                            <CardBranco>

                                <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <Card>
                                        <div className="acoesDashboardsCard">
                                            <h3 className="acoesDashboardsTitulo">Tarefas</h3>
                                            <div className="acoesDashboardsCentro">
                                                <CheckCircle size={20} strokeWidth={2} color="#36A23D" />
                                                <h3 className="acoesDashboardsValue">{percentageCompleted.toFixed(0)}%</h3>
                                            </div>
                                            <h3 className="acoesDashboardsLabel">Concluídas</h3>
                                        </div>
                                    </Card>

                                    <Card >
                                        <div className="acoesDashboardsCard">
                                            <h3 className="acoesDashboardsTitulo">Total de Tarefas</h3>
                                            <div className="acoesDashboardsCentro">
                                                <ListCheck size={20} strokeWidth={1.5} color="#9500FF" />
                                                <h3 className="acoesDashboardsValue">{totalTasks}</h3>
                                            </div>
                                            <h3 className="acoesDashboardsLabel">Neste mês</h3>
                                        </div>
                                    </Card>

                                    <Card >
                                        <div className="acoesDashboardsCard">
                                            <h3 className="acoesDashboardsTitulo">Tempo Médio</h3>
                                            <div className="acoesDashboardsCentro">
                                                <ClockFading size={20} strokeWidth={1.5} color="#4147D5" />
                                                <h3 className="acoesDashboardsValue">5 min</h3>
                                            </div>
                                            <h3 className="acoesDashboardsLabel">Checklist</h3>
                                        </div>
                                    </Card>

                                    <Card >
                                        <div className="acoesDashboardsCard">
                                            <h3 className="acoesDashboardsTitulo">O.S.</h3>
                                            <div className="acoesDashboardsCentro">
                                                <FileText size={20} strokeWidth={1.5} color="#DD78BB" />
                                                <h3 className="acoesDashboardsValue">8</h3>
                                            </div>
                                            <h3 className="acoesDashboardsLabel">Neste mês</h3>
                                        </div>
                                    </Card>
                                </div>
                            </CardBranco>
                        </div>
                    </div>

                    {/* bloco 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
                        <CardBranco>
                            <div className="cardHomeAcoes">

                                <h3 className="tituloCard">Ações Rápidas</h3>

                                <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>

                                    <Link to={'/tarefas/nova'} style={{ textDecoration: 'none', color: '#000' }}>
                                        <div style={{ cursor: 'pointer' }}>
                                            <Card>
                                                <div className="acoesSubCard" style={{ gap: '0.9em' }}>
                                                    <PlusIcon size={45} strokeWidth={1.5} color="#CE221E" />
                                                    <h3 className="acoesSubTitulo">Nova Tarefa</h3>
                                                </div>
                                            </Card>
                                        </div>
                                    </Link>

                                    <Link to={'agenda'} style={{ textDecoration: 'none', color: '#000' }}>
                                        <div style={{ cursor: 'pointer' }}>
                                            <Card >
                                                <div className="acoesSubCard">
                                                    <Calendar size={32} strokeWidth={1.5} color="#438BE9" />
                                                    <h3 className="acoesSubTitulo">Agenda</h3>
                                                </div>
                                            </Card>
                                        </div>
                                    </Link>

                                    <Link to={'/equipes/cadastrar-usuario'} style={{ textDecoration: 'none', color: '#000' }}>
                                        <div style={{ cursor: 'pointer' }}>
                                            <Card >
                                                <div className="acoesSubCard">
                                                    <UserPlus size={32} strokeWidth={1.5} color="#C300C7" />
                                                    <h3 className="acoesSubTitulo">Criar Usuário</h3>
                                                </div>
                                            </Card>
                                        </div>
                                    </Link>

                                    <Link to={'/maquinas'} style={{ textDecoration: 'none', color: '#000' }}>
                                        <div style={{ cursor: 'pointer' }}>
                                            <Card >
                                                <div className="acoesSubCard">
                                                    <Grid2X2Plus size={32} strokeWidth={1.5} color="#70CC88" />
                                                    <h3 className="acoesSubTitulo">Máquinas</h3>
                                                </div>
                                            </Card>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        </CardBranco>


                        <div className="cardHomeAtividades">
                            <CardBranco>
                                <h3 className="tituloCard">Atividades Recentes</h3>
                                <AtividadesRecentes />
                            </CardBranco>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}