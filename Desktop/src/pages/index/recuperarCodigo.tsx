import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'

// colocar função para que os campos só recebam número ou vai ter letras no código também?
// deixar o tamanho do numero no input maior

export default function RecuperarCodigo() {

    return (
        <div className='containerLogin'>

            <div className="cardLogin">

                <div className='logoClasseLogin'>
                    <img src={img} alt="Logo MainTech" className='imgLogo' />
                </div>

                <form action="" className='formLogin'>
                    <h1 className='tituloLogin'>Recuperar Senha</h1>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p className='tituloPequenoCard' style={{ color: '#8E8E8E', fontWeight: 400, marginBottom: '0.6em', width: '20em' }}>Digite o código de verificação enviado para o seu e-mail.</p>
                    </div>

                    <div className='classeInputCodigo'>
                        <input type="text" name='codigo' id='codigo' maxLength={1} className='inputAdd inputAuth inputCodigo' />
                        <input type="text" name='codigo' id='codigo' maxLength={1} className='inputAdd inputAuth inputCodigo' />
                        <input type="text" name='codigo' id='codigo' maxLength={1} className='inputAdd inputAuth inputCodigo' />
                        <input type="text" name='codigo' id='codigo' maxLength={1} className='inputAdd inputAuth inputCodigo' />
                    </div>

                    <div className='botaoLoginClasse'>

                        <button type="submit" className='botaoLogin' style={{ marginTop: '1em', marginBottom: '2em' }}>Entrar</button>
                    </div>

                </form>
            </div>
            {/* </div> */}
        </div>
    )
}