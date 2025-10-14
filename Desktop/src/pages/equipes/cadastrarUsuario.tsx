import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function CadastrarUsuario() {
    return (
        <div>
            <div className="containerGeral">
                <Sidebar />
                <div className="containerPage">
                    <Header />

                    <div className="containerCards">

                        <CardBranco>
                            <div className="cardPage">

                                <div style={{ padding: '0px 40px', flex: 1 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="nome" className="labelAddMembro">Nome completo</label>
                                            <input type="text" name="nome" id="nome" placeholder="Digite o Título da tarefa" className="inputAdd" />
                                        </div>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="descricao" className="labelAddMembro">CPF</label>
                                            <textarea name="descricao" id="descricao" rows={8} placeholder="Descreva os detalhes da tarefa" className="inputAdd inputAddDescricao"></textarea>
                                        </div>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="descricao" className="labelAddMembro">CPF</label>
                                            <textarea name="descricao" id="descricao" rows={8} placeholder="Descreva os detalhes da tarefa" className="inputAdd inputAddDescricao"></textarea>
                                        </div>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="descricao" className="labelAddMembro">CPF</label>
                                            <textarea name="descricao" id="descricao" rows={8} placeholder="Descreva os detalhes da tarefa" className="inputAdd inputAddDescricao"></textarea>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </CardBranco>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', width: '40em' }}>
                            <CardBranco>
                                <div className="cardPage">

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
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}