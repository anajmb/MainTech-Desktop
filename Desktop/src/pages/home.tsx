import { Calendar, CheckCircle, CheckCircle2Icon, CheckCircleIcon, ClockFading, FileText, Grid2X2Plus, ListCheck, Logs, Plus, PlusIcon, UserPlus } from "lucide-react";
import Card from "../components/card";
import Sidebar from "../components/sidebar";
import "../styles/home.css"
import Header from "../components/header";

export default function Home() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                {/* <div> */}
                    <Header />
                {/* </div> */}
                <h2 className="tituloBemVindo">Bem-Vindo, </h2>

                <div className="containerCards">

                    {/* bloco 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', flex: 1 }}>

                        <div className="cardHomeDashboards">
                            <h3 className="tituloCard">Dashboards</h3>
                        </div>

                        <div className="acoesDashboards">
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Card>
                                    <div className="acoesDashboardsCard">
                                        <h3 className="acoesDashboardsTitulo">Tarefas</h3>
                                        <div className="acoesDashboardsCentro">
                                            <CheckCircle size={20} strokeWidth={2} color="#36A23D" />
                                            <h3 className="acoesDashboardsValue">85%</h3>
                                        </div>
                                        <h3 className="acoesDashboardsLabel">Concluídas</h3>
                                    </div>
                                </Card>

                                <Card >
                                    <div className="acoesDashboardsCard">
                                        <h3 className="acoesDashboardsTitulo">Total de Tarefas</h3>
                                        <div className="acoesDashboardsCentro">
                                            <ListCheck size={20} strokeWidth={1.5} color="#9500FF" />
                                            <h3 className="acoesDashboardsValue">15</h3>
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
                        </div>
                    </div>

                    {/* bloco 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
                        <div className="cardHomeAcoes">
                            <h3 className="tituloCard">Ações Rápidas</h3>

                            <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>

                                <div style={{ cursor: 'pointer' }}>
                                    <Card>
                                        <div className="acoesSubCard" style={{gap: '0.9em'}}>
                                            <PlusIcon size={45} strokeWidth={1.5} color="#CE221E" />
                                            <h3 className="acoesSubTitulo">Nova Tarefa</h3>
                                        </div>
                                    </Card>
                                </div>

                                <div style={{ cursor: 'pointer' }}>
                                    <Card >
                                        <div className="acoesSubCard">
                                            <Calendar size={32} strokeWidth={1.5} color="#438BE9" />
                                            <h3 className="acoesSubTitulo">Agenda</h3>
                                        </div>
                                    </Card>
                                </div>

                                <div style={{ cursor: 'pointer'}}>
                                    <Card >
                                        <div className="acoesSubCard">
                                            <UserPlus size={32} strokeWidth={1.5} color="#C300C7" />
                                            <h3 className="acoesSubTitulo">Criar Usuário</h3>
                                        </div>
                                    </Card>
                                </div>

                                <div style={{ cursor: 'pointer' }}>
                                    <Card >
                                        <div className="acoesSubCard">
                                            <Grid2X2Plus size={32} strokeWidth={1.5} color="#70CC88" />
                                            <h3 className="acoesSubTitulo">Máquinas</h3>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>


                        <div className="cardHomeAtividades">
                            <h3 className="tituloCard">Atividades Recentes</h3>

                            <div className="atividadeItem">
                                <p>pensar sobre esse card</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}