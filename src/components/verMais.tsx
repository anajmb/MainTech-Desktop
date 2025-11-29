import { useEffect, useState } from "react";
import TresPontinhos from "../components/tresPontinhos";
import RandomColor from "../hooks/randomColor";
import CardBranco from "../components/cardBranco";
import { api } from "../lib/axios";

// === TIPAGENS ===
export interface Member {
    id: number;
    person: {
        name: string;
        email: string;
        role: "INSPECTOR" | "MAINTAINER" | "ADMIN" | string;
    };
}

export interface TeamData {
    id: number;
    name: string;
    description: string;
    members: Member[];
}

interface VerMaisProps {
    teamId: number;
    onRemoved?: () => void;
    onUpdateTeams?: () => void;
}

export default function VerMais({ teamId, onRemoved, onUpdateTeams }: VerMaisProps) {

    const [verMais, setVerMais] = useState(false);
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [loading, setLoading] = useState(false);
    const [, setTeams] = useState([]);

    const cor = RandomColor();

    const handleToggle = async () => {
        const novoEstado = !verMais;
        setVerMais(novoEstado);

        if (novoEstado) {
            await loadMembers(); // sempre carrega ao abrir
        }
    };

    const formatRole = (role: string): string => {
        switch (role) {
            case "INSPECTOR": return "Inspetor";
            case "MAINTAINER": return "Manutentor";
            case "ADMIN": return "Administrador";
            default: return role || "Desconhecido";
        }
    };

    const loadMembers = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/team/getUnique/${teamId}`);
            setTeamData(res.data);
        } catch (err) {
            console.error("Erro ao buscar equipe:", err);
        } finally {
            setLoading(false);
        }
    };

    const loadTeams = async () => {
        try {
            const res = await api.get("/team/getAll");
            setTeams(res.data);
        } catch { }
    };

    useEffect(() => {
        loadTeams();
        loadMembers();
    }, [teamId]);

    return (
        <div style={{ marginTop: "2em" }}>
            {verMais && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                        overflowY: "auto",
                        maxHeight: "30em",
                        margin: "0.8em",
                    }}
                >
                    {loading && (
                        <p style={{ textAlign: "center", color: "#666" }}>Carregando...</p>
                    )}

                    {!loading && teamData?.members?.length === 0 && (
                        <p style={{ textAlign: "center", color: "#666" }}>
                            Nenhum membro encontrado.
                        </p>
                    )}

                    {!loading &&
                        teamData?.members?.map((member) => (
                            <CardBranco key={member.id}>
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <h3 className="nomeMembro" style={{ fontSize: "0.8em" }}>
                                            {member.person.name}
                                        </h3>

                                        <TresPontinhos
                                            memberId={member.id}
                                            teamId={teamId}
                                            onRemoved={() => {
                                                loadMembers();
                                                onRemoved?.();      // atualiza Equipes.jsx
                                            }}
                                            onUpdateTeams={() => {
                                                loadTeams();
                                                onUpdateTeams?.();  // atualiza Equipes.jsx
                                            }}
                                        />
                                    </div>

                                    <p className="emailMembro" style={{ fontSize: "0.7em" }}>
                                        {member.person.email}
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "0.5em",
                                        }}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: cor,
                                                padding: "0.2em 1.3em",
                                                borderRadius: "25px",
                                                width: "6em",
                                            }}
                                        >
                                            <h3 className="cargoMembro">
                                                {formatRole(member.person.role)}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </CardBranco>
                        ))}
                </div>
            )}

            <div
                onClick={handleToggle}
                style={{
                    fontWeight: "500",
                    color: "#D40303",
                    margin: 0,
                    cursor: "pointer",
                    fontSize: "0.8em",
                    textAlign: "end",
                }}
            >
                {verMais ? "Ver Menos" : "Ver Mais"}
            </div>
        </div>
    );
}
