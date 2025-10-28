import { BellRing, Camera, PersonStanding, ShieldCheck, SquarePen } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import '../../styles/configuracoes.css'
import RandomColor from "../../hooks/randomColor";
import fotoPerfil from "../../assets/img/background-desktop.png"
import Card from "../../components/card";
import { Link } from "react-router-dom";

// add toggler button
// arrumar inputs para que eu possa editar e deixar o placeholder mais claro
// add função para que ao clicar na camera, abra os documentos

export default function Configuracoes() {

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Configurações </h2>

                <div className="containerCards" style={{ flexDirection: 'row' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flex: 1 }}>
                        <div className="containerConta">
                            <CardBranco>
                                <div style={{ padding: '1em' }}>
                                    <h3 className="tituloCard">Conta</h3>

                                    {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}> */}
                                    <Link to={'/privacidade'} style={{ textDecoration: 'none', color: '#000' }}>
                                        <Card>
                                            <div className="opcaoConta">

                                                <ShieldCheck color="#51C385" size={22} strokeWidth={1.5} />
                                                <div>
                                                    <h3 className="tituloConta">Privacidade e Segurança</h3>
                                                    <h3 className="subtituloConta">Gerenciar senha</h3>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>

                                    <h3 className="tituloCard" style={{ marginTop: '1em' }}>Preferência</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                                        <Card>
                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div className="opcaoConta">

                                                    <BellRing color="#D10B03" size={22} strokeWidth={1.5} />
                                                    <div>
                                                        <h3 className="tituloConta">Notificações</h3>
                                                        <h3 className="subtituloConta">Controla alerta e avisos</h3>
                                                    </div>
                                                </div>

                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>

                                            </div>
                                        </Card>

                                        <Card>
                                            <div className="opcaoConta">

                                                <PersonStanding color="#3963EF" size={22} strokeWidth={1.5} />
                                                <h3 className="tituloConta">Acessibilidade</h3>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </CardBranco>
                        </div>

                        {/* <div className="containerPerfilCard"> */}
                        <CardBranco>
                            <div className="cardPage">

                                <h3 className="tituloCard">Minha informações</h3>

                                <div style={{ padding: '0px 40px', flex: 1 }}>

                                    <div className="headerInfo">
                                        <div style={{ position: 'relative' }}>
                                            <img src={fotoPerfil} alt="" className="fotoPerfil" />
                                            <button className="editarFotoBtn">
                                                <Camera color="#fff" size={22} />
                                            </button>
                                        </div>

                                        <div>
                                            <h3 className="nomeUser">João Silva de Souza Toledo</h3>

                                            <div style={{ display: 'flex', alignItems: "center", gap: '2em', paddingTop: '0.7em' }}>
                                                <p className="equipePerfil">Equipe Administrativa</p>

                                                <div style={{ backgroundColor: RandomColor(), padding: '0.3em 1.5em', borderRadius: '25px' }}>
                                                    <h3 className="cargoMembro">Líder tecnico</h3>
                                                </div>
                                            </div>
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
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}