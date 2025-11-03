import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import MyDatePicker from "../../hooks/myDatePicker";

// add botão para adicionar eventos

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