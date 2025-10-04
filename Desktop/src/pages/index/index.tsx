import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { EyeOff } from 'lucide-react'

// add icone do olho
// aceitar so numeros no cpf

export default function Login() {
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
                        <input type="text" name='cpf' id='cpf' maxLength={11} className='inputLogin' />
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Senha</label>

                        <div>
                            <input type="password" name="senha" id="senha" className='inputLogin' />
                            {/* <EyeOff size={18} className='eyeIcon'/> */}
                        </div>
                    </div>

                    <div className='conectadoGeral'>
                        <input type="checkbox" name="conectado" id="conectado" />
                        <p id='conectado' className='conectadoTexto'>Mantenha-me conectado</p>
                    </div>

                    <div className='botaoLoginClasse'>

                        <button type="submit" className='botaoLogin'>Entrar</button>
                    </div>

                    <div className='linksLogin'>
                        <a href="#" className='aLogin'>Esqueci minha senha</a>
                        <p>Seu primeiro acesso? <a href="#" className='aLogin'>Cadastre-se</a></p>
                    </div>


                </form>
            </div>
            {/* </div> */}
        </div>
    )
}