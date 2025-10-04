import { Clock, Plus } from "lucide-react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import "../../styles/tarefas.css"
import { Link } from "react-router-dom";
import CardBranco from "../../components/cardBranco";

// add data da postagem das tarefas
// como a cor da etiqueta vai funcionar
// os cards vão ser do mesmo tamanho?
// eles não estão alinhados no meio
// add filtro de busca

export default function Tarefas() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="tituloPage">Tarefas </h2>

                    <Link to="/tarefas/nova" style={{ textDecoration: 'none' }}>
                        <div className="divNovaTarefa">
                            <Plus size={22} color="#fff" />
                            <h3 className="buttonTitulo">Nova Tarefa</h3>
                        </div>
                    </Link>
                </div>

                <div className="containerCards">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', justifyContent: 'left', alignItems: 'flex-start' }}>
                            <CardBranco>
                                <div className="tarefasCard">
                                    <div>
                                        <h3 className="tituloCard">Lavadora de peças por imersão</h3>
                                        <p className="descricaoCard">Analisar dados de venda e preparar apresentação</p>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.2em' }}>
                                        <div className="etiquetaCard"></div>
                                        <Clock size={16} color="#FF9705" />
                                    </div>
                                </div>
                            </CardBranco>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}