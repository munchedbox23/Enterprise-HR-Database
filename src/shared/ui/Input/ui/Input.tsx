import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface InputProps extends Omit<TextFieldProps, "variant"> {
  label: string;
  type?: string;
  startAdornment?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  startAdornment,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      label={label}
      type={type === "password" && showPassword ? "text" : type}
      InputProps={{
        startAdornment: startAdornment,
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
        style: { borderColor: "#f2f2f2" },
        sx: {
          "& .MuiInputBase-input": {
            marginLeft: "5px",
          },
        },
      }}
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
      {...props}
    />
  );
};
