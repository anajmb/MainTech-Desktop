import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/axios";

export default function TresPontinhos({
    memberId,
    onRemoved,
    onUpdateTeams
}: {
    memberId: number;
    onRemoved?: () => void;
    onUpdateTeams?: () => void;
}) {

    const [open, setOpen] = useState(false);

    // ----------- remover membro (mesma lógica do mobile) -----------
    const removeMember = async () => {
        try {
            await api.delete(`/teamMember/delete/${memberId}`);
            setOpen(false);

            if (onRemoved) onRemoved();         // atualiza "Minha equipe"
            if (onUpdateTeams) onUpdateTeams(); // atualiza "Todas as equipes"

        } catch (error) {
            console.log("Erro ao remover membro:", error);
        }
    };

    return (
        <div>
            <div onClick={() => setOpen(!open)}>
                <EllipsisVertical size={19} className="tresPontinhos" />
            </div>

            {open && (
                <div className="menuTresPontinhos" >
                    <ul style={{ listStyle: "none", margin: 0, padding: 8 }}>
                        <li
                            style={{ padding: "6px 0", cursor: "pointer" }}
                            onClick={removeMember}
                        >
                            Remover membro
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
