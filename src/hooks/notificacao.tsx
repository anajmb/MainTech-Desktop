import { useEffect, useState, useRef } from "react";
import { Bell, TriangleAlert } from "lucide-react";
import { api } from "../lib/axios";

interface NotificationData {
  id: string;
  title: string;
  expirationDate: string;
}

export default function NotificacaoWeb() {
  const [open, setOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return localStorage.getItem("notificationsEnabled") === "false" ? false : true;
  });

  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks/get/expiring-soon");

      const formatted: NotificationData[] = (res.data || []).map((task: any) => ({
        id: task.id,
        title: task.title || "Sem título",
        expirationDate: task.expirationDate || null,
      }));

      setNotifications(formatted);
    } catch (err) {
      console.error("Erro ao carregar notificações:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && notificationsEnabled) loadNotifications();
  }, [open, notificationsEnabled]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "notificationsEnabled") {
        setNotificationsEnabled(e.newValue === "true");
        if (e.newValue === "false") setOpen(false);
      }
    };

    const onCustom = () => {
      setNotificationsEnabled(localStorage.getItem("notificationsEnabled") === "true");
      if (localStorage.getItem("notificationsEnabled") === "false") setOpen(false);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("notificationsChanged", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("notificationsChanged", onCustom);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      const target = ev.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const bellColor = "#A50702";

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          if (!notificationsEnabled) return;
          setOpen((s) => !s);
        }}
        style={{ cursor: notificationsEnabled ? "pointer" : "default" }}
      >
        <Bell color={bellColor} />
      </div>

      {open && notificationsEnabled && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            right: "4em",
            padding: "10px 20px",
            width: "18em",
            zIndex: 1000,
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          }}
        >
          <h3
            style={{
              color: "#C21C1C",
              fontSize: "0.95em",
              fontWeight: 500,
              // textAlign: "center",
              marginBottom: 20,
            }}
          >
            Notificações
          </h3>

          {loading ? (
            <p style={{ fontSize: "0.8em" }}>Carregando...</p>
          ) : notifications.length === 0 ? (
            <p style={{ fontSize: "0.8em" }}>Nenhuma notificação no momento.</p>
          ) : (
            notifications.map((item) => (
              <div key={item.id}>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12
                  }}
                >
                  <TriangleAlert
                    style={{
                      color: "#fff",
                      marginRight: 12,
                      backgroundColor: "#D5692F",
                      padding: 8,
                      borderRadius: 40,
                      marginBottom: 0
                    }}
                  />
                  <div className="notItem" style={{ flex: 1 }}>
                    <h4 style={{ fontSize: "0.9em", fontWeight: 600, margin: "0 0 4px 0" }}>
                      Tarefa quase expirando
                    </h4>
                    <p style={{ fontSize: "0.85em", margin: 0, color: "#333" }}>
                      A tarefa <b>{item.title}</b> expira em{" "}
                      {item.expirationDate
                        ? new Date(item.expirationDate).toLocaleDateString("pt-BR")
                        : "data desconhecida"}
                    </p>
                  </div>
                </div>
                <hr
                  style={{
                    margin: "10px -20px 10px -20px",
                    width: "calc(100% + 40px)",
                    borderColor: "#ddd",
                    borderStyle: "solid",
                    opacity: 0.9
                  }}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
