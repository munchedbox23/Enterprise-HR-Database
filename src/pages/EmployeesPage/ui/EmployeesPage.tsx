import { Table } from "@/widgets/Table";
import { useGetEmployeesQuery } from "@/entities/employee";
import { Hourglass } from "@/shared/ui/Hourglass";

export const EmployeesPage = () => {
  const { data = [], isLoading } = useGetEmployeesQuery();

  const columns = [
    { name: "IdСотрудника", label: "ID Сотрудника" },
    { name: "КодОтдела", label: "Код Отдела" },
    { name: "ФИО", label: "ФИО" },
    { name: "Должность", label: "Должность" },
    { name: "Стаж", label: "Стаж" },
    { name: "КонтактныйТелефон", label: "Контактный Телефон" },
    { name: "ЗаработнаяПлата", label: "Заработная Плата" },
    { name: "УровеньОбразования", label: "Уровень Образования" },
  ];

  return isLoading ? <Hourglass /> : <Table data={data} columns={columns} />;
};
