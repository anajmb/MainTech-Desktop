import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { api } from '../../lib/axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'

export default function RecuperarSenha() {

    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();
    const email = new URLSearchParams(location.search).get("email") || "";

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erroMsg, setErroMsg] = useState("");

    async function handleResetPassword(e: React.MouseEvent) {
        e.preventDefault(); // impede reload

        if (isLoading) return;

        if (!password || !confirm) {
            setErroMsg("Preencha todos os campos!");
            return;
        }

        if (password !== confirm) {
            setErroMsg("As senhas não coincidem!");
            return;
        }

        try {
            setIsLoading(true);
            setErroMsg("");

            await api.post("/auth/reset-password", {
                email,
                newPassword: password
            });

            toast.success("Senha redefinida com sucesso!");
            navigate("/");

        } catch (error: any) {
            toast.error(error.response?.data?.error || "Erro ao redefinir senha");
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

                <form className='formLogin' onSubmit={(e) => e.preventDefault()}>
                    <h1 className='tituloLogin'>Redefinir Senha</h1>

                    {/* Senha */}
                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Nova senha</label>

                        <div style={{ position: 'relative' }}>
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                id="senha"
                                placeholder='********'
                                className='inputAdd inputAuth'
                                style={{ width: '100%' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div onClick={() => setMostrarSenha(!mostrarSenha)}>
                                {mostrarSenha ? (
                                    <Eye size={18} className='eyeIcon' />
                                ) : (
                                    <EyeOff size={18} className='eyeIcon' />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Confirmar senha */}
                    <div className='classeInputLogin'>
                        <label htmlFor="confSenha" className='labelLogin'>Confirmar senha</label>

                        <div style={{ position: 'relative' }}>
                            <input
                                type={mostrarConfirmacao ? 'text' : 'password'}
                                id="confSenha"
                                placeholder='********'
                                className='inputAdd inputAuth'
                                style={{ width: '100%' }}
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />

                            <div onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}>
                                {mostrarConfirmacao ? (
                                    <Eye size={18} className='eyeIcon' />
                                ) : (
                                    <EyeOff size={18} className='eyeIcon' />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mensagem de erro */}
                    {erroMsg && (
                        <div className='erroMsg'>{erroMsg}</div>
                    )}

                    {/* Botão */}
                    <div className='botaoLoginClasse'>
                        <button
                            type="button"
                            className='botaoLogin'
                            style={{ marginTop: '1em', marginBottom: '2em' }}
                            onClick={handleResetPassword}
                            disabled={isLoading}
                        >
                            {isLoading ? "Carregando..." : "Redefinir"}
                        </button>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            closeOnClick={true}
                            pauseOnHover
                            theme="dark"
                            transition={Bounce}
                            toastStyle={{ fontSize: '0.9em' }}
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}
