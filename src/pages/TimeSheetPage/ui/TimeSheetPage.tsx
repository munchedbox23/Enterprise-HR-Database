import { Table } from "@/widgets/Table";
import { useGetTimeSheetQuery } from "@/entities/time-sheet";
import { Hourglass } from "@/shared/ui/Hourglass";
import { CreateTimeSheetForm } from "@/features/time-sheet/createTimeSheet";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";

export const TimeSheetPage = () => {
  const { data = [], isLoading } = useGetTimeSheetQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } = useSnackbar();

  const columns = [
    { name: "НомерЗаписи", label: "Номер Записи" },
    { name: "IdСотрудника", label: "ID Сотрудника" },
    { name: "Дата", label: "Дата" },
    {
      name: "КоличествоОтработанныхЧасов",
      label: "Количество Отработанных Часов",
    },
  ];

  return isLoading ? (
    <Hourglass />
  ) : (
    <>
      <CreateAnEntity title="Табель">
        <CreateTimeSheetForm onSuccess={handleOpenSnackbar} />
      </CreateAnEntity>
      <Table data={data} columns={columns} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity="success"
        message="Запись в табеле успешно создана"
      />
    </>
  );
};
