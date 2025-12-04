import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "../styles/myDatePicker.css";
import { ptBR } from "date-fns/locale";
import { api } from "../lib/axios";
import { useAuth } from "../contexts/authContext";
import CardBranco from "../components/cardBranco";

interface TaskItem {
  id: number;
  title: string;
  status: string;
  expirationDate: string;
  inspector?: { id: number; person?: { name: string } };
}

interface ServiceOrderItem {
  id: number;
  status: string;
  createdAt: string;
  inspectorId?: number;
  inspectorName?: string;
}

type CalendarItem = TaskItem | ServiceOrderItem;

export default function MyDatePicker() {
  const { user } = useAuth();
  const [items, setItems] = useState<CalendarItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [filteredItems, setFilteredItems] = useState<CalendarItem[]>([]);
  const [marked, setMarked] = useState<Record<string, any>>({});

  // -------------------- FETCH --------------------
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      let data: CalendarItem[] = [];

      if (user?.role === "INSPECTOR") {
        const res = await api.get("/tasks/get");
        data = res.data.filter((t: TaskItem) => t.inspector?.id === user.id);

      } else if (user?.role === "MAINTAINER") {
        const res = await api.get("/serviceOrders/get");
        data = res.data.filter((os: ServiceOrderItem) => os.inspectorId === user.id);

      } else if (user?.role === "ADMIN") {
        const resTasks = await api.get("/tasks/get");
        const resOS = await api.get("/serviceOrders/get");
        data = [...resTasks.data, ...resOS.data];
      }

      // remover concluídas
      data = data.filter((item) =>
        "status" in item ? item.status !== "COMPLETED" : true
      );

      setItems(data);
      markDates(data);
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
    }
  };

  function normalize(date: Date) {
  return date.toLocaleDateString("sv-SE"); // YYYY-MM-DD no fuso certo
}

 const markDates = (data: CalendarItem[]) => {
  const marks: Record<string, any> = {};

  data.forEach((item) => {
    const dateStr =
      "expirationDate" in item ? item.expirationDate : item.createdAt;

    if (!dateStr) return;

    const date = new Date(dateStr);
    const iso = normalize(date);
    const overdue = new Date() > date;

    marks[iso] = {
      style: {
        backgroundColor: overdue ? "#f5eec3" : "#a50702",
        color: overdue ? "#000" : "#fff",
        borderRadius: "8px",
        padding: "4px"
      }
    };
  });

  setMarked(marks);
};

const handleSelect = (day?: Date) => {
  setSelectedDate(day);

  if (!day) {
    setFilteredItems([]);
    return;
  }

  const filtered = items.filter((item) => {
    const dateStr =
      "expirationDate" in item ? item.expirationDate : item.createdAt;
    return normalize(new Date(dateStr)) === normalize(day);
  });

  setFilteredItems(filtered);
};

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "2rem",
      }}
    >
      {/* CALENDÁRIO EXATAMENTE COMO ESTAVA */}
      <DayPicker
        className="my-daypicker"
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        locale={ptBR}
        modifiers={marked}
        modifiersStyles={Object.fromEntries(
          Object.entries(marked).map(([k, v]) => [k, v.style])
        )}
        
      />

      {/* EVENTOS NO LADO DIREITO */}
      <CardBranco style={{ width: "30rem" }}>
        <div style={{ marginTop: "1.5rem" }}>
          <h3>Eventos do dia</h3>

          {(!selectedDate || filteredItems.length === 0) && (
            <p style={{ color: "#777" }}>
              {selectedDate ? "Nenhum evento neste dia." : "Selecione uma data."}
            </p>
          )}

          {filteredItems.map((item) => {
            const dateStr =
              "expirationDate" in item ? item.expirationDate : item.createdAt;
            const date = new Date(dateStr);
            const day = date.getDate();
            const month = date.toLocaleString("pt-BR", { month: "long" });

            let responsible = "Não informado";
            if ("inspector" in item && item.inspector?.person?.name) {
              responsible = item.inspector.person.name;
            } else if ("inspectorName" in item) {
              responsible = item.inspectorName ?? "Não informado";
            }

            return (
              <div
                key={item.id}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  background: "#fef2f2",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    background: "#a50702",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    padding: '0.6em'
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {day}
                  </div>
                  <div style={{ fontSize: "12px" }}>{month}</div>
                </div>

                <div>
                  <h4 style={{ margin: 0, color: "#a50702" }}>
                    {"title" in item ? item.title : "Ordem de Serviço"}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85em", color: "#555" }}>
                    Responsável: {responsible}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardBranco>
    </div>
  );
}
