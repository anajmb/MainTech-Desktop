import '../styles/sidebar.css'

export default function Sidebar() {
    return (
        <>
            <div className='containerSidebar'>
                {/* foto icone */}

                <div>
                    <ul>
                        {/* icone */}
                        <h3>Home</h3>
                    </ul>

                    <ul>
                        {/* icone */}
                        <h3>Tarefas</h3>
                    </ul>

                    <ul>
                        {/* icone */}
                        <h3>Documentos</h3>
                    </ul>

                    <ul>
                        {/* icone */}
                        <h3>Equipes</h3>
                    </ul>

                    <ul>
                        {/* icone */}
                        <h3>Dashboard</h3>
                    </ul>

                    <ul>
                        {/* icone */}
                        <h3>Configurações</h3>
                    </ul>
                </div>

                <div>
                    <ul>
                        <h3>Sair da Conta</h3>
                    </ul>
                </div>
            </div>
        </>
    )
}