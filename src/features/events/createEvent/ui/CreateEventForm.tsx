import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { Event } from "@/entities/events/model/types";
import { useAddEventMutation } from "@/entities/events/api/eventApi";
import { useGetEmployeesQuery } from "@/entities/employee";
import { TextField } from "@mui/material";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import { validateDate, validateEventType } from "../model/validationEventForm";

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

  const { errors, validateForm } = useValidation<
    Omit<Event, "НомерСобытия" | "IdСотрудника" | "Комментарий">
  >({
    ДатаСобытия: () => validateDate(formState.ДатаСобытия),
    ТипСобытия: () => validateEventType(formState.ТипСобытия),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
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
        error={!!errors.ДатаСобытия}
        helperText={errors.ДатаСобытия}
      />
      <Input
        type="text"
        label="Тип события"
        name="ТипСобытия"
        value={formState.ТипСобытия}
        onChange={handleChange}
        fullWidth
        error={!!errors.ТипСобытия}
        helperText={errors.ТипСобытия}
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

function validateComment(comment: string | undefined): string | null {
  if (!comment || comment.trim().length === 0) {
    return "Комментарий не может быть пустым";
  }
  return null;
}
