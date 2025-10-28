import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'

// vai ter essa página mesmo? pela questão de segurança não deveria pegar do cadastro?

export default function RecuperarEmail() {

    return (
        <div className='containerLogin'>

            <div className="cardLogin">

                <div className='logoClasseLogin'>
                    <img src={img} alt="Logo MainTech" className='imgLogo' />
                </div>

                <form action="" className='formLogin'>
                    <h1 className='tituloLogin'>Recuperar Senha</h1>

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <p className='tituloPequenoCard' style={{ color: '#8E8E8E', fontWeight: 400, marginBottom: '0.6em', width: '20em' }}>Insira o e-mail cadastrado e um código de verificação será enviado.</p>
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="email" className='labelLogin'>E-mail</label>
                        <input type="email" name='email' id='email' maxLength={11} placeholder="Ex: ana@gmail.com" className='inputAdd inputAuth' />
                    </div>

                    <div className='botaoLoginClasse'>

                        <button type="submit" className='botaoLogin' style={{ marginTop: '1em' }}>Entrar</button>
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