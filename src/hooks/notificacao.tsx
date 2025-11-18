import { Bell, BellDot, BellRing, X } from "lucide-react";
import { useState } from "react";

// add horário da notificação

export default function Notificacao() {

    const [notify, setNotify] = useState(false)

    const handleToggle = () => {
        setNotify(!notify)
    }

    return (
        <div >
            {/* <div onClick={handleToggle} >
                {notify ? <Bell color="#A50702" fill="#A50702" /> : <BellRing color="#A50702" fill="#A50702"/> }
                
            </div> */}

            <div onClick={handleToggle}>
                <Bell color="#A50702" fill="#A50702" />
            </div>

            {notify && (
                <div style={{ position: 'absolute', backgroundColor: '#f5f5f5', borderRadius: '10px', right: '4em', padding: '10px 20px', cursor: 'default', width: '18em' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', }}>
                        <h3 style={{ color: '#C21C1C', fontSize: '0.95em', fontWeight: 500, textAlign: 'center' }}>Notificações</h3>
                        {/* <X size={20} strokeWidth={1.5} style={{ cursor: 'pointer' }} /> */}
                    </div>

                    <div style={{ marginTop: '0.7em' }}>

                        <div>
                            <h4 style={{ fontSize: '0.8em', fontWeight: 600, margin: 0, marginBottom: '0.7em' }}>Análise de O.S.</h4>
                            <p style={{ fontSize: '0.8em', fontWeight: 500, margin: 0 }}>Uma nova O.S. precisa ser analisada</p>
                        </div>
                        <hr />
                    </div>

                </div>
            )}
        </div>
    )
}