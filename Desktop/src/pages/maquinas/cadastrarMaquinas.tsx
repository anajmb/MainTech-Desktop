import { SquarePen, Trash2 } from "lucide-react";
import Card from "../../components/card";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import RandomColor from "../../hooks/randomColor";

export default function CadastrarMaquinas() {
    return (
        <div>
            <div className="containerGeral">
                <Sidebar />
                <div className="containerPage">
                    <Header />
                    <h2 className="tituloPage">Cadastrar Máquinas</h2>

                    <div className="containerCards">

                        <CardBranco>
                            <div className="cardPage">

                                <h3 className="tituloPequenoCard">Informe os dados para o cadastro</h3>

                                <div style={{ padding: '0px 40px', flex: 1 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="nome" className="labelAddMembro">Nome da máquina</label>
                                            <input type="text" name="nome" id="nome" placeholder="Digite o Título da tarefa" className="inputAdd" />
                                        </div>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="cpf" className="labelAddMembro">ID da máquina</label>
                                            <input type="text" name="cpf" id="cpf" placeholder="______" className="inputAdd" />
                                        </div>


                                        <div className="grupoInputLabel">
                                            <label htmlFor="cargo" className="labelAddMembro">Oficina</label>

                                            <div className="inputSelectDiv">
                                                <select name="cargo" id="cargo" className=" inputSelect">
                                                    <option value="selecionar" disabled selected>Selecionar</option>
                                                    <option value="opcao">Inspetor</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="nome" className="labelAddMembro">Conjuntos</label>
                                            <input type="text" name="nome" id="nome" placeholder="Digite o Título da tarefa" className="inputAdd" />
                                        </div>
                                    </div>
                                    <div className="btnDiv">
                                        <button type="submit" className="btn">Cadastrar Máquina</button>
                                    </div>
                                </div>

                            </div>
                        </CardBranco>

                        <CardBranco>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="cardPage" style={{ flex: 1 }}>
                                    <h3 className="tituloPequenoCard">Máquinas cadastradas</h3>

                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1em', overflowY: 'auto', justifyContent: 'center', maxHeight: '22em' }}>
                                        <Card>
                                            <div style={{ flex: 1, width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: "center", gap: 50 }}>
                                                    <h3 className="nomeMembro">Quinadora</h3>
                                                    <div style={{ backgroundColor: RandomColor(), padding: '0.3em 1.5em', borderRadius: '25px' }}>
                                                        <h3 className="cargoMembro" style={{fontSize: '11px'}}>Oficina Mecânica</h3>
                                                    </div>  
                                                </div>

                                                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                                                    <p className="emailMembro">ID: 12345</p>

                                                    <div style={{ display: 'flex', padding: '0.3em 1.5em', borderRadius: '25px', gap: 10 }}>
                                                        <SquarePen color="#838383" strokeWidth={1.5} size={22} style={{cursor: 'pointer'}}/>
                                                        <Trash2 color="#F55151" strokeWidth={1.5} size={22} style={{cursor: 'pointer'}} />
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