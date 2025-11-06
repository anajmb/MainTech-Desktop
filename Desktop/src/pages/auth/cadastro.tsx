import '../../styles/login.css'
import img from '../../assets/img/logoVermelha.png'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { api } from "../../lib/axios";
import { useNavigate } from 'react-router-dom';

// aceitar so numeros no cpf
// estilizar o focus do input

export default function Cadastro() {

    const [mostrarSenha, setMostrarSenha] = useState(false)

    const handlePassword = () => {
        setMostrarSenha(!mostrarSenha)
    }

    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<string>("");
    const [cpfData, setCpfData] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleCadastro() {
        if (!cpfData || !name || !email || !phone || !date || !password) {
            alert("Preencha todos os campos!");
            return;
        }
        setIsLoading(true);

        try {
            await api.post("/employees/completeRegister", {
                name,
                cpf: cpfData,
                email,
                phone,
                birthDate: date,
                password,
            });

            alert("Cadastro feito com sucesso!");
            navigate("/");
        } catch (error: any) {
            if (error.response?.status === 409) {
                alert(error.response.data.msg);
            } else if (error.response?.status === 404) {
                alert("Não existe um pré-cadastro para este CPF.");
            } else {
                alert("Erro ao completar cadastro.");
            }
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
                    <h1 className='tituloLogin'>Cadastro</h1>

                    <div className='classeInputLogin'>
                        <label htmlFor="nome" className='labelLogin'>Nome</label>
                        <input type="text" name='nome' id='nome' placeholder="Ex: Ana Luiza" className='inputAdd inputAuth' value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="telefone" className='labelLogin'>Telefone</label>
                        <input type="tel" name='telefone' id='telefone' placeholder="() _____ - ____" className='inputAdd inputAuth' value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                        <div className='classeInputLogin'>
                            <label htmlFor="cpf" className='labelLogin'>Data de Nascimento</label>
                            <input type="date" name='cpf' id='cpf' placeholder="___ . ___ . ___ - __" className='inputAdd inputAuth' style={{ width: '15em', color: '#969696' }}
                                value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div className='classeInputLogin'>
                            <label htmlFor="cpf" className='labelLogin'>CPF</label>
                            <input type="text" name='cpf' id='cpf' placeholder="___ . ___ . ___ - __" className='inputAdd inputAuth' style={{ width: '15em' }} 
                            value={cpfData} onChange={(e) => setCpfData(e.target.value)}/>
                        </div>
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="cpf" className='labelLogin'>E-mail</label>
                        <input type="text" name='cpf' id='cpf' placeholder="Ex: ana@gmail.com" className='inputAdd inputAuth' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className='classeInputLogin'>
                        <label htmlFor="senha" className='labelLogin'>Senha</label>

                        <div style={{ position: 'relative' }}>

                            <input type={mostrarSenha ? 'text' : 'password'} name="senha" id="senha" placeholder='********' className='inputAdd inputAuth' style={{ width: '100%' }}
                            value={password} onChange={(e) => setPassword(e.target.value)} />

                            <div onClick={handlePassword}>
                                {mostrarSenha ? <Eye size={18} className='eyeIcon' /> : <EyeOff size={18} className='eyeIcon' />}
                            </div>
                        </div>
                    </div>

                    <div className='botaoLoginClasse'>
                        <button type="submit" className='botaoLogin' onClick={handleCadastro} disabled={isLoading}>Cadastrar</button>
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