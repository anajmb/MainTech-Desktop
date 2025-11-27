import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import "../../styles/tarefas.css";


export default function OrdemServico() {

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 className="tituloPage">Ordem de Serviço</h2>
                </div>

                
                <div className="containerCards" style={{ justifyContent: "left" }}>

                </div>
            </div>
        </div>
    );
}
