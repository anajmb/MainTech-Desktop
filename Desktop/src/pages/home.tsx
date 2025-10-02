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
                <h1>Home</h1>
                <div className="containerCards">

                    <div>
                        <h3 className="tituloCard">Dashboards</h3>
                    </div>

                    <div>
                        <h3 className="tituloCard">Ações Rápidas</h3>

                        <Card>
                            <div className="acoesSubCard">
                                <Plus color="#CE221E" />
                                <h3>Nova Tarefa</h3>
                            </div>
                        </Card>

                        <Card >
                            <div className="acoesSubCard">
                                <Calendar color="#438BE9" />
                                <h3>Agenda</h3>
                            </div>
                        </Card>

                        <Card >
                            <div className="acoesSubCard">
                                <UserPlus color="#C300C7" />
                                <h3>Criar Usuário</h3>
                            </div>
                        </Card>

                        <Card >
                            <div className="acoesSubCard">
                                <Grid2X2Plus />
                                <h3>Máquinas</h3>
                            </div>
                        </Card>
                    </div>
                </div>

                <div>
                    <div></div>
                </div>
                <div>
                    <h3 className="tituloCard">Atividades Recentes</h3>
                </div>
            </div >
        </div >
    )
}