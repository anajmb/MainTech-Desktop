import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function Configuracoes() {

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Configurações </h2>

                <div className="containerCards">

                </div>
            </div>
        </div>
    )
}