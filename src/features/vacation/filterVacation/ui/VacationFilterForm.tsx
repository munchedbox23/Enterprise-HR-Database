import { Input } from "@/shared/ui/Input";
import { Box } from "@mui/material";

export const VacationFilterForm = ({
  formState,
  handleChange,
}: {
  formState: {
    type: string;
    startDate: string;
    endDate: string;
    employeeId: string | number;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box>
      <Input
        label="Поиск по типу отпуска"
        type="text"
        name="type"
        value={formState.type}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
      <Input
        label="Дата начала"
        type="date"
        name="startDate"
        value={formState.startDate}
        onChange={handleChange}
        sx={{ mb: 3 }}
        InputLabelProps={{ shrink: true }}
      />
      <Input
        label="Дата окончания"
        type="date"
        name="endDate"
        value={formState.endDate}
        onChange={handleChange}
        sx={{ mb: 3 }}
        InputLabelProps={{ shrink: true }}
      />
      <Input
        label="Табельный номер"
        name="employeeId"
        value={formState.employeeId}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
    </Box>
  );
};
