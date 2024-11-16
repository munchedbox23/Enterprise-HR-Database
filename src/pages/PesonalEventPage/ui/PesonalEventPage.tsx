import { Table } from "@/widgets/Table";
import { useGetEventQuery } from "@/entities/events";
import { Hourglass } from "@/shared/ui/Hourglass";

export const PesonalEventPage = () => {
  const { data = [], isLoading } = useGetEventQuery();

  const columns = [
    { name: "НомерСобытия", label: "Номер События" },
    { name: "IdСотрудника", label: "ID Сотрудника" },
    { name: "ТипСобытия", label: "Тип События" },
    { name: "ДатаСобытия", label: "Дата События" },
    { name: "Комментарий", label: "Комментарий" },
  ];

  return isLoading ? <Hourglass /> : <Table data={data} columns={columns} />;
};
