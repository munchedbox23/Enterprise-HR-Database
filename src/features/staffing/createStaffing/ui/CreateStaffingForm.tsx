import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { Input } from "@/shared/ui/Input";
import {
  StaffingRecord,
  useAddStaffingMutation,
  useGetDepartmentQuery,
} from "@/entities/staffing";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import { CustomSelect } from "@/shared/ui/CustomSelect";

export const CreateStaffingForm = ({
  onStaffingAdded,
}: {
  onStaffingAdded: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<StaffingRecord, "IdРасписания">
  >({
    КодОтдела: "",
    Должность: "",
    КоличествоЕдиниц: undefined,
    Оклад: 35000,
  });

  const { closeModal } = useModalContext();
  const [addStaffing, { isLoading }] = useAddStaffingMutation();
  const { data: departments } = useGetDepartmentQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addStaffing({
      ...formState,
      Оклад: Number(formState.Оклад),
      КоличествоЕдиниц: Number(formState.КоличествоЕдиниц),
    });
    closeModal();
    onStaffingAdded();
  };

  return (
    <BaseForm
      buttonText="Создать расписание"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <CustomSelect
        label="Отдел"
        name="КодОтдела"
        options={
          departments?.map((department) => ({
            value: department.НазваниеОтдела.toString(),
            label: department.НазваниеОтдела,
            key: department.КодОтдела.toString(),
          })) || []
        }
        value={formState.КодОтдела}
        onChange={handleChange}
      />
      <Input
        type="text"
        label="Должность"
        name="Должность"
        value={formState.Должность}
        onChange={handleChange}
        fullWidth
      />
      <Input
        type="number"
        label="Количество единиц"
        name="КоличествоЕдиниц"
        value={formState.КоличествоЕдиниц}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        fullWidth
      />
      <Input
        type="number"
        label="Оклад"
        name="Оклад"
        value={formState.Оклад}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        fullWidth
      />
    </BaseForm>
  );
};
