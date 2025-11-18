import { useState } from "react"
import TresPontinhos from "./tresPontinhos"
import RandomColor from "./randomColor"
import CardBranco from "../components/cardBranco"

// o card vai ficar dessa cor?

export default function VerMais() {

    const [verMais, setVerMais] = useState(false)
    const cor = RandomColor()

    const handleToggle = () => {
        setVerMais(!verMais)
    }

    return (
        <div style={{marginTop: '2em'}}>

            {verMais && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', overflowY: 'auto', maxHeight: '30em', margin: '0.8em' }}>
                    <CardBranco>
                        <div>
                            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                                <h3 className="nomeMembro" style={{ fontSize: '0.8em' }}>João Silva</h3>
                                <TresPontinhos />
                            </div>

                            <p className="emailMembro" style={{ fontSize: '0.7em', }}>joaosilva@empresa.com</p>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5em' }}>
                                <div style={{ backgroundColor: cor, padding: '0.2em 1.3em', borderRadius: '25px', width: "4em", }}>
                                    <h3 className="cargoMembro">Líder tecnico</h3>
                                </div>
                            </div>
                            
                        </div>
                    </CardBranco>

                </div>
            )}

            <div onClick={handleToggle} style={{ fontWeight: '500', color: '#D40303', margin: 0, cursor: 'pointer', fontSize: '0.8em', textAlign: 'end' }}>
                {verMais ? 'Ver Menos' : 'Ver Mais'}
            </div>
        </div>
    )
}