import { Table } from "@/widgets/Table";
import { useGetTimeSheetQuery } from "@/entities/time-sheet";
import { Hourglass } from "@/shared/ui/Hourglass";
import { CreateTimeSheetForm } from "@/features/time-sheet/createTimeSheet";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";
import { EditAnEntity } from "@/features/common/EditAnEntity";
import { UpdateTimeSheetForm } from "@/features/time-sheet/updateTimeSheet";
import { TimeSheetValueTypes } from "@/entities/time-sheet/model/types";

export const TimeSheetPage = () => {
  const { data = [], isLoading } = useGetTimeSheetQuery();
  const {
    openSnackbar,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbarError,
    handleCloseSnackbarError,
    handleOpenSnackbarError,
  } = useSnackbar();

  const columns = [
    { name: "НомерЗаписи", label: "Номер Записи" },
    { name: "IdСотрудника", label: "ID Сотрудника" },
    { name: "Дата", label: "Дата" },
    {
      name: "КоличествоОтработанныхЧасов",
      label: "Количество Отработанных Часов",
    },
    {
      name: "Опции",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <EditAnEntity title="Редактировать сотрудника">
              <UpdateTimeSheetForm
                timeSheet={tableMeta.rowData as TimeSheetValueTypes}
                onSuccess={handleOpenSnackbar}
                onTimeSheetUpdatedError={handleOpenSnackbarError}
              />
            </EditAnEntity>
          );
        },
      },
    },
  ];

  return isLoading ? (
    <Hourglass />
  ) : (
    <>
      <CreateAnEntity title="Табель">
        <CreateTimeSheetForm
          onSuccess={handleOpenSnackbar}
          onTimeSheetAddedError={handleOpenSnackbarError}
        />
      </CreateAnEntity>
      <Table data={data} columns={columns} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity="success"
        message="Запись успешно выполнена"
      />
      <NotificationSnackbar
        open={openSnackbarError}
        onClose={handleCloseSnackbarError}
        severity="error"
        message="Ошибка при выполнении операции!"
      />
    </>
  );
};
