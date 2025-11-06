import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { decodeJwt, saveToken } from '../../lib/auth'
import { api } from '../../lib/axios'

// aceitar so numeros no cpf
// estilizar o focus do input

export default function Login() {

    const [mostrarSenha, setMostrarSenha] = useState(false)

    const handlePassword = () => {
        setMostrarSenha(!mostrarSenha)
    }


    const [cpfData, setCpfData] = useState("");
    const [passwordData, setPasswordData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handleLogin = async () => {
        if (!cpfData.trim() || !passwordData.trim()) {
            window.alert("Preencha CPF e senha.");
            return;
        }

        setIsLoading(true);
        try {
            const payload = { cpf: cpfData.trim(), password: passwordData.trim() };
            const res = await api.post("/employees/login", payload);

            const token =
                res.data?.token ||
                res.data?.accessToken ||
                res.data?.access_token ||
                res.data?.accessTokenRaw;

            if (!token) {
                window.alert("Erro: Resposta de login inválida");
                setIsLoading(false);
                return;
            }

            await saveToken(token);

            let user = res.data?.user;
            if (!user) {
                const payload = decodeJwt(token);
                const id = payload?.id ?? payload?.sub ?? payload?.userId;
                if (id) {
                    const userRes = await api.get(`/employees/getUnique/${id}`);
                    user = userRes.data;
                }
            }

            if (user) {
                loginUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
            }

            navigate("/home");
        } catch (error: any) {
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

                <form action="" className='formLogin'>
                    <h1 className='tituloLogin'>Login</h1>

                    <div className='classeInputLogin'>
                        <label htmlFor="cpf" className='labelLogin'>CPF</label>
                        <input type="text" name='cpf' id='cpf' maxLength={11} placeholder="___ . ___ . ___ - __" className='inputAdd inputAuth' value={cpfData}
                            onChange={(e) => setCpfData(e.target.value)} />
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Senha</label>

                        <div style={{ position: 'relative' }}>

                            <input type={mostrarSenha ? 'text' : 'password'} name="senha" id="senha" placeholder='********' className='inputAdd inputAuth' style={{ width: '100%' }} onChange={(e) => setPasswordData(e.target.value)} />

                            <div onClick={handlePassword}>
                                {mostrarSenha ? <Eye size={18} className='eyeIcon' /> : <EyeOff size={18} className='eyeIcon' />}
                            </div>
                        </div>
                    </div>

                    <div className='conectadoGeral'>
                        <input type="checkbox" name="conectado" id="conectado" style={{ cursor: 'pointer' }} />
                        <p id='conectado' className='conectadoTexto'>Mantenha-me conectado</p>
                    </div>

                    <div className='botaoLoginClasse'>

                        <button type="submit" className='botaoLogin' onClick={handleLogin}
                            disabled={isLoading}>Entrar</button>
                    </div>

                    <div className='linksLogin'>
                        <p>Seu primeiro acesso? <a href="/cadastro" className='aLogin'>Cadastre-se</a></p>
                        <a href="/recuperar-senha" className='aLogin'>Esqueci minha senha</a>
                    </div>


                </form>
            </div>
            {/* </div> */}
        </div>
    )
}