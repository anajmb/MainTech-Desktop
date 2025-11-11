import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import MyDatePicker from "../../hooks/myDatePicker";

// add evento: puxar do backend, estilizar os dias com eventos, mostrar lista de eventos do dia selecionado 

export default function Agenda() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />

                <div className="containerCards">
                    <MyDatePicker />
                </div>
            </div>
        </div>
    )
}