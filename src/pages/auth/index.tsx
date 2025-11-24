import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { decodeJwt, saveToken } from '../../lib/auth'
import { api } from '../../lib/axios'

export default function Login() {

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [cpfData, setCpfData] = useState("");
    const [passwordData, setPasswordData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [keepConnected, setKeepConnected] = useState(false);

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handlePassword = () => setMostrarSenha(!mostrarSenha);

    // MÁSCARA PARA O FRONT
    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    // REMOVE FORMATAÇÃO PARA O BACKEND
    const limparCPF = (value: string) => value.replace(/\D/g, "");

    const handleLogin = async (e: any) => {
        e.preventDefault();

        if (!cpfData.trim() || !passwordData.trim()) {
            window.alert("Preencha CPF e senha.");
            return;
        }

        const cpfLimpo = limparCPF(cpfData);

        setIsLoading(true);
        try {
            const payload = {
                cpf: cpfLimpo,
                password: passwordData.trim()
            };

            const res = await api.post("/employees/login", payload);

            const token =
                res.data?.token ||
                res.data?.accessToken ||
                res.data?.access_token ||
                res.data?.accessTokenRaw;

            if (!token) {
                window.alert("Erro: login inválido.");
                return;
            }

            await saveToken(token);

            let user = res.data?.user;

            if (!user) {
                const decoded = decodeJwt(token);
                const id = decoded?.id ?? decoded?.sub ?? decoded?.userId;

                if (id) {
                    const userRes = await api.get(`/employees/getUnique/${id}`);
                    user = userRes.data;
                }
            }

            if (user) {
                loginUser(user, token, keepConnected);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                localStorage.setItem("keepConnected", keepConnected ? "true" : "false");
            }

            navigate("/home");

        } catch (error) {
            console.log("LOGIN ERROR:", error);
            window.alert("Falha no login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='containerLogin'>
            <div className="cardLogin">
                <div className='logoClasseLogin'>
                    <img src={img} alt="Logo MainTech" className='imgLogo' />
                </div>

                <form className='formLogin' onSubmit={handleLogin}>
                    <h1 className='tituloLogin'>Login</h1>

                    <div className='classeInputLogin'>
                        <label htmlFor="cpf" className='labelLogin'>CPF</label>
                        <input
                            type="text"
                            id='cpf'
                            maxLength={14}
                            placeholder="000.000.000-00"
                            className='inputAdd inputAuth'
                            value={cpfData}
                            onChange={(e) => setCpfData(formatCPF(e.target.value))}
                        />
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Senha</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                id="senha"
                                placeholder='********'
                                className='inputAdd inputAuth'
                                style={{ width: '100%' }}
                                onChange={(e) => setPasswordData(e.target.value)}
                            />
                            <div onClick={handlePassword}>
                                {mostrarSenha ? (
                                    <Eye size={18} className='eyeIcon' />
                                ) : (
                                    <EyeOff size={18} className='eyeIcon' />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='conectadoGeral'>
                        <input
                            type="checkbox"
                            id="conectado"
                            checked={keepConnected}
                            onChange={(e) => setKeepConnected(e.target.checked)}
                            style={{ cursor: 'pointer' }}
                        />
                        <p className='conectadoTexto'>Mantenha-me conectado</p>
                    </div>

                    <div className='botaoLoginClasse'>
                        <button type="submit" className='botaoLogin' disabled={isLoading}> Entrar </button>
                    </div>

                    <div className='linksLogin'>
                        <p>Seu primeiro acesso? <a href="/cadastro" className='aLogin'>Cadastre-se</a></p>
                        <a href="/recuperar-senha" className='aLogin'>Esqueci minha senha</a>
                    </div>

                </form>
            </div>
        </div>
    );
}
