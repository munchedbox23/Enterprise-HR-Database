import { Table } from "@/widgets/Table";
import { useGetDepartmentQuery } from "@/entities/staffing";
import { Hourglass } from "@/shared/ui/Hourglass";

export const DepartmentPage = () => {
  const { data = [], isLoading } = useGetDepartmentQuery();

  const columns = [
    { name: "КодОтдела", label: "Код Отдела" },
    { name: "НазваниеОтдела", label: "Название Отдела" },
    { name: "КонтактныйТелефон", label: "Контактный Телефон" },
  ];

  return isLoading ? <Hourglass /> : <Table data={data} columns={columns} />;
};
