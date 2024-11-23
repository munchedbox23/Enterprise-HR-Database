import { Table } from "@/widgets/Table";
import { useGetEmployeesQuery } from "@/entities/employee";
import { Hourglass } from "@/shared/ui/Hourglass";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { CreateAnEmployeeForm } from "@/features/employee/createAnEmployee";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";

export const EmployeesPage = () => {
  const { data = [], isLoading } = useGetEmployeesQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

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

  return (
    <>
      {isLoading ? (
        <Hourglass />
      ) : (
        <>
          <CreateAnEntity title="Создать сотрудника">
            <CreateAnEmployeeForm onEmployeeAdded={handleOpenSnackbar} />
          </CreateAnEntity>
          <Table data={data} columns={columns} />
          <NotificationSnackbar
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            message="Сотрудник успешно добавлен!"
            severity="success"
          />
        </>
      )}
    </>
  );
};
