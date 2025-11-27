import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/axios";

export default function TresPontinhos({
    memberId,
    teamId,
    onRemoved,
    onUpdateTeams
}: {
    memberId: number;
    teamId?: number; 
    onRemoved?: () => void;
    onUpdateTeams?: () => void;
}) {

    const [open, setOpen] = useState(false);

    async function removeMember() {
        try {

            if (teamId !== undefined) {
                // ----------- remover de equipe -----------
                await api.delete(`/teamMember/delete/${memberId}`, {
                    data: {
                        teamId,
                        personId: memberId
                    }
                });

            } else {
                // ----------- remover employee -----------
                await api.delete(`/employees/delete/${memberId}`);
            }

            onRemoved?.();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div onClick={() => setOpen(!open)}>
                <EllipsisVertical size={19} className="tresPontinhos" />
            </div>

            {open && (
                <div className="menuTresPontinhos">
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
