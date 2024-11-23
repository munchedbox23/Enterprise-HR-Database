import { Table } from "@/widgets/Table";
import { useGetDepartmentQuery } from "@/entities/staffing";
import { Hourglass } from "@/shared/ui/Hourglass";
import { CreateDepartmentForm } from "@/features/depatments/createDepartment";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";

export const DepartmentPage = () => {
  const { data = [], isLoading, refetch } = useGetDepartmentQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  const columns = [
    { name: "КодОтдела", label: "Код Отдела" },
    { name: "НазваниеОтдела", label: "Название Отдела" },
    { name: "КонтактныйТелефон", label: "Контактный Телефон" },
  ];

  const handleDepartmentAdded = () => {
    handleOpenSnackbar();
    refetch();
  };

  return isLoading ? (
    <Hourglass />
  ) : (
    <>
      <CreateAnEntity title="Добавить Отдел">
        <CreateDepartmentForm onDepartmentAdded={handleDepartmentAdded} />
      </CreateAnEntity>
      <Table data={data} columns={columns} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Отдел добавлен"
        severity="success"
      />
    </>
  );
};
