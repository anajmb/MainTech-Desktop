import { Bell, PanelLeft, User } from "lucide-react";
import '../styles/sidebar.css'

export default function Header() {

    return (
        <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer' }}>
                        <PanelLeft color="#A50702" />
                    </div>

                    <div style={{ display: 'flex', gap: '2.5em', alignItems: 'center'}}>
                        <div style={{ cursor: 'pointer' }}>
                            <Bell color="#A50702" fill="#A50702" />
                        </div>

                        <div className="userIconHeader" style={{cursor: 'default'}}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                                <User color="#fff" strokeWidth={1.5}/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr color="#C5C5C5" style={{ width: '100%' }} />
        </>
    )
}