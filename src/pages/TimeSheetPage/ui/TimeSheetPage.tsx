import { Table } from "@/widgets/Table";
import { useGetTimeSheetQuery } from "@/entities/time-sheet";
import { Hourglass } from "@/shared/ui/Hourglass";

export const TimeSheetPage = () => {
  const { data = [], isLoading } = useGetTimeSheetQuery();

  const columns = [
    { name: "НомерЗаписи", label: "Номер Записи" },
    { name: "IdСотрудника", label: "ID Сотрудника" },
    { name: "Дата", label: "Дата" },
    {
      name: "КоличествоОтработанныхЧасов",
      label: "Количество Отработанных Часов",
    },
  ];

  return isLoading ? <Hourglass /> : <Table data={data} columns={columns} />;
};
