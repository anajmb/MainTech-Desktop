import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { api } from '../../lib/axios'
import { useLocation, useNavigate } from 'react-router-dom'

// redirecionar ao login depois de trocar a senha

export default function RecuperarSenha() {

    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [confirmarSenha, setConfirmarSenha] = useState(false)

    const handlePassword = () => {
        setMostrarSenha(!mostrarSenha)
    }

    const handleConfirmarPassword = () => {
        setConfirmarSenha(!confirmarSenha)
    }


    const location = useLocation();
    const navigate = useNavigate();
    const email = new URLSearchParams(location.search).get("email") || "";

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleResetPassword() {
        if (!password || !confirm) {
            alert("Preencha todos os campos!");
            return;
        }

        if (password !== confirm) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            setIsLoading(true);
            await api.post("/auth/reset-password", { email, newPassword: password });
            alert("Senha redefinida com sucesso!");
            navigate("/");
        } catch (error: any) {
            alert(error.response?.data?.error || "Erro ao redefinir senha");
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
                    <h1 className='tituloLogin'>Redefinir Senha</h1>

                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Nova senha</label>

                        <div style={{ position: 'relative' }}>

                            <input type={mostrarSenha ? 'text' : 'password'} name="senha" id="senha" placeholder='********' className='inputAdd inputAuth' style={{ width: '100%' }} 
                            value={password} onChange={(e) => setPassword(e.target.value)}/>

                            <div onClick={handlePassword}>
                                {mostrarSenha ? <Eye size={18} className='eyeIcon' /> : <EyeOff size={18} className='eyeIcon' />} 
                            </div>
                        </div>
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="confSenha" className='labelLogin'>Confirmar senha</label>

                        <div style={{ position: 'relative' }}>

                            <input type={confirmarSenha ? 'text' : 'password'} name="confSenha" id="confSenha" placeholder='********' className='inputAdd inputAuth' style={{ width: '100%' }} 
                            value={confirm} onChange={(e) => setConfirm(e.target.value)}/>

                            <div onClick={handleConfirmarPassword}>
                                {confirmarSenha ? <Eye size={18} className='eyeIcon' /> : <EyeOff size={18} className='eyeIcon' />}
                            </div>
                        </div>
                    </div>

                    <div className='botaoLoginClasse'>
                        <button type="submit" className='botaoLogin' style={{ marginTop: '1em', marginBottom: '2em' }} onClick={handleResetPassword} disabled={isLoading}>Redefinir</button>
                    </div>

                </form>
            </div>
            {/* </div> */}
        </div>
    )
}