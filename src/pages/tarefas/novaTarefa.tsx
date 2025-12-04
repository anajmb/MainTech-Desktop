import { Calendar, User } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/tarefas.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import api from "../../lib/axios"; // <<< adicionado

export default function NovaTarefa() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [inspectorId, setInspectorId] = useState("");
    const [machineId, setMachineId] = useState("");
    const [inspectors, setInspectors] = useState<any[]>([]);
    const [machines, setMachines] = useState<any[]>([]);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [erroMsg, setErroMsg] = useState("");

    const today = new Date();
    const sixMonthsFromNow = new Date(today);
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    const pad = (n: number) => n.toString().padStart(2, "0");

    const formatDateToYMD = (d: Date) => {
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };

    const getTimezoneOffsetString = () => {
        const offsetMinutes = -new Date().getTimezoneOffset();
        const sign = offsetMinutes >= 0 ? "+" : "-";
        const absMin = Math.abs(offsetMinutes);
        const hours = Math.floor(absMin / 60);
        const minutes = absMin % 60;
        return `${sign}${pad(hours)}:${pad(minutes)}`;
    };

    // 🔥 BUSCAR INSPETORES DO BACKEND
    useEffect(() => {
        const fetchInspectors = async () => {
            try {
                const res = await api.get("/employees/get");
                // aceitar res.data ou res.data.data
                const payload = res.data?.data ?? res.data;

                if (!Array.isArray(payload)) {
                    console.error("Resposta inesperada /employees/get:", payload);
                    setInspectors([]);
                    return;
                }

                const onlyInspectors = payload.filter((user: any) => user.role === "INSPECTOR");
                setInspectors(onlyInspectors);
            } catch (error: any) {
                console.log("Erro ao carregar inspetores:", error);
                if (error?.response?.status === 401) {
                    console.warn("401 recebido — token ausente ou inválido");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
                toast.error("Erro ao carregar inspetores");
                setInspectors([]);
            }
        };

        fetchInspectors();
    }, []);

    // +++++ Novo useEffect para máquinas (apenas máquinas sem tasks ativas) +++++
    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const res = await api.get("/machines/get"); // ajuste endpoint se necessário
                const payload = res.data?.data ?? res.data;

                if (!Array.isArray(payload)) {
                    console.error("Resposta inesperada /machines/get:", payload);
                    setMachines([]);
                    return;
                }

                const isTaskActive = (task: any) => {
                    // ajuste os status conforme seu backend: ex: 'ACTIVE', 'IN_PROGRESS', 'PENDING'
                    const activeStatuses = ["ACTIVE", "IN_PROGRESS", "PENDING"];
                    return task && (activeStatuses.includes(task.status) || task.active === true);
                };

                const availableMachines = payload.filter((m: any) => {
                    // 1) backend já fornece flag
                    if (m.available === true) return true;
                    if (m.available === false) return false;

                    // 2) contador explícito de tasks ativas
                    if (typeof m.activeTasksCount === "number") return m.activeTasksCount === 0;

                    // 3) tasks array no objeto da máquina
                    if (Array.isArray(m.tasks)) {
                        // se existir pelo menos uma tarefa ativa => máquina indisponível
                        return !m.tasks.some(isTaskActive);
                    }

                    // 4) nome alternativo de contador
                    if (typeof m.tasksCount === "number") return m.tasksCount === 0;

                    // 5) se não conseguir inferir, assumir disponível (ou ajustar para false se preferir)
                    return true;
                });

                console.log("Machines fetched:", payload, "Available:", availableMachines);
                setMachines(availableMachines);
            } catch (error: any) {
                console.error("Erro ao carregar máquinas:", error);
                if (error?.response?.status === 401) {
                    console.warn("401 recebido ao buscar máquinas");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
                setMachines([]);
            }
        };

        fetchMachines();
    }, []);

    const handleCreateTask = async () => {
        if (!title || !description || !inspectorId || !machineId || !date) {
            setErroMsg("Preencha todos os campos!");
            return;
        }

        try {
            const day = formatDateToYMD(date);
            let hours = "00";
            let minutes = "00";
            if (time) {
                hours = pad(time.getHours());
                minutes = pad(time.getMinutes());
            }
            const tz = getTimezoneOffsetString();
            const expirationDate = `${day}T${hours}:${minutes}:00${tz}`;

            await api.post("/tasks/create", {
                title,
                description,
                inspectorId: Number(inspectorId),
                machineId: Number(machineId),
                expirationDate,
            });

            toast.success("Tarefa criada com sucesso!");
            navigate("/tarefas");
        } catch (error) {
            console.error("Erro:", error);
            toast.error("Erro de conexão com o servidor!");
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
                            <div style={{ padding: "0px 40px", flex: 1 }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                                    <div className="grupoInputLabel">
                                        <label className="labelAddMembro">Título da tarefa</label>
                                        <input
                                            type="text"
                                            placeholder="Digite o Título da tarefa"
                                            className="inputAdd"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label className="labelAddMembro">Descrição</label>
                                        <textarea
                                            rows={8}
                                            placeholder="Descreva os detalhes da tarefa"
                                            className="inputAdd inputAddDescricao"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label className="labelAddMembro">Máquina</label>
                                        <div className="inputSelectDiv">
                                            <select
                                                className="inputSelect"
                                                style={{ cursor: "pointer" }}
                                                value={machineId}
                                                onChange={(e) => setMachineId(e.target.value)}
                                            >
                                                <option value="">Selecione a máquina</option>
                                                {machines.map((m) => (
                                                    <option key={m.id} value={m.id}>
                                                        {m.name ?? m.tag ?? `Máquina ${m.id}`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBranco>

                    {/* COLUNA DIREITA */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2em", width: "40em" }}>
                        {/* DATA/HORA */}
                        <CardBranco>
                            <div className="cardPage">
                                <div style={{ display: "flex", alignItems: "center", gap: "0.8em", marginBottom: "1em" }}>
                                    <Calendar color="#438be9" />
                                    <h3 className="tituloCard" style={{ margin: 0 }}>
                                        Data e Hora
                                    </h3>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        padding: "0px 40px",
                                        flex: 1,
                                        alignItems: "center",
                                        gap: "2em",
                                    }}
                                >
                                    <div className="grupoInputLabel">
                                        <label className="labelAddMembro">Data de vencimento</label>
                                        <input
                                            type="date"
                                            className="inputAdd"
                                            value={date ? formatDateToYMD(date) : ""}
                                            onChange={(e) => {
                                                const [y, m, d] = e.target.value.split("-");
                                                const newDate = new Date(Number(y), Number(m) - 1, Number(d));
                                                setDate(newDate);

                                                if (time) {
                                                    const t = new Date(newDate);
                                                    t.setHours(time.getHours(), time.getMinutes(), 0, 0);
                                                    setTime(t);
                                                }
                                            }}
                                            min={formatDateToYMD(today)}
                                            max={formatDateToYMD(sixMonthsFromNow)}
                                        />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label className="labelAddMembro">Horário</label>
                                        <input
                                            type="time"
                                            className="inputAdd"
                                            value={time ? `${pad(time.getHours())}:${pad(time.getMinutes())}` : ""}
                                            onChange={(e) => {
                                                const [hours, minutes] = e.target.value.split(":").map(Number);
                                                const baseDate = date ? new Date(date) : new Date();
                                                const updatedDate = new Date(baseDate);
                                                updatedDate.setHours(hours, minutes, 0, 0);
                                                setTime(updatedDate);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardBranco>

                        {/* INSPETOR */}
                        <CardBranco>
                            <div className="cardPage">
                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.8em",
                                            marginBottom: "1em",
                                        }}
                                    >
                                        <User color="#11C463" />
                                        <label className="labelAddMembro">Inspetor</label>
                                    </div>

                                    {/* SELECT COM SETA (NATIVO DO HTML) */}
                                    <div className="inputSelectDiv">
                                        <select
                                            className="inputSelect"
                                            style={{ cursor: "pointer" }}
                                            value={inspectorId}
                                            onChange={(e) => setInspectorId(e.target.value)}
                                        >
                                            <option value="">Selecione o inspetor</option>

                                            {inspectors.map((insp) => (
                                                <option key={insp.id} value={insp.id}>
                                                    {insp.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </CardBranco>
                    </div>
                </div>

                {erroMsg && <div className="erroMsg">{erroMsg}</div>}

                <div className="btnDiv">
                    <button className="btn" onClick={handleCreateTask}>
                        Salvar
                    </button>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={true}
                        pauseOnHover
                        draggable
                        theme="dark"
                        transition={Bounce}
                        toastStyle={{ fontSize: "0.9em" }}
                    />
                </div>
            </div>
        </div>
    );
}
