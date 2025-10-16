import { EllipsisVertical } from "lucide-react";
import Card from "../../components/card";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import RandomColor from "../../hooks/randomColor";

// colocar validações nos campos CPF

export default function CadastrarUsuario() {
    return (
        <div>
            <div className="containerGeral">
                <Sidebar />
                <div className="containerPage">
                    <Header />

                    <h2 className="tituloPage">Cadastrar Usuário </h2>

                    <div className="containerCards">

                        <CardBranco>
                            <div className="cardPage">

                                <h3 className="tituloPequenoCard">Informe os dados para liberar o cadastro</h3>

                                <div style={{ padding: '0px 40px', flex: 1 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="nome" className="labelAddMembro">Nome completo</label>
                                            <input type="text" name="nome" id="nome" placeholder="Digite o Título da tarefa" className="inputAdd" />
                                        </div>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="cpf" className="labelAddMembro">CPF</label>
                                            <input type="text" name="cpf" id="cpf" placeholder="___ . ___ . ___ - __" className="inputAdd" />
                                        </div>


                                        <div className="grupoInputLabel">
                                            <label htmlFor="cargo" className="labelAddMembro">Cargo</label>

                                            <div className="inputSelectDiv">
                                                <select name="cargo" id="cargo" className=" inputSelect">
                                                    <option value="selecionar" disabled selected>Selecionar</option>
                                                    <option value="opcao">Inspetor</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btnDiv">
                                        <button type="submit" className="btn">Cadastrar Usuário</button>
                                    </div>
                                </div>

                            </div>
                        </CardBranco>

                        <CardBranco>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="cardPage" style={{ flex: 1 }}>
                                    <h3 className="tituloPequenoCard">Usuários cadastrados recentemente</h3>

                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1em', overflowY: 'auto', justifyContent: 'center', maxHeight: '22em' }}>
                                        <Card>
                                            <div style={{ flex: 1, width: '100%' }}>
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
                    </div>

                </div>
            </div>
        </div>
    )
}