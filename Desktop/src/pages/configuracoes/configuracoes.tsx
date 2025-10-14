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
                    <div className="containerConta">
                        <CardBranco >
                            <div className="cardInterno">
                                <h3 className="tituloCard">Conta</h3>
                                <div>
                                    {/* icon */}
                                    <h3 className="tituloConta">Privacidade e Segurança</h3>
                                    <h3 className="subtituloConta">Gerenciar senha</h3>
                                </div>

                                <h3>Preferência</h3>
                                <div>
                                    <div>
                                        <h3 className="tituloConta">Notificações</h3>
                                        <h3 className="subtituloConta">Controla alerta e avisos</h3>
                                    </div>

                                    <div>
                                        <h3 className="tituloConta">Acessibilidade</h3>
                                    </div>
                                </div>

                                <h3>Suporte</h3>
                                <div>
                                    <h3 className="tituloConta">Ajuda e Suporte</h3>
                                    <h3 className="subtituloConta">Central de ajuda e FAQ</h3>
                                </div>
                            </div>
                        </CardBranco>
                    </div>

                    <div className="containerPerfilCard">
                        <CardBranco>
                            <div className="perfilCard">
                                <div>

                                    <h3 className="tituloCard">Minhas Informações</h3>

                                    <div className="headerPerfil">
                                        {/* foto */}
                                        <h3 className="nomePerfil">João Silva de Souza Toledo</h3>

                                        <div>
                                            <h3>Equipe Administrativa</h3>

                                            <div>
                                                <h3>Lider Técnico</h3>
                                            </div>
                                        </div>

                                        <div className="">
                                            <button className="botaoEditar">Editar foto</button>
                                        </div>
                                    </div>

                                </div>

                                <div className="inputsConfiguracoes">
                                    <input type="text" readOnly />
                                    <input type="text" readOnly />
                                    <input type="text" readOnly />
                                    <input type="email" />
                                    <input type="text" />
                                </div>

                                <div className="botoesPerfil">
                                    <button className="botao salvar">Salvar</button>
                                    <button className="botao descartar">Descartar Alterações</button>
                                </div>
                            </div>
                        </CardBranco>
                    </div>
                </div>
            </div>
        </div>
    )
}