import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { Event } from "@/entities/events/model/types";
import { useAddEventMutation } from "@/entities/events/api/eventApi";
import { useGetEmployeesQuery } from "@/entities/employee";
import { TextField } from "@mui/material";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";

export const CreateEventForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { formState, handleChange } = useForm<Omit<Event, "НомерСобытия">>({
    IdСотрудника: undefined,
    ДатаСобытия: new Date().toISOString().split("T")[0],
    ТипСобытия: "",
    Комментарий: "",
  });

  const [addEvent, { isLoading }] = useAddEventMutation();
  const { data: employees = [] } = useGetEmployeesQuery();
  const { closeModal } = useModalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addEvent({
        ...formState,
        IdСотрудника: Number(formState.IdСотрудника),
      });
      closeModal();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseForm
      buttonText="Создать событие"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <CustomSelect
        label="Сотрудник"
        name="IdСотрудника"
        value={formState.IdСотрудника?.toString() || ""}
        onChange={handleChange}
        options={employees.map((employee) => ({
          label: `${employee.ФИО} - ${employee.IdСотрудника}`,
          value: employee.IdСотрудника.toString(),
          key: employee.IdСотрудника,
        }))}
      />
      <Input
        type="date"
        label="Дата события"
        name="ДатаСобытия"
        value={formState.ДатаСобытия}
        onChange={handleChange}
        fullWidth
      />
      <Input
        type="text"
        label="Тип события"
        name="ТипСобытия"
        value={formState.ТипСобытия}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        multiline
        rows={4}
        label="Комментарий"
        name="Комментарий"
        value={formState.Комментарий}
        onChange={handleChange}
        fullWidth
      />
    </BaseForm>
  );
};
