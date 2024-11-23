import { Table } from "@/widgets/Table";
import { useGetEventQuery } from "@/entities/events";
import { Hourglass } from "@/shared/ui/Hourglass";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { CreateEventForm } from "@/features/events/createEvent";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";

export const PesonalEventPage = () => {
  const { data = [], isLoading } = useGetEventQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  const columns = [
    { name: "НомерСобытия", label: "Номер События" },
    { name: "IdСотрудника", label: "ID Сотрудника" },
    { name: "ТипСобытия", label: "Тип События" },
    { name: "ДатаСобытия", label: "Дата События" },
    { name: "Комментарий", label: "Комментарий" },
  ];

  return isLoading ? (
    <Hourglass />
  ) : (
    <>
      <CreateAnEntity title="Создать событие">
        <CreateEventForm onSuccess={handleOpenSnackbar} />
      </CreateAnEntity>
      <Table data={data} columns={columns} />
      <NotificationSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Событие успешно создано"
        severity="success"
      />
    </>
  );
};
