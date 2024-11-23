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
import { useValidation } from "@/shared/lib/hooks/useValidate";
import {
  validateEducationLevel,
  validateExperience,
  validatePhoneNumber,
  validatePosition,
  validateSalary,
} from "../model/lib/validateForm";
import { validateName } from "@/shared/lib/validate";

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

  const { errors, validateForm } = useValidation<
    Omit<Employee, "IdСотрудника" | "КодОтдела">
  >({
    ФИО: (value) => validateName(value as string),
    Должность: (value) => validatePosition(value as string | number),
    Стаж: (value) => validateExperience(value as string | number | undefined),
    КонтактныйТелефон: (value) => validatePhoneNumber(value as string),
    ЗаработнаяПлата: (value) => validateSalary(Number(value)),
    УровеньОбразования: (value) => validateEducationLevel(value as string),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await addEmployee({
        ...formState,
        ЗаработнаяПлата: Number(formState.ЗаработнаяПлата),
      });
      onEmployeeAdded();
      closeModal();
    } catch (error) {
      console.log(error);
    }
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
        error={!!errors.ФИО}
        helperText={errors.ФИО}
      />
      <Input
        type="text"
        name="Должность"
        label="Должность"
        value={formState.Должность?.toString() || ""}
        onChange={handleChange}
        fullWidth
        error={!!errors.Должность}
        helperText={errors.Должность}
      />
      <Input
        type="number"
        name="Стаж"
        label="Стаж"
        value={Number(formState.Стаж) || ""}
        onChange={handleChange}
        inputProps={{ min: 0, max: 100 }}
        fullWidth
        error={!!errors.Стаж}
        helperText={errors.Стаж}
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
            placeholder="89999999999"
            label="Телефон"
            fullWidth
            error={!!errors.КонтактныйТелефон}
            helperText={errors.КонтактныйТелефон}
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
        error={!!errors.ЗаработнаяПлата}
        helperText={errors.ЗаработнаяПлата}
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
