import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function Equipes() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Equipes </h2>

                <div className="containerCards">
                    <CardBranco>
                        <div>
                            <h3></h3>
                        </div>
                    </CardBranco>
                </div>
            </div>
        </div>
    )
}