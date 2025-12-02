import { Calendar, User } from "lucide-react";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/tarefas.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { api } from "../../lib/axios";

export default function NovaTarefa() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [inspectorId, setInspectorId] = useState("");
    const [machineId, setMachineId] = useState("");
    const [inspectors, setInspectors] = useState<any[]>([]);
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
                const token = localStorage.getItem("token");
                const res = await api.get("/employees/get", {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                });

                // Normaliza o body para um array, seja res.data ou res.data.data etc.
                let data: any = res.data;
                if (!Array.isArray(data) && Array.isArray(data?.data)) data = data.data;

                if (!Array.isArray(data)) {
                    console.error("Resposta de inspetores inesperada:", res.data);
                    toast.error("Erro ao carregar inspetores (resposta inválida).");
                    return;
                }

                const onlyInspectors = data.filter((user: any) => user.role === "INSPECTOR");
                setInspectors(onlyInspectors);
            } catch (error: any) {
                console.log("Erro ao carregar inspetores:", error);

                if (error.response?.status === 401) {
                    toast.error("Sessão expirada. Faça login novamente.");
                    navigate("/"); // ou rota de login
                    return;
                }

                toast.error("Erro ao carregar inspetores");
            }
        };

        fetchInspectors();
    }, [navigate]);

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

            // payload explícito e logado para inspecionar no Network/Console
            const payload = {
                title,
                description,
                inspectorId: Number(inspectorId), // ajuste o nome da chave se o backend esperar outro nome
                machineId: Number(machineId),
                expirationDate,
            };

            console.log("Criando tarefa com payload:", payload);

            const response = await fetch("https://maintech-backend-r6yk.onrender.com/tasks/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (!response.ok) {
                console.error("Erro ao criar tarefa:", result);
                toast.error(result?.msg || result?.message || "Erro ao criar tarefa!");
                return;
            }

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
                                        <input
                                            type="text"
                                            placeholder="Informe o ID da máquina"
                                            className="inputAdd"
                                            value={machineId}
                                            onChange={(e) => setMachineId(e.target.value)}
                                        />
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
