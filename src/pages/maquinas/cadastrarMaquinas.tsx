import { useEffect, useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import CardBranco from "../../components/cardBranco";
import Card from "../../components/card";
import RandomColor from "../../hooks/randomColor";
import { api } from "../../lib/axios";
import "../../styles/tarefas.css";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface Machine {
  id: number;
  name: string;
  description: string;
  location: string;
}

interface SetFromAPI {
  id: number;
  name: string;
}

export default function CadastrarMaquinas() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [sets, setSets] = useState<{ label: string; value: string }[]>([]);
  const [selectedSets, setSelectedSets] = useState<string[]>([]);
  const [oficinas] = useState([
    "Oficina de Manutenção",
    "Oficina de Usinagem",
    "Oficina de Soldagem",
    "Oficina Elétrica",
    "Oficina Mecânica",
    "Oficina Automotiva",
  ]);
  const [oficinaSelecionada, setOficinaSelecionada] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroMsg, setErroMsg] = useState("");
  const cor = RandomColor();

  // 🔹 Estado para EDIÇÃO
  const [editingId, setEditingId] = useState<number | null>(null);

  // 🔹 Buscar máquinas e conjuntos
  useEffect(() => {
    async function fetchData() {
      try {
        const [machinesRes, setsRes] = await Promise.all([
          api.get("/machines/get"),
          api.get("/sets/get"),
        ]);

        setMachines(machinesRes.data);

        setSets(
          setsRes.data.map((s: SetFromAPI) => ({
            label: s.name,
            value: s.id.toString(),
          }))
        );
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }
    fetchData();
  }, []);

  // 🔹 CADASTRAR
  async function handleCadastro() {
    if (!nome || !descricao || !oficinaSelecionada || selectedSets.length === 0) {
      setErroMsg("Preencha todos os campos!");
      return;
    }

    const payload = {
      name: nome,
      description: descricao,
      location: oficinaSelecionada,
      sets: selectedSets.map(Number),
    };

    try {
      setLoading(true);
      await api.post("/machines/create", payload);

      toast.success("Máquina cadastrada com sucesso!");

      setNome("");
      setDescricao("");
      setOficinaSelecionada("");
      setSelectedSets([]);

      const response = await api.get("/machines/get");
      setMachines(response.data);
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      toast.error("Erro ao cadastrar máquina!");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 EXCLUIR
  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente deletar esta máquina?")) return;

    try {
      await api.delete(`/machines/delete/${id}`);
      toast.success("Máquina deletada!");
      setMachines((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
      toast.error("Erro ao deletar máquina!");
    }
  }

  // 🔹 EDITAR → Preenche os campos
  function handleEdit(machine: Machine) {
    setEditingId(machine.id);
    setNome(machine.name);
    setDescricao(machine.description);
    setOficinaSelecionada(machine.location);
  }

  // 🔹 SALVAR EDIÇÃO
  async function handleSalvarEdicao() {
    if (!editingId) return;

    const payload = {
      name: nome,
      description: descricao,
      location: oficinaSelecionada,
      sets: selectedSets.map(Number),
    };

    try {
      setLoading(true);
      await api.put(`/machines/update/${editingId}`, payload);

      toast.success("Máquina atualizada!");

      const response = await api.get("/machines/get");
      setMachines(response.data);

      // Reset
      setEditingId(null);
      setNome("");
      setDescricao("");
      setOficinaSelecionada("");
      setSelectedSets([]);
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      toast.error("Erro ao atualizar máquina!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="containerGeral">
      <Sidebar />
      <div className="containerPage">
        <Header />
        <h2 className="tituloPage">Cadastrar Máquinas</h2>

        <div className="containerCards">
          {/* --- FORMULÁRIO --- */}
          <CardBranco>
            <div className="cardPage">
              <h3 className="tituloPequenoCard">
                {editingId ? "Editar Máquina" : "Informe os dados para o cadastro"}
              </h3>

              <div style={{ padding: "0 40px", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div className="grupoInputLabel">
                    <label className="labelAddMembro">Nome da máquina</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite o nome da máquina"
                      className="inputAdd"
                    />
                  </div>

                  <div className="grupoInputLabel">
                    <label className="labelAddMembro">Descrição da máquina</label>
                    <input
                      type="text"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Digite a descrição"
                      className="inputAdd"
                    />
                  </div>

                  <div className="grupoInputLabel">
                    <label className="labelAddMembro">Oficina</label>
                    <div className="inputSelectDiv">
                      <select
                        className="inputSelect"
                        value={oficinaSelecionada}
                        onChange={(e) => setOficinaSelecionada(e.target.value)}
                      >
                        <option value="">Selecionar</option>
                        {oficinas.map((oficina) => (
                          <option key={oficina} value={oficina}>
                            {oficina}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grupoInputLabel">
                    <label className="labelAddMembro">Conjuntos</label>
                    <div className="inputSelectDiv">
                      <select
                        multiple
                        className="inputSelect"
                        value={selectedSets}
                        onChange={(e) =>
                          setSelectedSets(
                            Array.from(e.target.selectedOptions, (opt) => opt.value)
                          )
                        }
                      >
                        {sets.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <small style={{ color: "#6c6c6c" }}>
                        (Segure Ctrl ou Command para selecionar vários)
                      </small>
                    </div>
                  </div>

                  {erroMsg && <div className="erroMsg">{erroMsg}</div>}
                </div>

                <div className="btnDiv">
                  <button
                    type="button"
                    className="btn"
                    onClick={editingId ? handleSalvarEdicao : handleCadastro}
                    disabled={loading}
                  >
                    {loading
                      ? "Aguarde..."
                      : editingId
                      ? "Salvar Alterações"
                      : "Cadastrar Máquina"}
                  </button>
                </div>
              </div>
            </div>
          </CardBranco>

          {/* --- LISTAGEM --- */}
          <CardBranco>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1em",
              }}
            >
              <h3 className="tituloPequenoCard">Máquinas cadastradas</h3>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1em",
                  overflowY: "auto",
                  maxHeight: "22em",
                  width: "28em",
                  padding: "0.5em",
                }}
              >
                {machines.length === 0 ? (
                  <p style={{ color: "#777", textAlign: "center" }}>
                    Nenhuma máquina cadastrada.
                  </p>
                ) : (
                  machines.map((machine) => (
                    <Card key={machine.id}>
                      <div style={{ flex: 1, width: "100%" }}>
                        <div
                          style={{ display: "flex", alignItems: "center", gap: 40 }}
                        >
                          <h3 className="nomeMembro">{machine.name}</h3>

                          <div
                            style={{
                              backgroundColor: cor,
                              padding: "0.3em 1.5em",
                              borderRadius: "25px",
                            }}
                          >
                            <h3 className="cargoMembro" style={{ fontSize: "11px" }}>
                              {machine.location}
                            </h3>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 10,
                          }}
                        >
                          <p className="emailMembro">ID: {machine.id}</p>

                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              alignItems: "center",
                            }}
                          >
                            <SquarePen
                              color="#838383"
                              strokeWidth={1.5}
                              size={22}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(machine)}
                            />

                            <Trash2
                              color="#F55151"
                              strokeWidth={1.5}
                              size={22}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(machine.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
                toastStyle={{ fontSize: "0.9em" }}
              />
            </div>
          </CardBranco>
        </div>
      </div>
    </div>
  );
}
