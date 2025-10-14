import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function NovaTarefa() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Nova Tarefa </h2>

                <div className="containerCards">
                    {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', flex: 1 }}> */}

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
                                </div>

                            </div>
                        </div>
                    </CardBranco>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', width: '40em' }}>
                        <CardBranco>
                            <div className="cardPage">
                                {/* <h3 className="tituloCard">Inspetor</h3> */}

                                <div style={{ display: 'flex', padding: '0px 40px', flex: 1, alignItems: 'center', gap: '2em' }}>
                                    {/* <div style={{ display: 'flex', gap: 15 }}> */}

                                    <div className="grupoInputLabel">
                                        <label htmlFor="vencimento" className="labelAddMembro">Data de vencimento</label>
                                        <input type="date" name="vencimento" id="vencimento" className="inputAdd" />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="horario" className="labelAddMembro">Horário</label>
                                        <input type="time" name="vencimento" id="vencimento" className="inputAdd" />
                                    </div>
                                </div>

                                {/* </div> */}
                            </div>
                        </CardBranco>

                        <CardBranco>
                            <div className="cardPage">
                                {/* <h3 className="tituloCard">Inspetor</h3> */}

                                <div style={{ display: 'flex', padding: '0px 40px', flex: 1, alignItems: 'center', gap: '2em' }}>
                                    {/* <div style={{ display: 'flex', gap: 15 }}> */}

                                    <div className="grupoInputLabel">
                                        <label htmlFor="vencimento" className="labelAddMembro">Inspetor</label>
                                        <input type="email" name="vencimento" id="vencimento" placeholder="Atribuir a tarefa" className="inputAdd" />
                                    </div>
                                </div>

                                {/* </div> */}
                            </div>
                        </CardBranco>
                    </div>
                    {/* </div> */}
                </div>

                <div className="btnDiv">
                    <button className="btn">Salvar</button>
                </div>

            </div>
        </div>
    )
}