import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, LineElement, PointElement, } from "chart.js";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { api } from "../../lib/axios";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

// colocar o gráfico do IoT

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

interface Task {
    id: number;
    status: "PENDING" | "COMPLETED";
    updateDate: string;
}

interface ServiceOrder {
    id: number;
    status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED';
    updatedAt: string;
    maintainerId?: number;
}

export default function Dashboard() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/tasks/get")
            .then((res) => setTasks(res.data))
            .catch((err) => console.error("Erro ao buscar tarefas:", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        api.get("/serviceOrders/get")
            .then((res) => setServiceOrders(res.data))
            .catch((err) => console.error("Erro ao buscar O.S.:", err));
    }, []);


    const completedTasks = tasks.filter((t) => t.status === "COMPLETED");
    const pendingTasks = tasks.filter((t) => t.status === "PENDING");

    const completedByDay = new Array(7).fill(0);

    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);

    completedTasks.forEach((task) => {
        const dayIndex = new Date(task.updateDate).getDay();
        completedByDay[dayIndex] += 1;
    });

    const tasksByMonth = Array(12).fill(0);

    tasks.forEach((task) => {
        const month = new Date(task.updateDate).getMonth(); // 0-11
        tasksByMonth[month] += 1;
    });

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

    const completedByMonth = Array(12).fill(0);
    const pendingByMonth = Array(12).fill(0);

    serviceOrders.forEach((os) => {
        const month = new Date(os.updatedAt).getMonth(); // 0-11

        if (os.status === "COMPLETED") {
            completedByMonth[month] += 1;
        } else {
            pendingByMonth[month] += 1;
        }
    });

    const monthLabels = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const serviceOrdersTotal = {
        labels: monthLabels,
        datasets: [
            {
                label: "Concluídas",
                data: completedByMonth,
                fill: false,
                borderColor: "#4737A1",
                backgroundColor: "#4737A130",
                borderWidth: 1.2,
                tension: 0.2
            },
            {
                label: "Pendentes",
                data: pendingByMonth,
                fill: false,
                borderColor: "#FF928A",
                backgroundColor: "#FF928A30",
                borderWidth: 1.2,
                tension: 0.2
            }
        ]
    };

    const filteredMonths = monthLabels.filter((_, index) => tasksByMonth[index] > 0);
    const filteredData = tasksByMonth.filter(count => count > 0);
    const totalTarefas = filteredData.reduce((sum, count) => sum + count, 0);

    const dadosTarefasMensais = {
        labels: filteredMonths.length > 0 ? filteredMonths : ["Sem dados"],
        datasets: [
            {
                data: filteredData.length > 0 ? filteredData : [0],
                backgroundColor: [
                    '#FFAE4C',
                    '#3CC3DF',
                    '#FF928A',
                    '#537FF1',
                ],
                borderRadius: 5,
                borderWidth: 0,
                cutout: '70%'
            },
        ],
    };

const textCenter = {
    id: 'textCenter',
    afterDatasetsDraw(chart: any) {
        const { ctx, chartArea: { left, top, width, height } } = chart;

        ctx.save();

        const total = chart.config.options.plugins?.customTotal ?? 0;

        ctx.font = "bold 2em sans-serif";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Centralizar no meio da área do gráfico
        const x = left + width / 2;
        const y = top + height / 2;

        ctx.fillText(total.toString(), x, y);

        ctx.restore();
    }
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
                                    <div style={{ width: "20em", height: "20em", margin: "0 auto" }}>
                                        <Pie data={serviceOrdersData} />
                                    </div>
                                </div>
                            </CardBranco>
                            {/* </div> */}

                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">Atividade Mensal</h2>
                                    <div style={{ width: "20em", height: "20em", margin: "0 auto"}}>
                                        <Doughnut data={dadosTarefasMensais}
                                            options={{ maintainAspectRatio: false, plugins: { customTotal: totalTarefas } }} plugins={[textCenter]} />
                                    </div>

                                </div>
                            </CardBranco>

                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">O.S. Geradas</h2>
                                    <div style={{ height: '20em' }}>
                                        <Line data={serviceOrdersTotal} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                            </CardBranco>
                        </div>

                        <div style={{ flex: 1, width: '100%' }}>
                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">Temperatura da Máquina</h2>

                                    <div style={{ height: '20em', marginTop: '1em' }}>
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