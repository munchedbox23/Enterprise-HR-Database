import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { Input } from "@/shared/ui/Input";
import { useUpdateDepartmentMutation } from "@/features/depatments/api/departmentApi";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import { DepartmentRecord, useGetDepartmentQuery } from "@/entities/staffing";
import { validatePhoneNumber } from "@/shared/lib/validate";
import { DepartmentValueTypes } from "@/entities/staffing";
import MaskedInput from "react-text-mask";
import { validateDepartmentName } from "../../createDepartment/model/validateDepartmentForm";

export const UpdateDepartmentForm = ({
  department,
  onSuccess,
}: {
  department: DepartmentValueTypes;
  onSuccess: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<DepartmentRecord, "КодОтдела">
  >({
    НазваниеОтдела: department[1],
    КонтактныйТелефон: department[2],
  });

  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();
  const { data: departments = [] } = useGetDepartmentQuery();

  const existingPhones = departments.map(
    (department) => department.КонтактныйТелефон
  );

  const { errors, validateForm } = useValidation<
    Omit<DepartmentRecord, "КодОтдела">
  >({
    НазваниеОтдела: () => validateDepartmentName(formState.НазваниеОтдела),
    КонтактныйТелефон: () =>
      validatePhoneNumber(formState.КонтактныйТелефон, existingPhones),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await updateDepartment({
        department: { ...formState },
        id: department[0].toString(),
      });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseForm
      buttonText="Обновить"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <MaskedInput
        mask={[
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
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
            placeholder="000-000-0000"
            error={!!errors.КонтактныйТелефон}
            helperText={errors.КонтактныйТелефон}
          />
        )}
      />
      <Input
        type="text"
        name="НазваниеОтдела"
        label="Название отдела"
        onChange={handleChange}
        fullWidth
        value={formState.НазваниеОтдела}
        error={!!errors.НазваниеОтдела}
        helperText={errors.НазваниеОтдела}
      />
    </BaseForm>
  );
};
