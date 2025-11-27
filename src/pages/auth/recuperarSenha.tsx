import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../../lib/axios";
import { toast } from 'react-toastify';

// testar para ver se está enviando o email

export default function RecuperarEmail() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function handleSendCode() {
        try {
            if (!email) {
                toast.warning("Digite seu e-mail!");
                return;
            }

            await api.post("/auth/send-code", { email });
            toast.success("Código enviado para seu e-mail!");
            navigate("/recuperar-senha/codigo", { state: { email } });
        } catch (error) {
            console.error(error);
            toast.error("Não foi possível enviar o código. Tente novamente.");
        }
    }

    return (
        <div className='containerLogin'>

            <div className="cardLogin">

                <div className='logoClasseLogin'>
                    <img src={img} alt="Logo MainTech" className='imgLogo' />
                </div>

                <form action="" className='formLogin'>
                    <h1 className='tituloLogin'>Recuperar Senha</h1>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p className='tituloPequenoCard' style={{ color: '#8E8E8E', fontWeight: 400, marginBottom: '0.6em', width: '20em' }}>Insira o e-mail cadastrado e um código de verificação será enviado.</p>
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="email" className='labelLogin'>E-mail</label>
                        <input type="email" name='email' id='email' placeholder="Ex: ana@gmail.com" className='inputAdd inputAuth' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='botaoLoginClasse'>

                        <button type="submit" className='botaoLogin' style={{ marginTop: '1em' }} onClick={handleSendCode}>Entrar</button>
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