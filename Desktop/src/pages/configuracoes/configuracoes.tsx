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
                                    {/* icon */}
                                    <h3>Privacidade e Segurança</h3>
                                    <h3>Gerenciar senha</h3>
                                </div>

                                <h3>Preferência</h3>
                                <div>
                                    <div>
                                        <h3>Notificações</h3>
                                        <h3>Controla alerta e avisos</h3>
                                    </div>

                                    <div>
                                        <h3>Acessibilidade</h3>
                                    </div>
                                </div>

                                <h3>Suporte</h3>
                                <div>
                                    <h3>Ajuda e Suporte</h3>
                                    <h3>Central de ajuda e FAQ</h3>
                                </div>
                            </div>
                        </CardBranco>
                    </div>

                    <div className="perfilCard">
                        <CardBranco>
                            <h3 className="tituloCard">Minhas Informações</h3>

                            <div>
                                {/* foto */}
                                <h3>João Silva de Souza Toledo</h3>

                                <div>
                                    <h3>Equipe Administrativa</h3>

                                    <div>
                                        <h3>Lider Técnico</h3>
                                    </div>
                                </div>

                                <div>
                                    <button>Editar foto</button>
                                </div>
                            </div>

                            <div className="inputsConfiguracoes">
                                <input type="text" readOnly />
                                <input type="text" readOnly />
                                <input type="text" readOnly />
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