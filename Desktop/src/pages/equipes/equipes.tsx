import { Link } from "react-router-dom";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { EllipsisVertical, UserPlus } from "lucide-react";
import Card from "../../components/card";
import '../../styles/equipes.css'
import RandomColor from "../../hooks/randomColor";

// gerar cor randomica para cargoMembro

export default function Equipes() {



    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="tituloPage">Equipes </h2>

                    <Link to="/equipes/cadastrarUsuario" style={{ textDecoration: 'none' }}>
                        <div className="divNovaTarefa">
                            <UserPlus size={20} color="#fff" style={{ padding: 1 }} />
                            <h3 className="buttonTitulo">Cadastrar Usuário</h3>
                        </div>
                    </Link>
                </div>

                <div className="containerCards">

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', flex: 1 }}>
                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Minha equipe</h3>

                                <div style={{ display: "flex", gap: '6em', justifyContent: 'center' }}>
                                    <div style={{display: 'flex', width: '16em', alignItems: 'center' }}>
                                        <Card>
                                            <div className="equipeAtual">
                                                <h3 className="nomeEquipeAtual">Equipe Administrativa </h3>
                                                <p className="descricaoEquipeAtual">Equipe responsável pela gestão administrativa e organizacional da empresa</p>

                                                <div style={{ backgroundColor: '#E6E6E6', padding: '0.5em', borderRadius: '8px', marginTop: '1em', marginBottom: '1em' }}>
                                                    <h4 className="quantMembrosEquipeAtual">6 membros</h4>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '30em', gap: '1em', overflowY: 'auto', maxHeight: '30em' }}>
                                        <Card>
                                            <div className="visualizacaoMembro">
                                                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                                                    <h3 className="nomeMembro">João Silva</h3>
                                                    <EllipsisVertical size={19}  style={{cursor: 'pointer'}}/>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', paddingTop: '0.7em' }}>
                                                    <p className="emailMembro">joaosilva@empresa.com</p>

                                                    <div style={{ backgroundColor: RandomColor(), padding: '0.3em 1.5em', borderRadius: '25px' }}>
                                                        <h3 className="cargoMembro">Líder tecnico</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                        
                                    </div>
                                </div>
                            </div>
                        </CardBranco>


                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Adicionar membro</h3>

                                <div>

                                    <div>
                                        <label htmlFor="equipe">Nome da Equipe</label>
                                        <select name="equipe" id="equipe">
                                            <option value="Selecionar" selected>Selecionar</option>
                                            <option value="Manutentor">Manutentor</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="">Email</label>
                                        <input type="email" name="email" id="email" />
                                    </div>

                                    <div>
                                        <button className="botaoAdicionarMembro">Adicionar</button>
                                    </div>
                                </div>
                            </div>
                        </CardBranco>

                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Criar equipe</h3>

                                <div>

                                    <div className="inputCriarEquipe">
                                        <label htmlFor="nome">Nome</label>
                                        <input type="text" name="nome" id="nome" />
                                    </div>

                                    <div className="inputCriarEquipe">
                                        <label htmlFor="descricao">Descrição</label>
                                        <input type="text" name="descricao" id="descricao" />
                                    </div>

                                    <div className="inputCriarEquipe">
                                        <label htmlFor="email">Membros</label>
                                        <input type="email" name="email" id="email" />
                                    </div>

                                    <div className="botaoCriarEquipe">
                                        <button>Criar</button>
                                    </div>
                                </div>
                            </div>
                        </CardBranco>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', width: '30em' }}>
                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Todas</h3>

                                <div className="todasEquipes">

                                </div>
                            </div>
                        </CardBranco>
                    </div>
                </div>
            </div>
        </div>
    )
}