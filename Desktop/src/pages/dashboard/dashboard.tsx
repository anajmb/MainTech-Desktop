import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function Dashboard() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Dashboard </h2>

                <div className="containerCards">
                    <CardBranco>
                        <div className="topoDashboardCards">
                
                        </div>
                    </CardBranco>
                </div>
            </div>
        </div>
    )
}