import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { api } from '../../lib/axios';
import { toast } from 'react-toastify';

export default function RecuperarCodigo() {

    const location = useLocation();
    const navigate = useNavigate();
    const email = new URLSearchParams(location.search).get("email") || "";
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const [value, setValue] = useState("");
    const CELL_COUNT = 4;
    const [erroMsg, setErroMsg] = useState("");

    const handleVerifyCode = async () => {

        if (value.length < CELL_COUNT) {
            toast.warning("Digite o código completo!");
            return;
        }

        try {
            console.log("🔍 Enviando para o backend:", {
                email,
                code: value
            });
            const res = await api.post("/auth/verify-code", { email, code: value });

            if (res.data.valid) {
                toast.success("Código verificado!");
                navigate(`/recuperar-senha/codigo/redefinir-senha?email=${encodeURIComponent(email)}`);
                setErroMsg("");
            } else {
                setErroMsg("Código incorreto.");
            }

        } catch (err: any) {
            console.log("Backend disse:", err.response?.data);
            toast.error(err.response?.data?.error || "Erro ao verificar o código.");
        }
    };

    const handleChange = (index: number, newValue: string) => {
        const sanitized = newValue.replace(/\D/g, '').slice(0, 1);
        
        const codeArray = value.split("");
        codeArray[index] = sanitized;
        const finalCode = codeArray.join("").slice(0, CELL_COUNT);
        
        setValue(finalCode);
        
        if (sanitized && index < CELL_COUNT - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (value[index]) {
                const codeArray = value.split("");
                codeArray[index] = "";
                setValue(codeArray.join(""));
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
                const codeArray = value.split("");
                codeArray[index - 1] = "";
                setValue(codeArray.join(""));
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < CELL_COUNT - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    return (
        <div className='containerLogin'>
            <div className="cardLogin">

                <div className='logoClasseLogin'>
                    <img src={img} alt="Logo MainTech" className='imgLogo' />
                </div>

                <form className='formLogin' onSubmit={(e) => { e.preventDefault(); handleVerifyCode(); }}>
                    <h1 className='tituloLogin'>Recuperar Senha</h1>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p className='tituloPequenoCard'
                            style={{ color: '#8E8E8E', fontWeight: 400, marginBottom: '0.6em', width: '20em' }}>
                            Digite o código de verificação enviado para o seu e-mail.
                        </p>
                    </div>

                    <div style={{ gap: '0.8rem', justifyContent: 'center', display: 'flex', marginBottom: '1rem' }}>
                        {[...Array(CELL_COUNT)].map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputsRef.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={value[index] || ""}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                autoComplete="one-time-code"
                                style={{
                                    width: '3.5rem',
                                    height: '3.5rem',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    border: '1px solid "#A50702",',
                                    borderRadius: '0.5rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxShadow: 'inset 0 0 0 0.5px #DC143C',
                                    backgroundColor: '#fefefeff'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(199, 11, 49, 0.39), inset 0 0 0 1px #DC143C';
                                    e.currentTarget.style.borderColor = '#DC143C';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.boxShadow = 'inset 0 0 0 0.2px #37050fff';
                                }}
                            />
                        ))}
                    </div>

                    {erroMsg && (
                        <div style={{ color: '#DC143C', marginTop: '1rem', textAlign: 'center', marginBottom: '1rem' }}>
                            {erroMsg}
                        </div>
                    )}

                    <div className='botaoLoginClasse'>
                        <button
                            type="submit"
                            className='botaoLogin'
                            style={{ marginTop: '1em', marginBottom: '2em' }}
                        >
                            Verificar Código
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}