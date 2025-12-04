// src/components/Relatorio.tsx
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import "../styles/relatorio.css";
import { Bounce, toast, ToastContainer } from "react-toastify";

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

  const [erroMsg, setErroMsg] = useState("");
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);

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
      setErroMsg("Selecione um manutentor antes de confirmar.");
      return;
    }
    const maint = manutentores.find((m) => m.id === selectedMaintainerId);
    if (!maint) {
      setErroMsg("Manutentor inválido.");
      return;
    }
    if (!window.confirm(`Atribuir a OS ${ordem.id} ao manutentor ${maint.name}?`)) return;

    setLoading(true);
    try {
      await api.patch(`/serviceOrders/assign/${ordem.id}`, {
        maintainerId: maint.id,
        maintainerName: maint.name,
      });
      toast.success("Ordem atribuída com sucesso.");
      onUpdate();
    } catch (err: any) {
      console.error("Erro atribuir:", err?.response ?? err);
      toast.error(err?.response?.data?.msg || "Erro ao atribuir ordem.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitWork() {
    if (!serviceNotes.trim() || !materialsUsed.trim()) {
      setErroMsg("Preencha 'Serviço Realizado' e 'Materiais Utilizados'.");
      return;
    }
    setLoading(true);
    try {
      await api.patch(`/serviceOrders/submit/${ordem.id}`, {
        serviceNotes,
        materialsUsed,
      });
      toast.success("Relatório enviado para aprovação.");
      onUpdate();
    } catch (err: any) {
      console.error("Erro submeter:", err?.response ?? err);
      toast.error(err?.response?.data?.msg || "Erro ao submeter relatório.");
    } finally {
      setLoading(false);
    }
  }

  async function handleApproveWork() {
    setShowConfirmApprove(true);
  }

  async function confirmApprove() {
    setLoading(true);
    try {
      await api.patch(`/serviceOrders/approve/${ordem.id}`);
      toast.success("Ordem aprovada com sucesso.");
      setShowConfirmApprove(false);
      onUpdate();
    } catch (err: any) {
      console.error("Erro aprovar:", err?.response ?? err);
      toast.error(err?.response?.data?.msg || "Erro ao aprovar OS.");
    } finally {
      setLoading(false);
    }
  }


  async function handleRefuseWork() {
    if (!window.confirm("Recusar esta ordem de serviço? Ela voltará para pendente.")) return;
    setLoading(true);
    try {
      await api.patch(`/serviceOrders/refuse/${ordem.id}`);
      toast.success("Ordem recusada e retornada para pendente.");
      onUpdate();
    } catch (err: any) {
      console.error("Erro recusar:", err?.response ?? err);
      toast.error(err?.response?.data?.msg || "Erro ao recusar OS.");
    } finally {
      setLoading(false);
    }
  }

  const formatRole = (role: string | undefined): string => {
    switch (role) {
      case "IN_REVIEW": return "Em análise";
      case "PENDING": return "Pendente";
      case "COMPLETED": return "Completo";
      case "ASSIGNED": return "Atribuído";
      case "IN_PROGRESS": return "Em andamento";
      default: return role || "Desconhecido";
    }
  };

  const isMaintainer = (ordem.maintainerId != null) && ordem.maintainerId === selectedMaintainerId;
  // const isEditableByMaintainer = ordem.status === "ASSIGNED" || ordem.status === "IN_PROGRESS";

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* <CardBranco> */}
      <div style={{ backgroundColor: '#fff', borderRadius: 5, width: '75%' }}>

        {/* --- Datas e prioridade --- */}
        <div style={{ display: 'flex', }}>

          <div className="linha">
            <div className="tituloDiv">
              <h5 className="tituloRelatorio" style={{ textAlign: 'center' }}>Data da emissão</h5>
            </div>

            <div className="dadosData">{new Date(ordem.createdAt).toLocaleDateString()}</div>
          </div>

          <div className="linha">
            <div className="tituloDiv">
              <h5 className="tituloRelatorio" style={{ textAlign: 'center' }}>Data da conclusão</h5>
            </div>

            <div className="dadosData">{ordem.status === "COMPLETED" ? new Date(ordem.updatedAt).toLocaleDateString() : "Pendente"}</div>
          </div>

          <div style={{ flex: 1 }}>
            <div className="tituloDiv">
              <h5 className="tituloRelatorio" style={{ textAlign: 'center' }}>Data da prioridade</h5>
            </div>

            <div className="dadosData">{prioridadeLabel[ordem.priority]}</div>
          </div>
        </div>

        {/* --- Equipamento e diagnóstico --- */}
        <section className="relatorio-section">
          <div className="tituloDiv">
            <h3 className="tituloRelatorio">Equipamento e Diagnóstico</h3>
          </div>

          <div style={{ display: 'flex', margin: 0, }}>

            <div className="linha">
              <h6 className="subTitulo" style={{ textAlign: 'center', margin: '1.1em 0em 0em 0em' }}>Nome:</h6>
              <h5 className="dadosData margin">{ordem.machineName}</h5>
            </div>

            <div className="linha">
              <h6 className="subTitulo" style={{ textAlign: 'center', margin: '1.1em 0em 0em 0em' }}>Identificação:</h6>
              <h6 className="dadosData margin">#{ordem.machineId}</h6>
            </div>

            <div style={{ flex: 1 }}>
              <h6 className="subTitulo" style={{ textAlign: 'center', margin: '1.1em 0em 0em 0em' }}>Solicitante:</h6>
              <div className="dadosData margin">{ordem.inspectorName}</div>
            </div>
          </div>

        </section>

        <div className="linhaCima" style={{ display: 'flex', flexDirection: 'column', gap: '0.6em' }}>
          <h6 className="subTitulo">Diagnóstico</h6>
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


        {/* --- Atribuição (apenas admin e quando PENDING) --- */}
        {ordem.status === "PENDING" && (
          <section className="linhaCima">
            <h3 className="subTitulo">Atribuir Ordem de Serviço</h3>

            <div>

              <div className="inputSelectDiv" style={{ marginTop: "1.8em" }}>
                <select className="inputSelect"
                  value={selectedMaintainerId ?? ""} onChange={(e) => setSelectedMaintainerId(Number(e.target.value))}>

                  <option value="" disabled>
                    Selecionar manutentor
                  </option>

                  {manutentores.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="btnDiv">
                <button onClick={handleAssignMaintainer} disabled={loading || !selectedMaintainerId} className="btn" >
                  {loading ? "Atribuindo..." : "Atribuir"}
                </button>
              </div>

            </div>
          </section>
        )}

        {/* --- Relatório de intervenção --- */}
        <section>

          <div className="tituloDiv">
            <h3 className="tituloRelatorio">Relatório da Intervenção</h3>
          </div>

          <div style={{ display: "flex" }}>

            <div className="linha">
              <h6 className="subTitulo" style={{ textAlign: 'center', margin: '1.1em 0em 0em 0em' }}>Manutentor:</h6>
              <div className="dadosData margin">{ordem.maintainerName || "Aguardando..."}</div>
            </div>

            <div style={{ flex: 1 }}>
              <h6 className="subTitulo" style={{ textAlign: 'center', margin: '1.1em 0em 0em 0em' }}>Status:</h6>
              <div className="dadosData margin">{formatRole(ordem.status)}</div>
            </div>

          </div>

          <div style={{}}>

            <div className="linhaCima" style={{ display: 'flex', flexDirection: 'column', gap: '0.6em' }}>
              <h6 className="subTitulo">Serviço Realizado</h6>

              <div>
                <textarea
                  className="inputAdd inputAddDescricao"
                  rows={5}
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  disabled={!isMaintainer && ordem.status !== "ASSIGNED" && ordem.status !== "IN_PROGRESS"}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="linhaCima" style={{ display: 'flex', flexDirection: 'column', gap: '0.6em' }}>
              <h6 className="subTitulo">Materiais Utilizados</h6>

              <div>
                <textarea
                  className="inputAdd inputAddDescricao"
                  rows={5}
                  value={materialsUsed}
                  onChange={(e) => setMaterialsUsed(e.target.value)}
                  disabled={!isMaintainer && ordem.status !== "ASSIGNED" && ordem.status !== "IN_PROGRESS"}
                  style={{ width: "100%" }}
                />
              </div>
              {erroMsg && (
                <div className='erroMsg'>
                  {erroMsg}
                </div>
              )}
            </div>
          </div>
        </section>


        {/* --- Botões de ação --- */}
        <div style={{ marginBottom: 20, marginRight: 50, display: "flex", gap: 50, justifyContent: "flex-end" }}>
          {/* ADMIN - atribuir mostrado antes */}
          {/* MANUTENTOR - submeter */}
          {(ordem.status === "ASSIGNED" || ordem.status === "IN_PROGRESS") && (
            <div className="btnDiv">
              <button onClick={handleSubmitWork} disabled={loading} className="btn">
                {loading ? "Enviando..." : "Submeter para aprovação"}
              </button>
            </div>
          )}

          {/* ADMIN aprovar / recusar quando em IN_REVIEW */}
          {ordem.status === "IN_REVIEW" && (
            <>
              <div className="btnDiv">
                <button className="btn" onClick={handleApproveWork} disabled={loading}>Aprovar OS</button>
              </div>
              {/* {showConfirmApprove && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      padding: "2em",
                      borderRadius: "10px",
                      width: "90%",
                      maxWidth: "380px",
                      textAlign: "center",
                    }}
                  >
                    <h3 style={{ marginBottom: "1em" }}>Aprovar Ordem de Serviço</h3>

                    <p style={{ marginBottom: "1.5em" }}>
                      Tem certeza que deseja aprovar esta OS?
                    </p>

                    <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
                      <button
                        onClick={confirmApprove}
                        className="btn"
                        disabled={loading}
                      >
                        {loading ? "Aprovando..." : "Confirmar"}
                      </button>

                      <button
                        onClick={() => setShowConfirmApprove(false)}
                        className="btnDisable"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )} */}


              <div className="btnDiv">
                <button className="btnDisable" onClick={handleRefuseWork} disabled={loading}>Recusar OS</button>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        toastStyle={{ fontSize: '0.9em' }}
      />

    </div>
  );
}
