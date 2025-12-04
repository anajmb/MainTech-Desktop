import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, LineElement, PointElement } from "chart.js";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { api } from "../../lib/axios";
import { Bubble, Doughnut, Line, Pie } from "react-chartjs-2";
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

interface Machines {
    id: number;
    name: string;
    temperature: number;

}

export default function Dashboard() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [, setLoading] = useState(true);
    const [machines, setMachines] = useState<Machines[]>([]);


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

    useEffect(() => {
        api.get("/machines/get")
            .then((res) => setMachines(res.data))
            .catch((err) => console.error("Erro ao buscar máquinas:", err));
        console.log(machines);
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

    const bubbleData = {
        datasets: [
            {
                label: "Temperatura da máquina",
                data: machines
                    .filter(m => m.temperature !== null && m.temperature !== undefined)
                    .map((m) => ({
                        x: m.id,
                        y: m.temperature,
                        r: Math.max(5, m.temperature / 2), // bolha proporcional
                        maquina: m.name,        // <- adicione isso
                        temperatura: m.temperature // <- opcional, mas ajuda
                    })),
                backgroundColor: "rgba(83, 127, 241, 0.5)",
                borderColor: "rgba(83,127,241,1)",
            }
        ]
    };

    // const customTooltipChartJS = (context: any) => {
    //     const tooltip = context.tooltip;

    //     let tooltipEl = document.getElementById("chartjs-custom-tooltip");

    //     // Cria tooltip se não existir
    //     if (!tooltipEl) {
    //         tooltipEl = document.createElement("div");
    //         tooltipEl.id = "chartjs-custom-tooltip";
    //         tooltipEl.style.position = "absolute";
    //         tooltipEl.style.background = "#333";
    //         tooltipEl.style.color = "#fff";
    //         tooltipEl.style.padding = "6px 10px";
    //         tooltipEl.style.borderRadius = "6px";
    //         tooltipEl.style.fontSize = "14px";
    //         tooltipEl.style.whiteSpace = "nowrap";
    //         tooltipEl.style.pointerEvents = "none";
    //         tooltipEl.style.opacity = "0";
    //         tooltipEl.style.transition = "opacity 0.2s";
    //         document.body.appendChild(tooltipEl);
    //     }

    //     // Se não estiver ativo → esconder
    //     if (tooltip.opacity === 0) {
    //         tooltipEl.style.opacity = "0";
    //         return;
    //     }

    //     // Valor da temperatura (eixo Y)
    //     const valor = tooltip.dataPoints[0].parsed.y;

    //     tooltipEl.innerHTML = `Temperatura: ${valor}°C`;

    //     const { offsetLeft, offsetTop } = context.chart.canvas;

    //     tooltipEl.style.left = offsetLeft + tooltip.caretX + "px";
    //     tooltipEl.style.top = offsetTop + tooltip.caretY + "px";
    //     tooltipEl.style.opacity = "1";
    // };

    const bubbleOptions = {
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context: any) => {
                        const d = context.raw;
                        return [
                            ` ${d.maquina}`,
                            `Temperatura: ${d.temperatura}°C`,
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: "ID da Máquina" },
                min: 0,
                max: 5,             // mostra até o 5 MESMO sem dados
                ticks: {
                    stepSize: 1,    // incrementa de 1 em 1
                    callback: (value: any) => Number(value),
                }
            },
            y: {
                title: { display: true, text: "Temperatura (°C)" }
            }
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

                        <div style={{ display: 'flex', flex: 1, flexWrap: "wrap", justifyContent: 'space-evenly', marginBottom: '2em', gap: '2em' }}>

                            {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap', flex: 1}}> */}
                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">Tarefas</h2>
                                    <div style={{ width: "18em", height: "18em", margin: "0 auto" }}>
                                        <Pie data={serviceOrdersData} />
                                    </div>
                                </div>
                            </CardBranco>
                            {/* </div> */}

                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">Atividade Mensal</h2>
                                    <div style={{ width: "18em", height: "18em", margin: "0 auto" }}>
                                        <Doughnut data={dadosTarefasMensais}
                                            options={{ maintainAspectRatio: false, plugins: { customTotal: totalTarefas } }} plugins={[textCenter]} />
                                    </div>

                                </div>
                            </CardBranco>

                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">O.S. Geradas</h2>
                                    <div style={{ width: "18em", height: "18em", margin: "0 auto" }}>
                                        <Line data={serviceOrdersTotal} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                            </CardBranco>
                        </div>

                        <div style={{ flex: 1, width: '100%' }}>
                            <CardBranco>
                                <div className="cardPage">
                                    <h2 className="tituloCard">Temperatura das Máquinas</h2>

                                    <div style={{ height: '20em', marginTop: '1em' }}>
                                        <Bubble data={bubbleData} options={bubbleOptions} />


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