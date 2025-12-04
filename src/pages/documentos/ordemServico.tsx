// src/pages/OrdemServico.tsx
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import Relatorio, { type OrdemServico as OrdemServicoType } from "../../components/relatorio";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function OrdemServicoPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [ordem, setOrdem] = useState<OrdemServicoType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrdem = useCallback(async () => {
    if (!id) {
      setLoading(false);
      toast.error("Nenhum ID de ordem foi fornecido.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/serviceOrders/getUnique/${id}`);
      setOrdem(res.data);
    } catch (err: any) {
      console.error("Erro ao buscar OS:", err?.response ?? err);
      toast.error("Falha ao carregar a ordem de serviço.");
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
    <div className="containerGeral">
      <Sidebar />
      <div className="containerPage">
        <Header />
        <div style={{ display: "flex", flexDirection: 'column', }}>
          <h2 className="tituloPage">Ordem de Serviço {ordem ? `${ordem.id}` : ""} - {ordem?.machineName || "Detalhes da OS"}</h2>
        </div>

        <main style={{ marginTop: '3em' }}>
          {loading ? (
            <div style={{ padding: 24 }}>Carregando ordem de serviço...</div>
          ) : !ordem ? (
            <div style={{ padding: 24 }}>Ordem de serviço não encontrada.</div>
          ) : (
            <Relatorio ordem={ordem} onUpdate={handleUpdate} />
          )}
        </main>

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
    </div>
  );
}
