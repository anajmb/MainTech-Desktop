import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import '../../styles/configuracoes.css'

export default function Configuracoes() {

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Configurações </h2>

                <div className="containerCards">
                    <div className="contaCard">
                        <CardBranco >
                            <div>
                                <h3 className="">Conta</h3>
                                <div>

                                </div>

                                <h3>Preferência</h3>
                                <div>

                                </div>

                                <h3>Suporte</h3>
                                <div>

                                </div>
                            </div>
                        </CardBranco>
                    </div>

                    <div className="perfilCard">
                        <CardBranco>
                            <h3 className="tituloCard">Minhas Informações</h3>

                            <div className="inputsConfiguracoes">
                                <input type="text" readOnly/>
                                <input type="text" readOnly/>
                                <input type="text" readOnly/>
                                <input type="email" />
                                <input type="text" />
                            </div>

                            <div>
                                <button>Salvar</button>
                                <button>Descartar Alterações</button>
                            </div>
                        </CardBranco>
                    </div>
                </div>
            </div>
        </div>
    )
}