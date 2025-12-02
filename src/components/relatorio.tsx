// src/components/Relatorio.tsx
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import CardBranco from "./cardBranco";
import "../styles/relatorio.css";

// ---------- Tipagem exportada para uso externo ----------
export interface PayloadItem {
  setId: number;
  setName: string;
  action: "change" | "repair";
  subsetId: number;
  subsetName: string;
  machineId: number;
}

export interface OrdemServico {
  id: number;
  machineId: number;
  machineName: string;
  location?: string;
  priority: "low" | "medium" | "high";
  payload: PayloadItem[];
  createdAt: string;
  updatedAt: string;
  inspectorId: number;
  inspectorName: string;
  maintainerId?: number | null;
  maintainerName?: string | null;
  serviceNotes?: string;
  materialsUsed?: string;
  status?: "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "IN_REVIEW" | "COMPLETED";
}


type Maintainer = { id: number; name: string; role?: string };

type RelatorioProps = {
  ordem: OrdemServico;
  onUpdate: () => void; // chamada após sucesso em ações
};

export default function Relatorio({ ordem, onUpdate }: RelatorioProps) {
  const [serviceNotes, setServiceNotes] = useState(ordem.serviceNotes || "");
  const [materialsUsed, setMaterialsUsed] = useState(ordem.materialsUsed || "");
  const [loading, setLoading] = useState(false);

  const [manutentores, setManutentores] = useState<Maintainer[]>([]);
  const [selectedMaintainerId, setSelectedMaintainerId] = useState<number | null>(ordem.maintainerId ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // carrega manutentores — somente quando necessário (p.ex. se a OS estiver PENDING)
  useEffect(() => {
    async function fetchMaintainers() {
      try {
        const res = await api.get("/employees/get");
        const all: Maintainer[] = res.data;
        const filtered = all.filter((e) => e.role === "MAINTAINER");
        setManutentores(filtered);
      } catch (err) {
        console.error("Erro ao buscar manutentores:", err);
      }
    }

    if (ordem.status === "PENDING") {
      fetchMaintainers();
    }
  }, [ordem.status]);

  // Helpers
  const prioridadeLabel: Record<string, string> = {
    low: "Baixa Criticidade",
    medium: "Média Criticidade",
    high: "Alta Criticidade",
  };
  const actionLabel: Record<string, string> = {
    change: "Troca Necessária",
    repair: "Reparo Necessário",
  };

  // Ações
  async function handleAssignMaintainer() {
    if (!selectedMaintainerId) {
      window.alert("Selecione um manutentor antes de confirmar.");
      return;
    }
    const maint = manutentores.find((m) => m.id === selectedMaintainerId);
    if (!maint) {
      window.alert("Manutentor inválido.");
      return;
    }
    if (!window.confirm(`Atribuir a OS ${ordem.id} ao manutentor ${maint.name}?`)) return;

    setLoading(true);
    try {
      await api.patch(`/serviceOrders/assign/${ordem.id}`, {
        maintainerId: maint.id,
        maintainerName: maint.name,
      });
      window.alert("Ordem atribuída com sucesso.");
      onUpdate();
    } catch (err: any) {
      console.error("Erro atribuir:", err?.response ?? err);
      window.alert(err?.response?.data?.msg || "Erro ao atribuir ordem.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitWork() {
    if (!serviceNotes.trim() || !materialsUsed.trim()) {
      window.alert("Preencha 'Serviço Realizado' e 'Materiais Utilizados'.");
      return;
    }
    setLoading(true);
    try {
      await api.patch(`/serviceOrders/submit/${ordem.id}`, {
        serviceNotes,
        materialsUsed,
      });
      window.alert("Relatório enviado para aprovação.");
      onUpdate();
    } catch (err: any) {
      console.error("Erro submeter:", err?.response ?? err);
      window.alert(err?.response?.data?.msg || "Erro ao submeter relatório.");
    } finally {
      setLoading(false);
    }
  }

  async function handleApproveWork() {
    if (!window.confirm("Aprovar esta ordem de serviço?")) return;
    setLoading(true);
    try {
      await api.patch(`/serviceOrders/approve/${ordem.id}`);
      window.alert("Ordem aprovada com sucesso.");
      onUpdate();
    } catch (err: any) {
      console.error("Erro aprovar:", err?.response ?? err);
      window.alert(err?.response?.data?.msg || "Erro ao aprovar OS.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRefuseWork() {
    if (!window.confirm("Recusar esta ordem de serviço? Ela voltará para pendente.")) return;
    setLoading(true);
    try {
      await api.patch(`/serviceOrders/refuse/${ordem.id}`);
      window.alert("Ordem recusada e retornada para pendente.");
      onUpdate();
    } catch (err: any) {
      console.error("Erro recusar:", err?.response ?? err);
      window.alert(err?.response?.data?.msg || "Erro ao recusar OS.");
    } finally {
      setLoading(false);
    }
  }

  const isMaintainer = (ordem.maintainerId != null) && ordem.maintainerId === selectedMaintainerId;
  const isEditableByMaintainer = ordem.status === "ASSIGNED" || ordem.status === "IN_PROGRESS";

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 5 }}>
      {/* <CardBranco> */}
      <div>

        {/* --- Datas e prioridade --- */}
        <div style={{ display: 'flex'}}>

          <div className="linha">
            <div className="tituloDiv">
              <h5 className="tituloRelatorio">Data da emissão</h5>
            </div>

            <div>{new Date(ordem.createdAt).toLocaleDateString()}</div>
          </div>

          <div style={{flex: 1}}>
            <div className="tituloDiv">
              <h5 className="tituloRelatorio">Data da conclusão</h5>
            </div>

            <div>{ordem.status === "COMPLETED" ? new Date(ordem.updatedAt).toLocaleDateString() : "Pendente"}</div>
          </div>

          <div style={{flex: 1}}>
            <div className="tituloDiv">
              <h5 className="tituloRelatorio">Data da prioridade</h5>
            </div>

            <div>{prioridadeLabel[ordem.priority]}</div>
          </div>
        </div>

        {/* --- Equipamento e diagnóstico --- */}
        <section className="relatorio-section">
          <div className="tituloDiv">
            <h3 className="tituloRelatorio">Equipamento e Diagnóstico</h3>
          </div>

          <div>
            <strong>{ordem.machineName}</strong> <span style={{ marginLeft: 8 }}>#{ordem.machineId}</span>
          </div>

          <div style={{ marginTop: 8 }}>
            <small>Diagnóstico</small>
            {ordem.payload && ordem.payload.length > 0 ? (
              <ul>
                {ordem.payload.map((p, idx) => (
                  <li key={idx}>
                    {actionLabel[p.action]} — Conjunto: {p.setName} | Sub: {p.subsetName}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Nenhum item de inspeção registrado.</div>
            )}
          </div>

          <div style={{ marginTop: 8 }}>
            <small>Solicitante</small>
            <div>{ordem.inspectorName}</div>
          </div>
        </section>

        {/* --- Atribuição (apenas admin e quando PENDING) --- */}
        {ordem.status === "PENDING" && (
          <section className="relatorio-section">
            <h3>Atribuir Ordem de Serviço</h3>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <button onClick={() => setIsModalOpen(true)} type="button">
                  {selectedMaintainerId
                    ? manutentores.find((m) => m.id === selectedMaintainerId)?.name ?? "Selecionado"
                    : "Selecionar manutentor"}
                </button>
              </div>

              <div>
                <button onClick={handleAssignMaintainer} disabled={loading}>
                  Atribuir
                </button>
              </div>
            </div>

            {/* Modal simples */}
            {isModalOpen && (
              <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4>Manutentores</h4>
                    <button onClick={() => setIsModalOpen(false)} aria-label="Fechar">Fechar</button>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    {manutentores.length === 0 ? (
                      <div>Nenhum manutentor disponível.</div>
                    ) : (
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {manutentores.map((m) => (
                          <li key={m.id} style={{ padding: "8px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>{m.name}</span>
                            <div>
                              <button onClick={() => { setSelectedMaintainerId(m.id); setIsModalOpen(false); }}>
                                Selecionar
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* --- Relatório de intervenção --- */}
        <section className="relatorio-section">

          <div className="tituloDiv">
            <h3 className="tituloRelatorio">Relatório da Intervenção</h3>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label>Manutentor</label>
              <div>{ordem.maintainerName || "Aguardando..."}</div>
            </div>
            <div style={{ flex: 1 }}>
              <label>Status</label>
              <div>{ordem.status}</div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label>Serviço Realizado</label>
            <textarea
              rows={5}
              value={serviceNotes}
              onChange={(e) => setServiceNotes(e.target.value)}
              disabled={!isMaintainer && ordem.status !== "ASSIGNED" && ordem.status !== "IN_PROGRESS"}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label>Materiais Utilizados</label>
            <textarea
              rows={4}
              value={materialsUsed}
              onChange={(e) => setMaterialsUsed(e.target.value)}
              disabled={!isMaintainer && ordem.status !== "ASSIGNED" && ordem.status !== "IN_PROGRESS"}
              style={{ width: "100%" }}
            />
          </div>
        </section>

        {/* --- Botões de ação --- */}
        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          {/* ADMIN - atribuir mostrado antes */}
          {/* MANUTENTOR - submeter */}
          {(ordem.status === "ASSIGNED" || ordem.status === "IN_PROGRESS") && (
            <button onClick={handleSubmitWork} disabled={loading}>
              {loading ? "Enviando..." : "Submeter para aprovação"}
            </button>
          )}

          {/* ADMIN aprovar / recusar quando em IN_REVIEW */}
          {ordem.status === "IN_REVIEW" && (
            <>
              <button onClick={handleApproveWork} disabled={loading}>Aprovar OS</button>
              <button onClick={handleRefuseWork} disabled={loading}>Recusar OS</button>
            </>
          )}
        </div>
        {/* </CardBranco> */}
      </div>
    </div>
  );
}
