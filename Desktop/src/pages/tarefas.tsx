import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function Tarefas() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                
                <div className="containerCards">

                </div>
            </div>
        </div>
    )
}