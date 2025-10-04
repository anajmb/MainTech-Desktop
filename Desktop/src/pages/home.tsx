import { Calendar, Grid2X2Plus, Plus, UserPlus } from "lucide-react";
import Card from "../components/card";
import Sidebar from "../components/sidebar";
import "../styles/home.css"
import Header from "../components/header";

export default function Home() {
    return (
        <div className="containerGeralHome">
            <Sidebar />
            <div className="containerHome">
                <div className="containerHeader">
                    <Header />
                </div>
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
                                    <div className="acoesSubCard">
                                        <Plus size={50} strokeWidth={1.5} color="#CE221E" />
                                        <h3 className="acoesSubTitulo">Nova Tarefa</h3>
                                    </div>
                                </Card>

                                <Card >
                                    <div className="acoesSubCard">
                                        <Calendar size={38} strokeWidth={1.5} color="#438BE9" />
                                        <h3 className="acoesSubTitulo">Agenda</h3>
                                    </div>
                                </Card>

                                <Card >
                                    <div className="acoesSubCard">
                                        <UserPlus size={38} strokeWidth={1.5} color="#C300C7" />
                                        <h3 className="acoesSubTitulo">Criar Usuário</h3>
                                    </div>
                                </Card>

                                <Card >
                                    <div className="acoesSubCard">
                                        <Grid2X2Plus size={38} strokeWidth={1.5} color="#70CC88" />
                                        <h3 className="acoesSubTitulo">Máquinas</h3>
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
                                <Card>
                                    <div className="acoesSubCard">
                                        <Plus size={50} strokeWidth={1.5} color="#CE221E" />
                                        <h3 className="acoesSubTitulo">Nova Tarefa</h3>
                                    </div>
                                </Card>

                                <Card >
                                    <div className="acoesSubCard">
                                        <Calendar size={38} strokeWidth={1.5} color="#438BE9" />
                                        <h3 className="acoesSubTitulo">Agenda</h3>
                                    </div>
                                </Card>

                                <Card >
                                    <div className="acoesSubCard">
                                        <UserPlus size={38} strokeWidth={1.5} color="#C300C7" />
                                        <h3 className="acoesSubTitulo">Criar Usuário</h3>
                                    </div>
                                </Card>

                                <Card >
                                    <div className="acoesSubCard">
                                        <Grid2X2Plus size={38} strokeWidth={1.5} color="#70CC88" />
                                        <h3 className="acoesSubTitulo">Máquinas</h3>
                                    </div>
                                </Card>
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