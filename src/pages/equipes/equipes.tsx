import { Link } from "react-router-dom";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { UserPlus } from "lucide-react";
import Card from "../../components/card";
import '../../styles/equipes.css'
import RandomColor from "../../hooks/randomColor";
import TresPontinhos from "../../components/tresPontinhos";
import VerMais from "../../components/verMais";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";

// ------------------- TIPOS -------------------
interface Team {
    id: number;
    name: string;
    description: string;
    members: {
        id: number;
        person: {
            name: string;
            email: string;
            role: string;
        };
    }[];
}


interface Employees {
    id: number;
    name: string;
    email: string;
}

export default function Equipes() {

    const cor = RandomColor();

    // ------------------------------------------
    // BACKEND IGUAL AO MOBILE
    // ------------------------------------------
    const [userTeam, setUserTeam] = useState<Team | null>(null);
    const [allTeams, setAllTeams] = useState<Team[]>([]);
    const [employeesData, setEmployeesData] = useState<Employees[]>([]);

    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<string>("");

    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamDesc, setNewTeamDesc] = useState("");
    const [feedback, setFeedback] = useState("");


    const userId = 1;

    // ------------------- BUSCA MINHA EQUIPE -------------------
    async function loadMyTeam() {
        try {
            const res = await api.get(`/team/getByUSer/${userId}`);
            setUserTeam(res.data);
        } catch (err) {
            console.log("Erro ao buscar equipe:", err);
        }
    }

    // ------------------- TODAS AS EQUIPES -------------------
    async function fetchAllTeams() {
        try {
            const res = await api.get("/team/get");
            setAllTeams(res.data);
        } catch (err) {
            console.log("Erro ao buscar equipes:", err);
        }
    }

    // ------------------- TODOS FUNCIONÁRIOS -------------------
    async function fetchEmployees() {
        try {
            const res = await api.get("/employees/get");
            setEmployeesData(res.data);
        } catch (err) {
            console.log("Erro ao buscar funcionários:", err);
        }
    }

    useEffect(() => {
        loadMyTeam();
        fetchAllTeams();
        fetchEmployees();
    }, []);

    // ------------------- ADICIONAR MEMBRO -------------------
    async function handleAddMember() {
        if (!selectedTeam || !selectedEmployee) {
            setFeedback("Selecione uma equipe e um email.");
            return;
        }

        try {
            const employeeObj = employeesData.find(e => e.id === Number(selectedEmployee));
            if (!employeeObj) return;


            const oldTeam = allTeams.find(t =>
                t.members.some(m => m.person.email === employeeObj.email)
            );


            if (oldTeam) {
                await api.delete("/teamMember/delete", {
                    data: {
                        teamId: oldTeam.id,
                        personId: employeeObj.id,
                    },
                });
            }

            await api.post("/teamMember/create", {
                teamId: selectedTeam,
                personId: employeeObj.id,
            });



            loadMyTeam();
            fetchAllTeams();

            setSelectedTeam(null);
            setSelectedEmployee("");

        } catch (err) {
            console.log(err);
            setFeedback("Erro ao adicionar membro.");
        }
    }

    const formatRole = (role: string): string => {
        switch (role) {
            case "INSPECTOR": return "Inspetor";
            case "MAINTAINER": return "Manutentor";
            case "ADMIN": return "Administrador";
            default: return role || "Desconhecido";
        }
    };

    // ------------------- CRIAR EQUIPE -------------------
    async function handleCreateTeam() {
        if (!newTeamName || !newTeamDesc) {
            setFeedback("Preencha todos os campos.");
            return;
        }

        try {
            await api.post("/team/create", {
                name: newTeamName,
                description: newTeamDesc,
                users: [] // igual ao mobile (cria sem membros)
            });

            setFeedback("Equipe criada com sucesso!");

            setNewTeamName("");
            setNewTeamDesc("");

            fetchAllTeams();

        } catch (err) {
            console.log(err);
            setFeedback("Erro ao criar equipe.");
        }
    }

    function refreshAll() {
        loadMyTeam();     // atualiza Minha Equipe
        fetchAllTeams();  // atualiza Todas
    }

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />

                {/* TÍTULO */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="tituloPage">Equipes </h2>

                    <Link to="/equipes/cadastrar-usuario" style={{ textDecoration: 'none' }}>
                        <div className="divNovaTarefa">
                            <UserPlus size={20} color="#fff" style={{ padding: 1 }} />
                            <h3 className="buttonTitulo">Cadastrar Usuário</h3>
                        </div>
                    </Link>
                </div>

                <div className="containerCards">

                    {/* MINHA EQUIPE (MANTEVE SEU LAYOUT EXATO) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em', flex: 1, }}>
                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Minha equipe</h3>

                                {userTeam ? (
                                    <div style={{ display: "flex", gap: '4em', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', width: '15.5em', alignItems: 'center' }}>
                                            <Card>
                                                <div className="equipeAtual">
                                                    <h3 className="nomeEquipeAtual">{userTeam.name}</h3>
                                                    <p className="descricaoEquipeAtual">{userTeam.description}</p>

                                                    <div style={{ backgroundColor: '#E6E6E6', padding: '0.5em', borderRadius: '8px', marginTop: '1em', marginBottom: '1em' }}>
                                                        <h4 className="quantMembrosEquipeAtual">
                                                            {userTeam.members.length} membros
                                                        </h4>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', width: '22em', gap: '1em', overflowY: 'auto', maxHeight: '30em' }}>

                                            {userTeam.members.map((m) => (
                                                <Card key={m.id}>
                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                                                            <h3 className="nomeMembro">{m.person.name}</h3>


                                                            <TresPontinhos
                                                                memberId={m.id}
                                                                teamId={userTeam.id}
                                                                onRemoved={async () => {

                                                                    // 1️⃣ Remove no backend
                                                                    try {
                                                                        await api.delete("/teamMember/delete", {
                                                                            data: {
                                                                                teamId: userTeam.id,
                                                                                personId: m.id,
                                                                            },
                                                                        });
                                                                    } catch (err) {
                                                                        console.log("Erro ao remover membro da equipe:", err);
                                                                    }


                                                                    setUserTeam(prev => {
                                                                        const updated = prev!.members.filter(mem => mem.id !== m.id);


                                                                        if (updated.length === 0) {
                                                                            return null;
                                                                        }

                                                                        return { ...prev!, members: updated };
                                                                    });


                                                                    setAllTeams(prev =>
                                                                        prev.map(team =>
                                                                            team.id === userTeam.id
                                                                                ? {
                                                                                    ...team,
                                                                                    members: team.members.filter(mem => mem.id !== m.id)
                                                                                }
                                                                                : team
                                                                        )
                                                                    );


                                                                    refreshAll();
                                                                }}
                                                            />
                                                        </div>

                                                        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', paddingTop: '0.7em' }}>
                                                            <p className="emailMembro">{m.person.email}</p>


                                                            <div style={{ backgroundColor: cor, padding: '0.3em 1.5em', borderRadius: '25px' }}>
                                                                <h3 className="cargoMembro">
                                                                    {formatRole(m.person.role)}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}

                                        </div>
                                    </div>
                                ) : (
                                    <p style={{ textAlign: "center", marginTop: 20 }}>Você não está em uma equipe</p>
                                )}
                            </div>
                        </CardBranco>

                        {/* ADICIONAR MEMBRO */}
                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Adicionar membro</h3>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3em', padding: '0px 40px' }}>

                                    {/* Selecionar equipe */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                                        <label htmlFor="equipe" className="labelAddMembro">Nome da Equipe</label>

                                        <div className="inputSelectDiv">
                                            <select
                                                className="inputSelect"
                                                value={selectedTeam ?? ""}
                                                onChange={e => setSelectedTeam(Number(e.target.value))}
                                            >
                                                <option value="" disabled>Selecionar</option>

                                                {allTeams.map(t => (
                                                    <option key={t.id} value={t.id}>{t.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="grupoInputLabel">
                                        <label htmlFor="usuario" className="labelAddMembro">Usuário</label>

                                        <div className="inputSelectDiv">
                                            <select
                                                className="inputSelect"
                                                value={selectedEmployee ?? ""}
                                                onChange={e => setSelectedEmployee(e.target.value)}
                                            >
                                                <option value="" disabled>Selecionar</option>

                                                {employeesData.map(emp => (
                                                    <option key={emp.id} value={emp.id}>
                                                        {emp.name} ({emp.email})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3em' }}>
                                    <button className="btn btnAddMembro" onClick={handleAddMember}>
                                        Adicionar
                                    </button>
                                </div>

                                {feedback && (
                                    <p style={{ textAlign: "center", marginTop: 10, color: feedback.includes("Erro") ? "red" : "green" }}>
                                        {feedback}
                                    </p>
                                )}
                            </div>
                        </CardBranco>

                        {/* CRIAR EQUIPE */}
                        <CardBranco>
                            <div className="cardPage">
                                <h3 className="tituloCard">Criar equipe</h3>

                                <div style={{ padding: '0px 40px', flex: 1 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="nome" className="labelAddMembro">Nome</label>
                                            <input
                                                type="text"
                                                name="nome"
                                                id="nome"
                                                placeholder="Ex: Equipe administrativa"
                                                className="inputAdd"
                                                value={newTeamName}
                                                onChange={e => setNewTeamName(e.target.value)}
                                            />
                                        </div>

                                        <div className="grupoInputLabel">
                                            <label htmlFor="descricao" className="labelAddMembro">Descrição</label>
                                            <textarea
                                                name="descricao"
                                                id="descricao"
                                                rows={8}
                                                placeholder="Descreva os detalhes da equipe"
                                                className="inputAdd inputAddDescricao"
                                                value={newTeamDesc}
                                                onChange={e => setNewTeamDesc(e.target.value)}
                                            ></textarea>
                                        </div>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3em' }}>
                                        <button className="btn btnAddMembro" onClick={handleCreateTeam}>Criar</button>
                                    </div>

                                    {feedback && (
                                        <p style={{ textAlign: "center", marginTop: 10, color: feedback.includes("Erro") ? "red" : "green" }}>
                                            {feedback}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardBranco>

                    </div>

                    {/* TODAS AS EQUIPES — agora usando backend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
                        <CardBranco>
                            <div className="cardHomeAcoes">
                                <h3 className="tituloCard">Todas</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>

                                    {allTeams.map(team => (
                                        <Card key={team.id}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: "center", gap: 8 }}>
                                                    <div className="circuloEquipe" style={{ backgroundColor: cor }}></div>
                                                    <h3 className="nomeMembro">{team.name}</h3>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: "center", paddingTop: '0.7em' }}>
                                                    <p className="descricaoEquipe">{team.description}</p>
                                                </div>

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'right',
                                                        marginTop: '1.2em',
                                                        borderRadius: 25,
                                                        backgroundColor: '#D9D9D9',
                                                        padding: '4px 20px',
                                                        width: '4em',
                                                        right: 0
                                                    }}
                                                >
                                                    <h5 style={{ fontWeight: 400, margin: 0, fontSize: '0.65em', textAlign: 'center' }}>
                                                        {team.members.length} membros
                                                    </h5>
                                                </div>

                                                <VerMais
                                                    teamId={team.id}
                                                    onRemoved={refreshAll}
                                                    onUpdateTeams={refreshAll}
                                                />
                                            </div>
                                        </Card>
                                    ))}


                                </div>

                            </div>
                        </CardBranco>
                    </div>

                </div>
            </div>
        </div>
    )
}
