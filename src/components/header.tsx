import { User } from "lucide-react";
import '../styles/sidebar.css'
import Notificacao from "../hooks/notificacao";
import { useAuth } from "../contexts/authContext";

export default function Header() {

    const { user } = useAuth();

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
                        {user?.photo ? (
                            <img
                                src={user.photo}
                                alt="Foto de perfil"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                            />
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                                <User color="#fff" strokeWidth={1.5} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <hr color="#C5C5C5" style={{ width: '100%' }} />
        </>
    );
}
