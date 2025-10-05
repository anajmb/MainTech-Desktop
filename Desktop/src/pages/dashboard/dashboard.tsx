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
                    <div style={{flex: 1}}>

                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly', marginBottom: '2em' }}>

                            {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', flex: 1}}> */}
                            <CardBranco>
                                <div className="topoDashboardCards">
                                    <h2 className="tituloCard">Tarefas</h2>
                                </div>
                            </CardBranco>
                            {/* </div> */}

                            <CardBranco>
                                <div className="topoDashboardCards">
                                    <h2 className="tituloCard">Tempo Médio</h2>
                                </div>
                            </CardBranco>

                            <CardBranco>
                                <div className="topoDashboardCards">
                                    <h2 className="tituloCard">O.S. Geradas</h2>
                                </div>
                            </CardBranco>
                        </div>

                        <div style={{ flex: 1, width: '100%' }}>
                            <CardBranco>
                                <div className="">
                                    <h2 className="tituloCard">Atividade Anual</h2>
                                </div>
                            </CardBranco>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}