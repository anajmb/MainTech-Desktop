import { SquarePen } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import '../../styles/configuracoes.css'
import RandomColor from "../../hooks/randomColor";

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
                            <div className="cardPage">

                                <h3 className="tituloCard">Minha informações</h3>

                                <div style={{ padding: '0px 40px', flex: 1 }}>

                                    <div className="headerPerfil">
                                        <img src="" alt="" />

                                        <div className="headerInfo">
                                            <h3 className="nomeUser">João Silva de Souza Toledo</h3>

                                            <div>
                                                <h5 className="equipe">Equipe Administrativa</h5>
                                                <div style={{backgroundColor: RandomColor()}}>
                                                    <h6 className="cargo">
                                                    </h6>
                                                </div>
                                            </div>

                                            <button>Editar foto</button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                                        <div className="grupoInputIcon">
                                            <input type="text" name="nome" id="nome" placeholder="Digite o Título da tarefa" readOnly value={"João de silva toledo"} className="inputIcon" />
                                        </div>

                                        <div className="grupoInputIcon">
                                            <input type="text" name="cpf" id="cpf" readOnly value={'CPF'} className="inputIcon" />
                                        </div>

                                        <div className="grupoInputIcon">
                                            <input type="data" name="nascimento" id="nascimento" readOnly value={"Data de Nascimento"} className="inputIcon" />
                                        </div>

                                        <div className="grupoInputIcon">
                                            <input type="email" name="email" id="email" value={"email"} className="inputIcon" />
                                            <SquarePen size={20} className="iconDoInput" />
                                        </div>

                                        <div className="grupoInputIcon">
                                            <input type="tel" name="telefone" id="telefone" value={"Telefone"} className="inputIcon" />
                                            <SquarePen size={20} className="iconDoInput" />
                                        </div>
                                    </div>
                                    <div className="btnDiv" >
                                        <button type="submit" className="btn">Salvar</button>
                                        <button type="submit" className="btn" style={{ color: '#5c5c5c', backgroundColor: '#c5c5c5' }}>Descartar Alterações</button>
                                    </div>
                                </div>

                            </div>
                        </CardBranco>
                    </div>
                </div>
            </div>
        </div>
    )
}