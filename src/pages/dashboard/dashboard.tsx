import { Chart as ChartJS, CategoryScale,  LinearScale, BarElement, ArcElement, Tooltip, Legend, } from "chart.js";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { api } from "../../lib/axios";
import { Bar, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

// terminar de colocar os gráficos (Tempo médio e O.S. Geradas)

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface Task {
    id: number;
    status: "PENDING" | "COMPLETED";
    updateDate: string;
}

export default function Dashboard() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/tasks/get")
            .then((res) => setTasks(res.data))
            .catch((err) => console.error("Erro ao buscar tarefas:", err))
            .finally(() => setLoading(false));
    }, []);

    const completedTasks = tasks.filter((t) => t.status === "COMPLETED");
    const pendingTasks = tasks.filter((t) => t.status === "PENDING");

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const completedByDay = new Array(7).fill(0);

    completedTasks.forEach((task) => {
        const dayIndex = new Date(task.updateDate).getDay();
        completedByDay[dayIndex] += 1;
    });

    const weeklyActivityData = {
        labels: daysOfWeek,
        datasets: [
            {
                label: "Tarefas Concluídas",
                data: completedByDay,
                backgroundColor: "rgba(255, 228, 230, 1)",
                borderRadius: 5,
                borderColor: "#E34945",
                borderWidth: 1.5
            },
        ],
    };

    const serviceOrdersData = {
        labels: ["Concluídas", "Pendentes"],
        datasets: [
            {
                data: [completedTasks.length, pendingTasks.length],
                backgroundColor: ["#AA9EFF", "#DBB9FF"],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };


    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Dashboard </h2>

                <div className="containerCards">
                    <div style={{ flex: 1 }}>

                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly', marginBottom: '2em', gap: '8em' }}>

                            {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', flex: 1}}> */}
                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">Tarefas</h2>
                                    <Pie data={serviceOrdersData} style={{ width: '15em', }} />
                                </div>
                            </CardBranco>
                            {/* </div> */}

                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">O.S. Completas</h2>
                                </div>
                            </CardBranco>

                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">O.S. Geradas</h2>
                                </div>
                            </CardBranco>
                        </div>

                        <div style={{ flex: 1, width: '100%' }}>
                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">Atividade Semanal</h2>

                                    <div style={{ height: '20em', marginTop: '1em' }}>
                                        <Bar data={weeklyActivityData} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                            </CardBranco>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}