import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useUpdateEventMutation } from "@/entities/events/api/eventApi";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import {
  validateDate,
  validateEventType,
} from "../../createEvent/model/validationEventForm";
import { EventValueTypes, Event } from "@/entities/events/model/types";

export const UpdateEventForm = ({
  event,
  onSuccess,
}: {
  event: EventValueTypes;
  onSuccess: () => void;
}) => {
  const { formState, handleChange } = useForm<Omit<Event, "НомерСобытия">>({
    IdСотрудника: event[1],
    ДатаСобытия: event[3],
    ТипСобытия: event[2],
    Комментарий: event[4],
  });

  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { data: employees = [] } = useGetEmployeesQuery();

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
      await updateEvent({
        event: { ...formState, IdСотрудника: Number(formState.IdСотрудника) },
        id: event[0].toString(),
      });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseForm
      buttonText="Обновить событие"
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
      <Input
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
