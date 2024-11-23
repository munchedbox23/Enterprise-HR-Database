import { Employee } from "@/entities/employee";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { phoneMask } from "../model/const/constants";
import MaskedInput from "react-text-mask";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import { useAddEmployeeMutation } from "@/entities/employee";
import { useGetDepartmentQuery } from "@/entities/staffing";

export const CreateAnEmployeeForm = ({
  onEmployeeAdded,
}: {
  onEmployeeAdded: () => void;
}) => {
  const { formState, handleChange } = useForm<Omit<Employee, "IdСотрудника">>({
    КодОтдела: "",
    ФИО: "",
    Должность: "",
    Стаж: undefined,
    КонтактныйТелефон: "",
    ЗаработнаяПлата: undefined,
    УровеньОбразования: "среднее",
  });

  const { closeModal } = useModalContext();
  const { data: departments } = useGetDepartmentQuery();
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addEmployee({ ...formState, ЗаработнаяПлата: Number(formState.ЗаработнаяПлата) });
    onEmployeeAdded();
    closeModal();
  };

  return (
    <BaseForm
      buttonText="Создать сотрудника"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <CustomSelect
        label="Отдел"
        name="КодОтдела"
        value={formState.КодОтдела || ""}
        onChange={handleChange}
        options={
          departments?.map((department) => ({
            value: department.НазваниеОтдела.toString(),
            label: department.НазваниеОтдела,
            key: department.КодОтдела.toString(),
          })) || []
        }
      />
      <Input
        type="text"
        label="ФИО"
        name="ФИО"
        value={formState.ФИО}
        onChange={handleChange}
        fullWidth
      />
      <Input
        type="text"
        name="Должность"
        label="Должность"
        value={formState.Должность?.toString() || ""}
        onChange={handleChange}
        fullWidth
      />
      <Input
        type="number"
        name="Стаж"
        label="Стаж"
        value={Number(formState.Стаж) || ""}
        onChange={handleChange}
        inputProps={{ min: 0, max: 100 }}
        fullWidth
      />
      <MaskedInput
        mask={phoneMask}
        value={formState.КонтактныйТелефон}
        onChange={handleChange}
        render={(ref, props) => (
          <Input
            {...props}
            inputRef={ref}
            type="tel"
            name="КонтактныйТелефон"
            label="Телефон"
            fullWidth
          />
        )}
      />
      <Input
        type="number"
        name="ЗаработнаяПлата"
        label="Заработная плата"
        value={Number(formState.ЗаработнаяПлата) || ""}
        onChange={handleChange}
        inputProps={{ min: 1, max: 100000000 }}
        fullWidth
      />
      <CustomSelect
        label="Уровень образования"
        name="УровеньОбразования"
        value={formState.УровеньОбразования || ""}
        options={[
          { value: "среднее", label: "Среднее", key: 1 },
          { value: "высшее", label: "Высшее", key: 2 },
        ]}
        onChange={handleChange}
      />
    </BaseForm>
  );
};
