import { Calendar, User } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

// add id da máquina

export default function NovaTarefa() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Nova Tarefa </h2>

                <div className="containerCards">

                    <CardBranco>
                        <div className="cardPage">

                            <div style={{ padding: '0px 40px', flex: 1 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="nome" className="labelAddMembro">Título da tarefa</label>
                                        <input type="text" name="nome" id="nome" placeholder="Digite o Título da tarefa" className="inputAdd" />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="descricao" className="labelAddMembro">Descrição</label>
                                        <textarea name="descricao" id="descricao" rows={8} placeholder="Descreva os detalhes da tarefa" className="inputAdd inputAddDescricao"></textarea>
                                    </div>
                                    <div className="grupoInputLabel">
                                        <label htmlFor="maquina" className="labelAddMembro">Máquina</label>
                                        <input type="text" name="maquina" id="maquina" placeholder="Informe o ID da máquina" className="inputAdd" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </CardBranco>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', width: '40em' }}>
                        <CardBranco>
                            <div className="cardPage">

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8em', marginBottom: '1em' }}>
                                    <Calendar color="#438be9" />
                                    <h3 className="tituloCard" style={{ margin: 0 }}>Data e Hora</h3>
                                </div>

                                <div style={{ display: 'flex', padding: '0px 40px', flex: 1, alignItems: 'center', gap: '2em' }}>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="vencimento" className="labelAddMembro">Data de vencimento</label>
                                        <input type="date" name="vencimento" id="vencimento" className="inputAdd" />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="horario" className="labelAddMembro">Horário</label>
                                        <input type="time" name="vencimento" id="vencimento" className="inputAdd" />
                                    </div>
                                </div>

                            </div>
                        </CardBranco>

                        <CardBranco>
                            <div className="cardPage">

                                <div style={{ display: 'flex', padding: '0px ', flex: 1, alignItems: 'center', gap: '2em' }}>

                                    <div className="grupoInputLabel">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8em', marginBottom: '1em' }}>
                                            <User color="#11C463" />
                                        <label htmlFor="vencimento" className="labelAddMembro">Inspetor</label>
                                        </div>
                                        <input type="email" name="vencimento" id="vencimento" placeholder="Atribuir a tarefa" className="inputAdd" />
                                    </div>
                                </div>

                            </div>
                        </CardBranco>
                    </div>
                </div>

                <div className="btnDiv">
                    <button className="btn">Salvar</button>
                </div>

            </div>
        </div>
    )
}