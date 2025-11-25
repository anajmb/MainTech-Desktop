import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export default function Notificacao() {

    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    async function fetchNotifications() {
        try {
            setLoading(true);

            const response = await api.get("/tasks/get/expiring-soon");

            const data = response.data.map(task => ({
                id: task.id,
                title: task.title,
                expirationDate: task.expirationDate
            }));

            setNotifications(data);

        } catch (error) {
            console.log("Erro ao buscar notificações:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (open) fetchNotifications();
    }, [open]);

    return (
        <div style={{ position: "relative" }}>
            
            {/* Ícone do sino */}
            <div onClick={toggle} style={{ cursor: "pointer" }}>
                <Bell color="#A50702" fill="#A50702" />
            </div>

            {/* Dropdown */}
            {open && (
                <div style={{
                    position: 'absolute',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    right: '4em',
                    padding: '10px 20px',
                    cursor: 'default',
                    width: '18em',
                    zIndex: 100,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}>
                    <h3 style={{
                        color: '#C21C1C',
                        fontSize: '0.95em',
                        fontWeight: 500,
                        textAlign: 'center',
                        marginBottom: "10px"
                    }}>
                        Notificações
                    </h3>

                    {/* Carregando */}
                    {loading && (
                        <p style={{ textAlign: "center", fontSize: "0.8em" }}>
                            Carregando...
                        </p>
                    )}

                    {/* Sem notificações */}
                    {!loading && notifications.length === 0 && (
                        <p style={{ textAlign: "center", fontSize: "0.8em" }}>
                            Nenhuma notificação por enquanto.
                        </p>
                    )}

                    {/* Lista */}
                    {!loading && notifications.map((item) => {
                        const formattedDate = new Date(item.expirationDate)
                            .toLocaleDateString("pt-BR");

                        return (
                            <div key={item.id} style={{ marginBottom: '1em' }}>
                                <h4 style={{
                                    fontSize: '0.8em',
                                    fontWeight: 600,
                                    margin: 0,
                                    marginBottom: '0.5em'
                                }}>
                                    Tarefa quase expirando
                                </h4>

                                <p style={{
                                    fontSize: '0.75em',
                                    margin: 0,
                                    fontWeight: 500,
                                    color: "#333"
                                }}>
                                    A tarefa <strong>{item.title}</strong> expira em {formattedDate}
                                </p>

                                <hr style={{ marginTop: "8px" }} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
