import { useEffect, useState } from "react";
import Card from "../../components/card";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import RandomColor from "../../hooks/randomColor";
import TresPontinhos from "../../hooks/tresPontinhos";
import { api } from "../../lib/axios";

// a escrita selecionar no input deve ficar mais clara
interface Employees {
    id: number;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    birthDate: string;
    role: 'INSPECTOR' | 'MAINTAINER';
    createDate: string;
    updateDate: string;
}

export default function CadastrarUsuario() {
    const [employeesData, setEmployeesData] = useState<Employees[]>([]);
    const [cpfData, setCpfData] = useState("");
    const [name, setName] = useState("");
    const [cargo, setCargo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const cor = RandomColor()

    async function fetchEmployees() {
        try {
            const res = await api.get('/employees/get');
            setEmployeesData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    // máscara simples de CPF (000.000.000-00)
    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const validateCPF = (cpf: string) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.charAt(10));
    };

    const handlePreRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !cpfData || !cargo) {
            alert("Preencha todos os campos!");
            return;
        }

        const cpfLimpo = cpfData.replace(/\D/g, "");
        if (!validateCPF(cpfLimpo)) {
            alert("CPF inválido!");
            return;
        }

        setIsLoading(true);
        try {
            await api.post('/employees/preRegister', {
                name,
                cpf: cpfLimpo,
                role: cargo,
            });
            alert("Usuário pré-cadastrado com sucesso!");
            setName('');
            setCpfData('');
            setCargo('');
            fetchEmployees();
        } catch (error: any) {
            if (error.response?.data?.msg) {
                alert(error.response.data.msg);
            } else {
                alert("Erro ao cadastrar usuário.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const formatRole = (role: Employees['role']) => {
        if (role === 'INSPECTOR') return 'Inspetor';
        if (role === 'MAINTAINER') return 'Manutentor';
        return role;
    };

    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Cadastrar Usuário</h2>

                <div className="containerCards">
                    {/* CARD DE CADASTRO */}
                    <CardBranco>
                        <div className="cardPage">
                            <h3 className="tituloPequenoCard">Informe os dados para liberar o cadastro</h3>
                            <form onSubmit={handlePreRegister} style={{ padding: '0px 40px', flex: 1 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div className="grupoInputLabel">
                                        <label htmlFor="nome" className="labelAddMembro">Nome completo</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="inputAdd"
                                            placeholder="Digite o nome do usuário"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="cpf" className="labelAddMembro">CPF</label>
                                        <input
                                            type="text"
                                            id="cpf"
                                            className="inputAdd"
                                            placeholder="000.000.000-00"
                                            value={cpfData}
                                            onChange={(e) => setCpfData(formatCPF(e.target.value))}
                                            maxLength={14}
                                        />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="cargo" className="labelAddMembro">Cargo</label>
                                        <div className="inputSelectDiv">
                                            <select
                                                id="cargo"
                                                className="inputSelect"
                                                value={cargo}
                                                onChange={(e) => setCargo(e.target.value)}
                                            >
                                                <option value="" disabled>Selecionar</option>
                                                <option value="INSPECTOR">Inspetor</option>
                                                <option value="MAINTAINER">Manutentor</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnDiv">
                                    <button type="submit" className="btn" disabled={isLoading}>
                                        {isLoading ? "Cadastrando..." : "Cadastrar Usuário"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </CardBranco>

                    {/* CARD DE USUÁRIOS CADASTRADOS */}
                    <CardBranco>
                        <div className="cardPage" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 className="tituloPequenoCard">Usuários cadastrados recentemente</h3>
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1em',
                                    overflowY: 'auto',
                                    justifyContent: 'center',
                                    maxHeight: '22em',
                                    width: '28em'
                                }} >
                                {employeesData.length === 0 ? (
                                    <p style={{ color: "#777", textAlign: "center" }}>
                                        Nenhuma usuário cadastrada.
                                    </p>
                                ) : (
                                    employeesData.map((employee) => (
                                        <Card key={employee.id}>
                                            <div style={{ flex: 1, width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                                                    <h3 className="nomeMembro">{employee.name}</h3>
                                                    <TresPontinhos />
                                                </div>

                                                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', paddingTop: '0.7em' }}>
                                                    <p className="emailMembro">{employee.email || "Sem e-mail"}</p>

                                                    <div style={{ backgroundColor: cor, padding: '0.3em 1.5em', borderRadius: '25px' }}>
                                                        <h3 className="cargoMembro">{formatRole(employee.role)}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>
                    </CardBranco>
                </div>
            </div>
        </div>
    );
}
