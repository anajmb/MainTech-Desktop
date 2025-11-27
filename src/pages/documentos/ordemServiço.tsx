// src/pages/OrdemServico.tsx
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import Relatorio, { type OrdemServico as OrdemServicoType } from "../../components/relatorio";

export default function OrdemServicoPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [ordem, setOrdem] = useState<OrdemServicoType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrdem = useCallback(async () => {
    if (!id) {
      setLoading(false);
      window.alert("Nenhum ID de ordem foi fornecido.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/serviceOrders/getUnique/${id}`);
      setOrdem(res.data);
    } catch (err: any) {
      console.error("Erro ao buscar OS:", err?.response ?? err);
      window.alert("Falha ao carregar a ordem de serviço.");
      // opcional: navigate back
      // navigate(-1);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrdem();
  }, [fetchOrdem]);

  // função passada para o Relatorio: quando algo atualizar, volta à lista (ou atualiza)
  const handleUpdate = () => {
    // navega para página anterior - a página de Documentos pode recarregar (se configurada)
    navigate(-1);
  };

  return (
    <div className="ordem-servico-page">
      <header className="ordem-header">
        <div>
          <h1>Ordem de Serviço {ordem ? `#${ordem.id}` : ""}</h1>
          <p>{ordem?.machineName || "Detalhes da OS"}</p>
        </div>
      </header>

      <main>
        {loading ? (
          <div style={{ padding: 24 }}>Carregando ordem de serviço...</div>
        ) : !ordem ? (
          <div style={{ padding: 24 }}>Ordem de serviço não encontrada.</div>
        ) : (
          <Relatorio ordem={ordem} onUpdate={handleUpdate} />
        )}
      </main>
    </div>
  );
}
