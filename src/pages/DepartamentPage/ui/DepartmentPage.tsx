import { Table } from "@/widgets/Table";
import { useGetDepartmentQuery } from "@/entities/staffing";
import { Hourglass } from "@/shared/ui/Hourglass";
import { CreateDepartmentForm } from "@/features/depatments/createDepartment";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";
import { EditAnEntity } from "@/features/common/EditAnEntity";
import { UpdateDepartmentForm } from "@/features/depatments/updateDepartment";
import { DepartmentValueTypes } from "@/entities/staffing";

export const DepartmentPage = () => {
  const { data = [], isLoading, refetch } = useGetDepartmentQuery();
  const {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbarError,
    handleCloseSnackbarError,
    handleOpenSnackbarError,
  } = useSnackbar();

  const columns = [
    { name: "КодОтдела", label: "Код Отдела" },
    { name: "НазваниеОтдела", label: "Название Отдела" },
    { name: "КонтактныйТелефон", label: "Контактный Телефон" },
    {
      name: "Опции",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <EditAnEntity title="Редактировать Отдел">
              <UpdateDepartmentForm
                department={tableMeta.rowData as DepartmentValueTypes}
                onSuccess={handleDepartmentUpdated}
                onDepartmentUpdatedError={handleOpenSnackbarError}
              />
            </EditAnEntity>
          );
        },
      },
    },
  ];

  const handleDepartmentAdded = () => {
    handleOpenSnackbar();
    refetch();
  };

  function handleDepartmentUpdated() {
    handleOpenSnackbar();
    refetch();
  }

  return isLoading ? (
    <Hourglass />
  ) : (
    <>
      <CreateAnEntity title="Добавить Отдел">
        <CreateDepartmentForm
          onDepartmentAdded={handleDepartmentAdded}
          onDepartmentAddedError={handleOpenSnackbarError}
        />
      </CreateAnEntity>
      <Table data={data} columns={columns} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Успешно выполнено"
        severity="success"
      />
      <NotificationSnackbar
        open={openSnackbarError}
        onClose={handleCloseSnackbarError}
        message="Ошибка при выполнении операции!"
        severity="error"
      />
    </>
  );
};
