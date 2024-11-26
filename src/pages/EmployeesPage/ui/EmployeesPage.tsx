import { Table } from "@/widgets/Table";
import { useGetEmployeesQuery, EmployeeValueTypes } from "@/entities/employee";
import { Hourglass } from "@/shared/ui/Hourglass";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { CreateAnEmployeeForm } from "@/features/employee/createAnEmployee";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";
import { EditAnEntity } from "@/features/common/EditAnEntity";
import { UpdateAnEmployeeForm } from "@/features/employee/updateAnEmployee";
import { useEffect } from "react";

export const EmployeesPage = () => {
  const { data = [], isLoading, refetch } = useGetEmployeesQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { name: "IdСотрудника", label: "ID Сотрудника" },
    { name: "КодОтдела", label: "Код Отдела" },
    { name: "ФИО", label: "ФИО" },
    { name: "Должность", label: "Должность" },
    { name: "Стаж", label: "Стаж" },
    { name: "КонтактныйТелефон", label: "Контактный Телефон" },
    { name: "ЗаработнаяПлата", label: "Заработная Плата" },
    { name: "УровеньОбразования", label: "Уровень Образования" },
    {
      name: "Опции",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <EditAnEntity title="Редактировать сотрудника">
              <UpdateAnEmployeeForm
                employee={tableMeta.rowData as EmployeeValueTypes}
                onEmployeeUpdated={() => {
                  handleOpenSnackbar();
                }}
              />
            </EditAnEntity>
          );
        },
      },
    },
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
            message="Процесс успешно завершен!"
            severity="success"
          />
        </>
      )}
    </>
  );
};
