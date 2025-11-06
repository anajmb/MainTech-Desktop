import { Calendar, User } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";

// add id da máquina
// estilizar os date pickers

export default function NovaTarefa() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [inspectorId, setInspectorId] = useState("");
    const [machineId, setMachineId] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);

    const today = new Date();
    const sixMonthsFromNow = new Date(today);
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    const handleCreateTask = async () => {
        if (!title || !description || !inspectorId || !machineId || !date) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        try {
            const expirationDate = date.toISOString();
            const response = await fetch("https://maintech-backend-r6yk.onrender.com/tasks/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    inspectorId: Number(inspectorId),
                    machineId: Number(machineId),
                    expirationDate,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro ao criar tarefa:", errorData);
                alert("Erro ao criar tarefa!");
                return;
            }

            alert("Tarefa criada com sucesso!");
            setTitle("");
            setDescription("");
            setInspectorId("");
            setMachineId("");
            setDate(null);
            setTime(null);
            navigate("/tarefas");
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de conexão com o servidor!");
        }
    };


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
                                        <input type="text" name="nome" id="nome" placeholder="Digite o Título da tarefa" className="inputAdd"
                                            value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="descricao" className="labelAddMembro">Descrição</label>
                                        <textarea name="descricao" id="descricao" rows={8} placeholder="Descreva os detalhes da tarefa" className="inputAdd inputAddDescricao"
                                            value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <div className="grupoInputLabel">
                                        <label htmlFor="maquina" className="labelAddMembro">Máquina</label>
                                        <input type="text" name="maquina" id="maquina" placeholder="Informe o ID da máquina" className="inputAdd"
                                            value={machineId} onChange={(e) => setMachineId(e.target.value)} />
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
                                        {/* <input type="date" name="vencimento" id="vencimento" className="inputAdd" /> */}
                                        <DatePicker
                                            selected={date}
                                            onChange={(date) => setDate(date)}
                                            minDate={today}
                                            maxDate={sixMonthsFromNow}
                                            dateFormat="dd/MM/yyyy"
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                                            placeholderText="Selecione a data"
                                        />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="horario" className="labelAddMembro">Horário</label>
                                        {/* <input type="time" name="vencimento" id="vencimento" className="inputAdd" /> */}
                                        <DatePicker
                                            selected={time}
                                            onChange={(t) => setTime(t)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Hora"
                                            dateFormat="HH:mm"
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                                            placeholderText="Selecione o horário"
                                        />
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
                                        <input type="email" name="vencimento" id="vencimento" placeholder="Atribuir a tarefa" className="inputAdd"
                                            value={inspectorId} onChange={(e) => setInspectorId(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                        </CardBranco>
                    </div>
                </div>

                <div className="btnDiv">
                    <button className="btn" onClick={handleCreateTask}>Salvar</button>
                </div>

            </div>
        </div>
    )
}