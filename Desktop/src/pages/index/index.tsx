import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

// aceitar so numeros no cpf
// estilizar o focus do input

export default function Login() {

    const [mostrarSenha, setMostrarSenha] = useState(false)

    const handlePassword = () => {
        setMostrarSenha(!mostrarSenha)
    }

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
                        <input type="text" name='cpf' id='cpf' maxLength={11}  placeholder="___ . ___ . ___ - __" className='inputAdd inputAuth' />
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Senha</label>

                        <div style={{ position: 'relative' }}>

                            <input type={mostrarSenha ? 'text' : 'password'} name="senha" id="senha" placeholder='********' className='inputAdd inputAuth' style={{ width: '100%' }} />

                            <div onClick={handlePassword}>
                                {mostrarSenha ? <Eye size={18} className='eyeIcon'/> : <EyeOff size={18} className='eyeIcon' />}
                            </div>
                        </div>
                    </div>

                    <div className='conectadoGeral'>
                        <input type="checkbox" name="conectado" id="conectado" style={{cursor: 'pointer'}}/>
                        <p id='conectado' className='conectadoTexto'>Mantenha-me conectado</p>
                    </div>

                    <div className='botaoLoginClasse'>

                        <button type="submit" className='botaoLogin'>Entrar</button>
                    </div>

                    <div className='linksLogin'>
                        <p>Seu primeiro acesso? <a href="/cadastro" className='aLogin'>Cadastre-se</a></p>
                        <a href="/recuperarSenha" className='aLogin'>Esqueci minha senha</a>
                    </div>


                </form>
            </div>
            {/* </div> */}
        </div>
    )
}