import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BellRing, ShieldCheck, SquarePen } from "lucide-react";

import CardBranco from "../../components/cardBranco";
import Card from "../../components/card";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

import RandomColor from "../../hooks/randomColor";
import { api } from "../../lib/axios";
import { useAuth } from "../../../src/contexts/authContext";

import '../../styles/configuracoes.css';
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Configuracoes() {
  // ------------------------- CONTEXT & STATE -------------------------
  const { user, updateUser } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foto, setFoto] = useState("");
  const [userTeam, setUserTeam] = useState<any>(null);


  const cor = RandomColor();
  // ------------------------- LOAD USER DATA -------------------------
  // Carrega dados iniciais do usuário logado

  async function loadMyTeam() {
    try {
      const res = await api.get(`/team/getByUser/${user?.id}`);
      setUserTeam(res.data);
    } catch (err) {
      console.log("Erro ao buscar equipe do usuário:", err);
    }
  }

  useEffect(() => {
    if (!user?.id) return;

    async function loadAllData() {
      try {
        const userRes = await api.get(`/employees/getUnique/${user.id}`);
        const fullUser = userRes.data;

        setNome(fullUser.name || "");
        setEmail(fullUser.email || "");
        setTelefone(fullUser.phone || "");
        setCpf(fullUser.cpf || "");
        setDataNascimento(fullUser.birthDate ? new Date(fullUser.birthDate).toLocaleDateString("pt-BR") : "");
        setFoto(fullUser.photo || "");

        await updateUser(fullUser);
        console.log("✅ User atualizado no context:", fullUser);

        const teamRes = await api.get(`/team/getByUser/${user.id}`);
        setUserTeam(teamRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    loadAllData();
  }, [user?.id]); // ✅ Remova updateUser daqui

  // ------------------------- HANDLERS -------------------------

  const handleToggleNotifications = async () => {
    // alterna o estado local
    setNotificationsEnabled((prev) => {
      const next = !prev;

      // salva preferência no localStorage (persistência)
      localStorage.setItem("notificationsEnabled", next ? "true" : "false");

      // dispara um evento custom para notificar outros componentes na mesma aba
      // (o NotificacaoWeb escuta 'notificationsChanged')
      window.dispatchEvent(new Event("notificationsChanged"));

      return next;
    });
  };

  async function salvarInfos() {
    try {
      await api.put(`/employees/update/${user?.id}`, {
        name: nome,
        email,
        phone: telefone,
      });

      // Atualiza no AuthContext
      await updateUser({ name: nome, email, phone: telefone });

      toast.success("Informações atualizadas!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao salvar");
    }
  }

  // ------------------------- RENDER -------------------------
  return (
    <div className="containerGeral">
      <Sidebar />

      <div className="containerPage">
        <Header />

        <h2 className="tituloPage">Configurações</h2>

        <div className="containerCards" style={{ flexDirection: 'row' }}>

          {/* --------- CARD LATERAL: Conta / Preferências ---------- */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '2em', flex: 1 }}>
            <div className="containerConta">
              <CardBranco>
                <div style={{ padding: '1em' }}>
                  {/* Conta */}
                  <h3 className="tituloCard">Conta</h3>
                  <Link to={'./privacidade'} style={{ textDecoration: 'none', color: '#000' }}>
                    <Card>
                      <div className="opcaoConta">
                        <ShieldCheck color="#51C385" size={22} strokeWidth={1.5} />
                        <div>
                          <h3 className="tituloConta">Privacidade e Segurança</h3>
                          <h3 className="subtituloConta">Gerenciar senha</h3>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  {/* Preferência */}
                  <h3 className="tituloCard" style={{ marginTop: '1em' }}>Preferência</h3>
                  <Card>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="opcaoConta">
                        <BellRing color="#D10B03" size={22} strokeWidth={1.5} />
                        <div>
                          <h3 className="tituloConta">Notificações</h3>
                          <h3 className="subtituloConta">Controla alertas e avisos</h3>
                        </div>
                      </div>

                      <label className="switch">
                        <input type="checkbox" checked={notificationsEnabled} onChange={handleToggleNotifications} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </Card>
                </div>
              </CardBranco>
            </div>

            {/* --------- PERFIL + INPUTS ---------- */}
            <CardBranco>
              <div className="cardPage">
                <h3 className="tituloCard">Minhas informações</h3>

                <div style={{ padding: '0px 40px', flex: 1 }}>
                  {/* Header do Perfil */}
                  <div className="headerInfo">
                    <div style={{ position: 'relative' }}>
                      {foto ? (
                        <img src={foto} alt="Foto de perfil" className="fotoPerfil" />
                      ) : (
                        <img src="/default-user.png" alt="Foto de perfil" className="fotoPerfil" />
                      )}
                    </div>

                    <div>
                      <h3 className="nomeUser">{nome}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "2em", paddingTop: "0.7em" }}>
                        <p className="equipePerfil">
                          {userTeam?.name || "Sem equipe atribuída"}
                        </p>
                        <div style={{ backgroundColor: cor, padding: "0.3em 1.5em", borderRadius: "25px" }}>
                          <h3 className="cargoMembro">Administrador</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inputs do Perfil */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="grupoInputIcon">
                      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="inputIcon" placeholder="Nome completo" />
                      <SquarePen size={20} className="iconDoInput" />
                    </div>

                    <div className="grupoInputIcon">
                      <input type="text" value={cpf} readOnly className="inputIcon" placeholder="CPF" />
                    </div>

                    <div className="grupoInputIcon">
                      <input type="text" value={dataNascimento} readOnly className="inputIcon" placeholder="Data de nascimento" />
                    </div>

                    <div className="grupoInputIcon">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="inputIcon" placeholder="E-mail" />
                      <SquarePen size={20} className="iconDoInput" />
                    </div>

                    <div className="grupoInputIcon">
                      <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="inputIcon" placeholder="Telefone" />
                      <SquarePen size={20} className="iconDoInput" />
                    </div>
                  </div>

                  {/* Botão Salvar */}
                  <div className="btnDiv">
                    <button type="submit" className="btn" onClick={salvarInfos}>
                      Salvar alterações
                    </button>
                  </div>
                </div>
              </div>
            </CardBranco>

            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
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
      </div>
    </div>
  );
}
