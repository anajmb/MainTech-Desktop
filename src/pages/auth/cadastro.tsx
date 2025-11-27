import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { api } from "../../lib/axios";
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export default function Cadastro() {

    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const [date, setDate] = useState<string>("");
    const [cpfData, setCpfData] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handlePassword = () => setMostrarSenha(!mostrarSenha);

    const limparCpf = (value: string) => value.replace(/\D/g, "");
    const limparPhone = (value: string) => value.replace(/\D/g, "");

    // ➜ Validação real de CPF
    const validarCPF = (cpf: string) => {
        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++)
            soma += parseInt(cpf[i - 1]) * (11 - i);

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++)
            soma += parseInt(cpf[i - 1]) * (12 - i);

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        return resto === parseInt(cpf[10]);
    };


    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };


    const formatPhone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/g, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    };

    async function handleCadastro(e: React.FormEvent) {
        e.preventDefault();

        const cpfLimpo = limparCpf(cpfData);
        const phoneLimpo = limparPhone(phone);

        if (!name || !email || !phone || !cpfData || !password || !date) {
            toast.error("Preencha todos os campos!");
            return;
        }

        if (!validarCPF(cpfLimpo)) {
            toast.error("CPF inválido!");
            return;
        }

        if (phoneLimpo.length < 10) {
            toast.error("Telefone inválido!");
            return;
        }

        setIsLoading(true);

        try {
            await api.post("/employees/completeRegister", {
                name,
                cpf: cpfLimpo,
                email,
                phone: phoneLimpo,
                birthDate: date,
                password,
            });

            toast.success("Cadastro feito com sucesso!");
            navigate("/");
        } catch (error: any) {
            if (error.response?.status === 409) {
                alert(error.response.data.msg);
            } else if (error.response?.status === 404) {
                toast.error("Não existe um pré-cadastro para este CPF.");
            } else {
                toast.error("Erro ao completar cadastro.")
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='containerLogin'>

            <div className="cardLogin">

                <div className='logoClasseLogin'>
                    <img src={img} alt="Logo MainTech" className='imgLogo' />
                </div>

                <form action="" className='formLogin'>
                    <h1 className='tituloLogin'>Cadastro</h1>

                    <div className='classeInputLogin'>
                        <label htmlFor="nome" className='labelLogin'>Nome</label>
                        <input type="text" name='nome' id='nome' placeholder="Ex: Ana Luiza" className='inputAdd inputAuth' value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="telefone" className='labelLogin'>Telefone</label>
                        <input type="tel" name='telefone' id='telefone' placeholder="() _____ - ____" className='inputAdd inputAuth' value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))} maxLength={15} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                        <div className='classeInputLogin'>
                            <label htmlFor="data" className='labelLogin'>Data de Nascimento</label>
                            <input type="date" id='data' className='inputAdd inputAuth' style={{ width: '15em' }}
                                value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div className='classeInputLogin'>
                            <label htmlFor="cpf" className='labelLogin'>CPF</label>
                            <input type="text" name='cpf' id='cpf' placeholder="000.000.000-00" className='inputAdd inputAuth' style={{ width: '15em' }}
                                value={cpfData} onChange={(e) => setCpfData(formatCPF(e.target.value))} maxLength={14} />
                        </div>
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="email" className='labelLogin'>E-mail</label>
                        <input type="text" id='email' placeholder="Ex: ana@gmail.com" className='inputAdd inputAuth' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Senha</label>

                        <div style={{ position: 'relative' }}>

                            <input type={mostrarSenha ? 'text' : 'password'} name="senha" id="senha" placeholder='********' className='inputAdd inputAuth' style={{ width: '100%' }}
                                value={password} onChange={(e) => setPassword(e.target.value)} />

                            <div onClick={handlePassword}>
                                {mostrarSenha ? <Eye size={18} className='eyeIcon' /> : <EyeOff size={18} className='eyeIcon' />}
                            </div>
                        </div>
                    </div>

                    <div className='botaoLoginClasse'>
                        <button type="submit" className='botaoLogin' onClick={handleCadastro} disabled={isLoading}>Cadastrar</button>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={true}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                            transition={Bounce}
                            toastStyle={{ fontSize: '0.9em' }}
                        />
                    </div>

                    <div className='linksLogin' style={{ display: 'flex', justifyContent: 'center' }}>
                        <a href="/" className='aLogin'>Voltar ao Login</a>
                    </div>


                </form>
            </div>
            {/* </div> */}
        </div>
    )
}