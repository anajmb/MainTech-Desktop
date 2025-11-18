import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

// add funções para remover e mudar membro

export default function TresPontinhos() {

    const [open, setOpen] = useState(false)

    return (
        <div>
            <div onClick={() => setOpen(!open)}>
                <EllipsisVertical size={19} className="tresPontinhos" />

            </div>

            {open && (
                <div className="menuTresPontinhos">
                    <ul>
                        <li>Remover membro</li>
                        <hr />
                        <li>Mudar de equipe</li>
                    </ul>
                </div>
            )}
        </div>
    )
}