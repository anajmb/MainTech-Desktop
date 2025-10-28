import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

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

    return (
        <div className='containerLogin'>

            <div className="cardLogin">

                <div className='logoClasseLogin'>
                    <img src={img} alt="Logo MainTech" className='imgLogo' />
                </div>

                <form action="" className='formLogin'>
                    <h1 className='tituloLogin'>Recuperar Senha</h1>

                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Nova senha</label>

                        <div style={{ position: 'relative' }}>

                            <input type={mostrarSenha ? 'text' : 'password'} name="senha" id="senha" placeholder='********' className='inputAdd inputAuth' style={{ width: '100%' }} />

                            <div onClick={handlePassword}>
                                {mostrarSenha ? <Eye size={18} className='eyeIcon' /> : <EyeOff size={18} className='eyeIcon' />}
                            </div>
                        </div>
                    </div>
                    
                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Confirmar senha</label>

                        <div style={{ position: 'relative' }}>

                            <input type={confirmarSenha ? 'text' : 'password'} name="senha" id="senha" placeholder='********' className='inputAdd inputAuth' style={{ width: '100%' }} />

                            <div onClick={handleConfirmarPassword}>
                                {confirmarSenha ? <Eye size={18} className='eyeIcon' /> : <EyeOff size={18} className='eyeIcon' />}
                            </div>
                        </div>
                    </div>

                    <div className='botaoLoginClasse'>
                        <button type="submit" className='botaoLogin' style={{ marginTop: '1em', marginBottom: '2em' }}>Redefinir</button>
                    </div>

                </form>
            </div>
            {/* </div> */}
        </div>
    )
}