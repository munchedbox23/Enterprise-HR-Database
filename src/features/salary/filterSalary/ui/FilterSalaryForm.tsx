import { Input } from "@/shared/ui/Input";
import { Box } from "@mui/material";

export const FilterSalaryForm = ({
  formState,
  handleChange,
}: {
  formState: {
    type: string;
    salaryDate: string;
    salaryAmount: string;
    employeeId: string | number;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box>
      <Input
        label="Поиск по типу выплаты"
        type="text"
        name="type"
        value={formState.type}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
      <Input
        label="Дата выплаты"
        type="date"
        name="salaryDate"
        value={formState.salaryDate}
        onChange={handleChange}
        sx={{ mb: 3 }}
        InputLabelProps={{ shrink: true }}
      />
      <Input
        type="number"
        label="Сумма"
        name="salaryAmount"
        value={formState.salaryAmount}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
      <Input
        type="text"
        label="Табельный номер"
        name="employeeId"
        value={formState.employeeId}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
    </Box>
  );
};
