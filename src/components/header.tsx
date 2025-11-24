import { User } from "lucide-react";
import '../styles/sidebar.css'
import Notificacao from "../hooks/notificacao";

// add o backend em notificações; ao clicar fora fechar as notificações
// puxar a foto de perfil
// está vazio, acho que pode deixar o bem-vindo aqui

export default function Header() {

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ cursor: 'pointer' }}>
                </div>

                <div style={{ display: 'flex', gap: '2.5em', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer' }}>
                        <Notificacao />
                    </div>

                    <div className="userIconHeader" style={{ cursor: 'default' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                            <User color="#fff" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </div>
            <hr color="#C5C5C5" style={{ width: '100%' }} />
        </>
    )
}