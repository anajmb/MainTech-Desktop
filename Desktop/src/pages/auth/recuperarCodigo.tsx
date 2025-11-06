import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../../lib/axios';

// colocar função para que os campos só recebam número ou vai ter letras no código também?
// deixar o tamanho do numero no input maior
// vai add a opção de reenviar o código?
// add função para quando apertar backspace voltar para o input anterior e quando digitar ir para o próximo
// Code Fild

export default function RecuperarCodigo() {

    const location = useLocation();
    const navigate = useNavigate();
    const email = new URLSearchParams(location.search).get("email") || "";

    const [value, setValue] = useState("");
    const CELL_COUNT = 4;

    const handleVerifyCode = async () => {
        if (!value.trim()) {
            alert("Digite o código de verificação!");
            return;
        }

        try {
            const res = await api.post("/auth/verify-code", { email, code: value });

            if (res.data.valid) {
                alert("Código verificado!");
                navigate(`/redefinirsenha?email=${email}`);
            } else {
                alert("Código incorreto.");
            }
        } catch (err: any) {
            console.error("Erro completo:", err);
            alert(err.response?.data?.error || err.message || "Erro ao verificar o código.");
        }
    };

    const handleChange = (index: number, newValue: string) => {
        if (!/^[0-9]*$/.test(newValue)) return;
        const newCode = value.split("");
        newCode[index] = newValue;
        setValue(newCode.join("").slice(0, CELL_COUNT));
    };

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
                        {[...Array(CELL_COUNT)].map((_, index) => (
                            <input key={index} type="text" name='codigo' id='codigo' maxLength={1} className='inputAdd inputAuth inputCodigo'
                                value={value[index] || ""} onChange={(e) => handleChange(index, e.target.value)} />
                        ))}
                    </div>

                    <div className='botaoLoginClasse'>
                        <button type="submit" className='botaoLogin' style={{ marginTop: '1em', marginBottom: '2em' }} onClick={handleVerifyCode} >Entrar</button>
                    </div>

                </form>
            </div>
            {/* </div> */}
        </div>
    )
}