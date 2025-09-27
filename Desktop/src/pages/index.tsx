import '../styles/login.css'

export default function Login() {
    return (
        <>
            {/* <main className="flex-1 bg-gray-100"> */}
            <div className="containerLogin">
                <div className="cardLogin">
                    {/* foto logo */}

                    <form action="">
                        <h1 className='titulo'>Login</h1>

                        <div>

                            <div>
                                <div>
                                    <label htmlFor="cpf">CPF</label>
                                    <input type="text" name='cpf' id='cpf' maxLength={11} />
                                </div>

                                <div>
                                    <label htmlFor="senha">Senha</label>
                                    <input type="password" name="senha" id="senha" />
                                </div>
                            </div>

                            <div>
                                <input type="checkbox" name="conectado" id="conectado" />
                                <p id='conectado'>Mantenha-me conectado</p>
                            </div>

                            <button type="submit">Entrar</button>

                            <div>
                                <a href="#">Esqueci minha senha</a>
                                <p>Seu primeiro acesso?<a href="#">Cadastre-se</a></p>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            {/* </main> */}
        </>
    )
}