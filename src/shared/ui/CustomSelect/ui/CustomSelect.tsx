import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface CustomSelectProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string; key: string | number }[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root.Mui-focused": {
          "& fieldset": {
            borderColor: "#f5ba1a",
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#f5ba1a",
        },
      }}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        fullWidth
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "200px",
              overflowY: "auto",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.key}
            value={option.value}
            style={{ width: "100%" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
