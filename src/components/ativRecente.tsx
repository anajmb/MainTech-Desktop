import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { api } from "../lib/axios";
import { useAuth } from "../contexts/authContext";
import "../styles/ativRecente.css";
import "../styles/home.css";
import Card from "./card";

export default function AtividadesRecentes() {
    const [historico, setHistorico] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHistorico = async () => {
            if (!user) return;
            try {
                const response = await api.get(`/history/get/user/${user.id}`);
                const ultimas2 = response.data
                    .sort(
                        (a: any, b: any) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .slice(0, 2);
                setHistorico(ultimas2);
            } catch (error) {
                console.error("Erro ao carregar histórico:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistorico();
    }, [user]);

    if (loading)
        return <p style={{ textAlign: "center", color: "#777" }}>Carregando...</p>;

    if (historico.length === 0)
        return <p style={{ color: "#777", textAlign: "center" }}>Nenhuma atividade recente</p>;

    return (
        <div className="atividades-container">
            {historico.map((item) => (
                <Card key={item.id || item.createdAt}> {/* key aqui */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="icon-ativ-recente">
                            <CheckCircle color="#51C385" size={22} />
                        </div>
                        <div className="ativ-info">
                            <h4 className="nomeMembro" style={{ fontSize: '0.9em' }}>{item.action}</h4>
                            <p className="ativ-info-subtitulo">
                                {new Date(item.createdAt).toLocaleDateString()} -{" "}
                                {new Date(item.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
