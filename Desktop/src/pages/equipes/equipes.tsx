import { Link } from "react-router-dom";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { EllipsisVertical, UserPlus } from "lucide-react";
import Card from "../../components/card";
import '../../styles/equipes.css'
import RandomColor from "../../hooks/randomColor";

// ao clicar em ver equipe, informações do card deve descer

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
                                    <div style={{ display: 'flex', width: '16em', alignItems: 'center' }}>
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
                                            <div>
                                                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                                                    <h3 className="nomeMembro">João Silva</h3>
                                                    <EllipsisVertical size={19} className="tresPontinhos" />
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

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3em', padding: '0px 40px' }}>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>

                                        <label htmlFor="equipe" className="labelAddMembro">Nome da Equipe</label>

                                        <div className="inputSelectDiv" style={{width: '20em'}}>
                                            <select name="cargo" id="cargo" className=" inputSelect">
                                                <option value="selecionar" disabled selected>Selecionar</option>
                                                <option value="opcao">Inspetor</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="">Email</label>
                                        <input type="email" name="email" id="email" placeholder="Digite o email" className="inputAdd inputAddEmail" />
                                    </div>

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3em' }}>
                                    <button className="btn btnAddMembro">Adicionar</button>
                                </div>
                            </div>
                        </CardBranco>

                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Criar equipe</h3>

                                <div style={{ padding: '0px 40px', flex: 1 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="nome" className="labelAddMembro">Nome</label>
                                            <input type="text" name="nome" id="nome" placeholder="Ex: joao@gmail.com" className="inputAdd" />
                                        </div>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="descricao" className="labelAddMembro">Descrição</label>
                                            <textarea name="descricao" id="descricao" rows={8} placeholder="Descreva os detalhes da equipe" className="inputAdd inputAddDescricao"></textarea>
                                        </div>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3em' }}>
                                        <button className="btn btnAddMembro">Criar</button>
                                    </div>
                                </div>
                            </div>
                        </CardBranco>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', width: '30em' }}>
                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Todas</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                                    <Card>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: "center", gap: 8 }}>
                                                <div className="circuloEquipe" style={{ backgroundColor: RandomColor() }}></div>
                                                <h3 className="nomeMembro">Equipe de Manutenção</h3>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', paddingTop: '0.7em' }}>
                                                <p className="descricaoEquipe">Lorem ipsum dolor sit amet, consectetur adipisicing elit. gbdr geg eg et sgrse</p>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.2em' }}>
                                                <div style={{ borderRadius: 25, backgroundColor: '#D9D9D9', padding: '4px 20px' }}>
                                                    <h5 style={{ fontWeight: 400, margin: 0, fontSize: '0.65em' }}>8 membros</h5>
                                                </div>
                                                <h5 style={{ fontWeight: '500', color: '#D40303', margin: 0 }}>Ver equipe</h5>
                                            </div>
                                        </div>
                                    </Card>

                                </div>
                            </div>
                        </CardBranco>
                    </div>
                </div>
            </div >
        </div >
    )
}