import { useGetStaffingQuery } from "@/entities/staffing";
import { Hourglass } from "@/shared/ui/Hourglass";
import { Table } from "@/widgets/Table";
import { CreateStaffingForm } from "@/features/staffing/createStaffing";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";

export const StaffingPage = () => {
  const { data: staffing = [], isLoading } = useGetStaffingQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();    

  const columns = [
    { name: "IdРасписания", label: "ID Расписания" },
    { name: "КодОтдела", label: "Код Отдела" },
    { name: "Должность", label: "Должность" },
    { name: "КоличествоЕдиниц", label: "Количество Единиц" },
    { name: "Оклад", label: "Оклад" },
  ];
  return isLoading ? (
    <Hourglass />
  ) : (
    <>
      <CreateAnEntity title="Создать расписание">
        <CreateStaffingForm onStaffingAdded={handleOpenSnackbar} />
      </CreateAnEntity>
      <Table data={staffing} columns={columns} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Расписание успешно добавлено!"
        severity="success"
      />
    </>
  );
};
