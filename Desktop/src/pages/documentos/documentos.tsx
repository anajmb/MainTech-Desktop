import { ArrowDownToLine } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import '../../styles/tarefas.css'

// add etiqueta, data de emissão e tamanho do arquivo

export default function Documentos() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />

                <h2 className="tituloPage">Documentos</h2>

                <div className="containerCards">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', justifyContent: 'left', alignItems: 'flex-start' }}>
                            <CardBranco>
                                <div className="itemCard">
                                    <div className="infoCard">
                                        <h3 className="tituloCardMenor">Ordem de Serviço</h3>
                                        <p className="descricaoCard">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.2em' }}>
                                        <div className="etiquetaCard"></div>
                                        <ArrowDownToLine size={16} />
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