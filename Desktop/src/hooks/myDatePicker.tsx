import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "../styles/myDatePicker.css";
import { ptBR } from 'date-fns/locale';

export default function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      locale={ptBR}
      className="my-daypicker"
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Escolha uma data."
      }
    />
  );
}