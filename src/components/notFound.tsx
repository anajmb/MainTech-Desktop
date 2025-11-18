import '../styles/notFound.css'

function NotFound() {
    return (
        <div className='containerLogin'>

            <div className='cardLogin'>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.8em' }}>
                    <div className="engrenagem"></div>

                    <div>
                        <h1 className='tituloNotFound'>404 - Página Não Encontrada</h1>
                        <p className='descricaoNotFound'>A página que você está procurando não existe.</p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default NotFound;
