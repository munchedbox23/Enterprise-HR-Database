import { useGetStaffingQuery } from "@/entities/staffing";
import { Hourglass } from "@/shared/ui/Hourglass";
import { Table } from "@/widgets/Table";

export const StaffingPage = () => {
  const { data: staffing = [], isLoading } = useGetStaffingQuery();

  const columns = [
    { name: "IdРасписания", label: "ID Расписания" },
    { name: "КодОтдела", label: "Код Отдела" },
    { name: "Должность", label: "Должность" },
    { name: "КоличествоЕдиниц", label: "Количество Единиц" },
    { name: "Оклад", label: "Оклад" },
  ];
  return isLoading ? <Hourglass /> : <Table data={staffing} columns={columns} />;
};
